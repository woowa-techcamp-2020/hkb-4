const colors = ['#6581BC', '#E56B77', '#F59745', '#F6BC35', '#94C942', '#9F71C1'];

class ChartsTab extends HTMLElement {
	connectedCallback() {
		this.render();
		this.renderPieChart();
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
		const barChartContainer = this.querySelector('.bar-chart') as SVGViewElement;
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
