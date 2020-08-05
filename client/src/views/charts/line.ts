class LineChart extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.render();
		this.renderLineChart();
	}

	renderLineChart() {}

	render() {
		this.innerHTML = `
      <div class="line-chart-container">
        <svg class="line-chart"></svg>
      </div>
    `;
	}
}

customElements.define('hkb-line', LineChart);
export default customElements.get('hkb-line');
