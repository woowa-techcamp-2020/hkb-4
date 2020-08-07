import { numberToString } from '../../util/common';

class LineChart extends HTMLElement {
	private config!: any;
	constructor() {
		super();
		this.config = {
			totalDate: null,
			maxSpending: null,
			conversionRatio: null,
			xStep: null,
			yStep: null,
			horizontalLineNumber: 5,
			width: 800,
			height: 380,
		};
	}

	update(data) {
		const svg = this.querySelector('svg') as SVGElement;
		this.classList.add('display-none');
		this.classList.remove('display-none');
		this.render();
		this.renderLineChart(data);
	}

	getConversionRatio() {
		const { height, maxSpending } = this.config;
		const numToString = maxSpending.toString();
		const digitNum = numToString.length;
		const firstNum = parseInt(numToString.slice(0, 1));
		const secondNum = parseInt(numToString.slice(1, 2));
		let maxYaxis;
		if (secondNum < 5) {
			maxYaxis = (firstNum + 1) * Math.pow(10, digitNum - 1) - 5 * Math.pow(10, digitNum - 2);
		} else {
			maxYaxis = (firstNum + 1) * Math.pow(10, digitNum - 1);
		}
		const ratio = height / maxYaxis;
		return ratio;
	}

	prepareHorizontalLines() {
		const { width, height, horizontalLineNumber } = this.config;
		const step = height / horizontalLineNumber;
		let lines = '';
		for (let i = 1; i <= horizontalLineNumber; i++) {
			lines += `<line x1="0" x2="${width}" y1="${step * (i - 1)}" y2="${step * (i - 1)}"></line>`;
		}
		return lines;
	}

	drawHorizontalLines() {
		const chartArea = document.querySelector('svg.line-chart');
		const lines = this.prepareHorizontalLines();
		chartArea.querySelector('g.lines').innerHTML = lines;
	}

	getPathCommand(data) {
		const { width, height, totalDate, conversionRatio } = this.config;
		const axisXstep = width / (totalDate + 1);
		let command = '';
		for (const [day, items] of Object.entries(data.dailyData)) {
			const x = parseInt(day) * axisXstep;
			// @ts-ignore
			const y = height - items.spending * conversionRatio;
			if (day === '1') {
				command += `M ${x} ${y} `;
			} else {
				command += `L ${x} ${y} `;
			}
		}
		return command;
	}

	getAvgCommand(data) {
		const { width, height, totalDate, conversionRatio } = this.config;
		const avgConverted = (data.monthlyData.spending / totalDate) * conversionRatio;
		const command = `M 0 ${height - avgConverted} L ${width} ${height - avgConverted}`;
		return command;
	}

	getMaxSpending(data) {
		let maxSpending = 0;
		Object.values(data.dailyData).forEach((d: { spending: number; income: number }) => {
			if (d.spending > maxSpending) maxSpending = d.spending;
		});
		return maxSpending;
	}

	getXlabels() {
		const { totalDate, xStep } = this.config;
		let xLabels = '';
		for (let i = 1; i <= totalDate; i += 5) {
			xLabels += `<text x="${xStep * i}" y="400">${i}</text>`;
		}
		return xLabels;
	}

	getYlabels() {
		const { height, yStep } = this.config;
		const axisStep = height / 5;
		let yLabels = '';
		for (let i = 1; i <= 5; i++) {
			yLabels += `<text x="-70" y="${390 - axisStep * i}">${numberToString(yStep * i)}원</text>;`;
		}
		return yLabels;
	}

	getXstep() {
		const { width, totalDate } = this.config;
		const axisXstep = width / (totalDate + 1);
		return axisXstep;
	}

	getYstep() {
		const { maxSpending } = this.config;
		const amountStep = maxSpending / 5;
		return amountStep;
	}

	setConfig(data) {
		this.config['totalDate'] = new Date(data.year, data.month, 0).getDate();
		this.config['maxSpending'] = this.getMaxSpending(data);
		this.config['conversionRatio'] = this.getConversionRatio();
		this.config['xStep'] = this.getXstep();
		this.config['yStep'] = this.getYstep();
	}

	drawLine(data) {
		const chartArea = document.querySelector('svg.line-chart');
		const command = this.getPathCommand(data);
		chartArea.querySelector('path.line').setAttribute('d', command);
	}

	drawAverageLine(data) {
		const chartArea = document.querySelector('svg.line-chart');
		const avgCommand = this.getAvgCommand(data);
		chartArea.querySelector('path.average').setAttribute('d', avgCommand);
	}

	drawXaxis() {
		const chartArea = document.querySelector('svg.line-chart');
		const xLabels = this.getXlabels();
		chartArea.querySelector('g.x-labels').innerHTML = xLabels;
	}

	drawYaxis() {
		const chartArea = document.querySelector('svg.line-chart');
		const yLabels = this.getYlabels();
		chartArea.querySelector('g.y-labels').innerHTML = yLabels;
	}

	showAvgSpending(data) {
		const { totalDate } = this.config;
		const wrapper = document.querySelector('.line-chart-container');
		const avgSpendingContainer = wrapper.querySelector('.avg-spending');
		// @ts-ignore
		const avgSpending = parseInt(data.monthlyData.spending / totalDate);
	}

	renderLineChart(data) {
		this.setConfig(data);
		this.showAvgSpending(data);
		this.drawXaxis();
		this.drawYaxis();
		this.drawHorizontalLines();
		this.drawLine(data);
		this.drawAverageLine(data);
	}

	render() {
		const { height } = this.config;
		this.innerHTML = `
			<div class="line-chart-container">
				<div class="avg-spending"></div>
				<svg class="line-chart" viewbox="10 -20 700 430">
					<defs>
						<marker
							id="dot"
							viewBox="0 0 10 10"
							refX="5"
							refY="5"
							markerWidth="5"
							markerHeight="5"
						>
							<circle cx="5" cy="5" r="4" />
						</marker>
					</defs>
					<path
						class="axis axis--x"
						d="
							M 0 ${height}
							L 800 ${height}
						"
					></path>
					<g class="lines">
					</g>
					<g class="labels x-labels">
					</g>
					<g class="labels y-labels">
					</g>
					<path
						class="average"
						d=""
						fill="none"
						stroke="gray"
						stroke-width="0.5"
					/>
					<path class="line" d=""
						marker-start="url(#dot)"
						marker-mid="url(#dot)"
						marker-end="url(#dot)"/>
					<path class="x-axis" d=""/>
				</svg>
      </div>
    `;
	}
}

customElements.define('hkb-line', LineChart);
export default customElements.get('hkb-line');
