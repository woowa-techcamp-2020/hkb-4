import { numberToString } from '../../util/common';
import LineChart from './line';

const colors = ['#6581BC', '#E56B77', '#F59745', '#F6BC35', '#94C942', '#9F71C1', '#9F71C1'];

class ChartsTab extends HTMLElement {
	public name = 'charts';
	private cx = 180;
	private cy = 180;
	private radius = 70;
	private svgns = 'http://www.w3.org/2000/svg';

	connectedCallback() {
		this.render();
		this.appendChild(new LineChart());
	}

	update(data) {
		this.renderPieChart(data);
		this.renderBarChart(data);
		this.renderTotalSpending(data);
	}

	renderTotalSpending(data) {
		const spending = this.querySelector('#currentMonthSpending') as HTMLElement;
		spending.textContent = `${numberToString(data.monthlyData.spending)}원`;
	}

	renderPieChart(data) {
		const category = data.categoryData;
		const monthly = data.monthlyData;
		const pieChartContainer = this.querySelector('.pie-chart') as SVGViewElement;
		pieChartContainer.innerHTML = '';
		const keys = Object.keys(category).sort((a, b) => category[b] * 1 - category[a] * 1);

		let rotate = 0;
		const labels = [];
		for (let i = 0; i < (keys.length > 6 ? 5 : keys.length); i++) {
			pieChartContainer.appendChild(
				this.pie(
					this.radius.toString(),
					this.cx.toString(),
					this.cy.toString(),
					colors[i],
					category[keys[i]] / monthly.spending,
					2 * Math.PI * this.radius,
					rotate,
				),
			);
			labels.push(
				this.renderPieLabel(
					rotate,
					(category[keys[i]] * 100) / monthly.spending,
					this.radius,
					keys[i],
				),
			);
			rotate += (category[keys[i]] / monthly.spending) * 360;
		}
		if (keys.length > 6) {
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
		}
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

	renderBarChart(data) {
		const category = data.categoryData;
		const monthly = data.monthlyData;
		const barChartContainer = this.querySelector('.bar-chart-container') as HTMLElement;
		const keys = Object.keys(category).sort((a, b) => category[b] * 1 - category[a] * 1);
		const max = category[keys[0]];
		let bars = keys.reduce(
			(accum, key, i) => (accum += this.bar(key, category[key], monthly.spending, colors[i], max)),
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
				이번달 지출 금액: <span id="currentMonthSpending"></span>
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
