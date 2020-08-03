const colors = ['#6581BC', '#E56B77', '#F59745', '#F6BC35', '#94C942', '#9F71C1'];
const spending = [
	{
		name: '식비',
		spend: 100000,
	},
	{
		name: '생활',
		spend: 90000,
	},
	{
		name: '쇼핑/뷰티',
		spend: 80000,
	},
	{
		name: '교통',
		spend: 40000,
	},
	{
		name: '의료/건강',
		spend: 20000,
	},
	{
		name: '문화/여가',
		spend: 10000,
	},
	{
		name: '미분류',
		spend: 10000,
	},
];
const total = 320000;

class ChartsTab extends HTMLElement {
	connectedCallback() {
		this.render();
		this.renderPieChart();
		this.initBarChart();
		// this.renderBarChart();
	}

	renderPieChart() {
		const cx = 140;
		const cy = 140;
		const pieChartContainer = this.querySelector('.pie-chart') as SVGViewElement;
		const radius = 70;
		const total = 100;
		const t = [
			{ rotate: 0, percentage: 30 },
			{ rotate: 108, percentage: 20 },
			{ rotate: 180, percentage: 15 },
			{ rotate: 234, percentage: 15 },
			{ rotate: 288, percentage: 10 },
			{ rotate: 324, percentage: 10 },
		];
		let pies = '';

		for (let i = 0; i < 6; i++) {
			pies += this.pie(
				`s${i}`,
				radius,
				cx,
				cy,
				t[i].rotate,
				t[i].percentage,
				total,
				2 * Math.PI * radius,
				colors[i],
			);
		}
		pieChartContainer.innerHTML = pies;
	}

	pie(
		className: string,
		r: number,
		cx: number,
		cy: number,
		rotate: number,
		percentage: number,
		total: number,
		strokeDash2: number,
		color: string,
	) {
		return ` <circle class='${className}' r='${r}' cx='${cx}' cy='${cy}' style='transform: rotate(${rotate}deg); stroke: ${color}; stroke-dasharray: ${
			(percentage / total) * strokeDash2
		} ${strokeDash2};'></circle>`;
	}

	renderBarChart() {
		const barChartContainer = this.querySelector('.bar-chart-container') as HTMLElement;
		spending.forEach(value => {
			const element = barChartContainer.querySelector(`#bar-${value.name}`) as HTMLElement;
			console.log(element);
			if (element) {
				element.style.width = Math.floor((value.spend * 100) / total) + '%';
			}
		});
	}

	initBarChart() {
		const barChartContainer = this.querySelector('.bar-chart-container') as HTMLElement;
		// %순으로 정렬했다고 치고,
		let bars = spending.reduce(
			(accum, value, i) => (accum += this.initBar(value, total, colors[i])),
			'',
		);
		barChartContainer.innerHTML = bars;
	}

	initBar(value: { name: string; spend: number }, total: number, color: string): string {
		// 	return `<div class="bar-chart-content" id="bar-${value.name}">
		//   <div class="title">${value.name}</div>
		//   <div class="per">${Math.floor(value.spend / total)}%</div>
		//   <div class="chart">
		//     <div class="chart-percentage" style="width: ${Math.floor(
		// 			value.spend / total,
		// 		)}%; background: ${color}"></div>
		//   </div>
		//   <div class="spending">${value.spend}원</div>
		// </div>`;
		return `<div class="bar-chart-content" id="bar-${value.name}">
    <div class="title">${value.name}</div>
    <div class="per">${Math.floor((value.spend * 100) / total)}%</div>
    <div class="chart">
      <div class="chart-percentage" background: ${color}"></div>
    </div>
    <div class="spending">${value.spend}원</div>
  </div>`;
	}

	render() {
		this.innerHTML = `
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
