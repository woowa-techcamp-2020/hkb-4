import { numberToString } from '../../util/common';

const colors = ['#6581BC', '#E56B77', '#F59745', '#F6BC35', '#94C942', '#9F71C1', '#9F71C1'];
const spending = {
	식비: 100000,
	생활: 90000,
	'쇼핑/뷰티': 80000,
	교통: 40000,
	'의료/건강': 20000,
	'문화/여가': 10000,
	미분류: 10000,
};
class ChartsTab extends HTMLElement {
	private cx = 180;
	private cy = 180;
	private radius = 70;
	private svgns = 'http://www.w3.org/2000/svg';
	private spending = spending;
	private monthlyData = {
		income: 1,
		spending: 350000,
	};

	connectedCallback() {
		this.render();
		this.renderPieChart();
		this.renderBarChart();
	}

	renderPieChart() {
		const pieChartContainer = this.querySelector('.pie-chart') as SVGViewElement;
		const keys = Object.keys(this.spending).sort(
			(a, b) => this.spending[b] * 1 - this.spending[a] * 1,
		);

		let rotate = 0;
		const labels = [];
		for (let i = 0; i < 5; i++) {
			pieChartContainer.appendChild(
				this.pie(
					this.radius.toString(),
					this.cx.toString(),
					this.cy.toString(),
					colors[i],
					this.spending[keys[i]] / this.monthlyData.spending,
					2 * Math.PI * this.radius,
					rotate,
				),
			);
			labels.push(
				this.renderPieLabel(
					rotate,
					(this.spending[keys[i]] * 100) / this.monthlyData.spending,
					this.radius,
					keys[i],
				),
			);
			rotate += (this.spending[keys[i]] / this.monthlyData.spending) * 360;
		}
		pieChartContainer.appendChild(
			this.pie(
				this.radius.toString(),
				this.cx.toString(),
				this.cy.toString(),
				colors[5],
				(360 - rotate) / 360,
				2 * Math.PI * this.radius,
				rotate,
			),
		);
		labels.push(this.renderPieLabel(rotate, ((360 - rotate) * 100) / 360, this.radius, '기타'));

		labels.forEach(label => pieChartContainer.appendChild(label));
	}

	renderPieLabel(degree: number, percentage: number, radius: number, label: string) {
		const textContainer = document.createElementNS(this.svgns, 'text') as SVGTextElement;
		const x = Math.cos((((percentage * 3.6) / 2 + degree + 90) * Math.PI) / 180) * radius * 2.2;
		const y = Math.sin((((percentage * 3.6) / 2 + degree + 90) * Math.PI) / 180) * radius * 2.2;
		textContainer.setAttribute('x', `${this.cx - x}`);
		textContainer.setAttribute('y', `${-this.cy - y + 6}`);
		textContainer.setAttribute('text-anchor', 'middle');
		textContainer.style.transform = 'rotate(90deg)';
		const txtSpan = document.createElementNS(this.svgns, 'tspan');
		txtSpan.textContent = label;
		const perSpan = document.createElementNS(this.svgns, 'tspan');
		perSpan.classList.add('per-span');
		perSpan.textContent = `${Math.round(percentage)}%`;
		textContainer.appendChild(txtSpan);
		textContainer.appendChild(perSpan);
		return textContainer;
	}

	pie(
		r: string,
		x: string,
		y: string,
		color: string,
		width: number,
		dash2: number,
		rotate: number,
	) {
		const circle = document.createElementNS(this.svgns, 'circle');
		circle.setAttributeNS(null, 'cx', x);
		circle.setAttributeNS(null, 'cy', y);
		circle.setAttributeNS(null, 'r', r);
		circle.setAttributeNS(
			null,
			'style',
			`stroke: ${color}; stroke-dasharray: ${
				width * dash2
			} ${dash2}; transform: rotate(${rotate}deg);`,
		);
		circle.animate(
			[
				{ transform: 'rotate(0deg)', strokeDasharray: `${1} ${dash2}` },
				{ transform: `rotate(${rotate}deg)`, strokeDasharray: `${width * dash2} ${dash2}` },
			],
			{
				duration: 400,
			},
		);
		return circle;
	}

	renderBarChart() {
		const barChartContainer = this.querySelector('.bar-chart-container') as HTMLElement;
		const keys = Object.keys(this.spending).sort(
			(a, b) => this.spending[b] * 1 - this.spending[a] * 1,
		);
		const max = this.spending[keys[0]];
		// %순으로 정렬했다고 치고,
		let bars = keys.reduce(
			(accum, key, i) =>
				(accum += this.bar(key, this.spending[key], this.monthlyData.spending, colors[i], max)),
			'',
		);
		barChartContainer.innerHTML = bars;
	}

	bar(name: string, spend: number, total: number, color: string, max: number): string {
		return `<div class="bar-chart-content" id="bar-${name}">
		  <div class="title">${name}</div>
		  <div class="per">${Math.round((spend * 100) / total)}%</div>
      <div class="chart">
        <div class="percentage-wrapper">
          <div class="chart-percentage" style="width: ${
						(100 * spend) / max
					}%;background: ${color}"></div>
        </div>
		  </div>
		  <div class="spending">${numberToString(spend)}원</div>
		</div>`;
	}

	render() {
		this.innerHTML = `
		<div class="charts-sub-header">
			<div class="radio-group">
				<input type="radio" id="category" name="drone" value="category" checked>
				<label for="category">카테고리별 지출</label>
				<input type="radio" id="daily" name="drone" value="daily">
				<label for="daily">일별 지출</label>
			</div>
			<div class="current-spending">
				이번달 지출 금액: <span>${numberToString(this.monthlyData.spending)}원</span>
			</div>
		</div>
    <center class="pie-chart-container">
      <svg class="pie-chart"></svg>
    </center>
    <div class="bar-chart-container">
    </div>
    `;
	}
}

customElements.define('charts-tab', ChartsTab);
export default customElements.get('charts-tab');
