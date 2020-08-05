class LineChart extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
		this.renderLineChart();
	}

	drawHorizontalLines(area) {
		//	TODO: scss => svg 높이 변수 불러와서 사용
		const step = 380 / 10;
		let lines = '';
		for (let i = 1; i <= 10; i++) {
			lines += `<line x1="0" x2="600" y1="${step * i}" y2="${step * i}"></line>`;
		}
		area.querySelector('g.lines').innerHTML = lines;
	}

	renderLineChart() {
		const lineChartArea = document.querySelector('svg.line-chart');
		this.drawHorizontalLines(lineChartArea);
	}

	render() {
		this.innerHTML = `
      <div class="line-chart-container">
				<svg class="line-chart">
					<path
						class="axis axis--x"
						d="
							M 0 0
							L 600 0
						"
					></path>
					<g class="lines">
					</g>
				</svg>
      </div>
    `;
	}
}

customElements.define('hkb-line', LineChart);
export default customElements.get('hkb-line');
