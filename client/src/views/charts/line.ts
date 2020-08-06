import { numberToString } from '../../util/common';

class LineChart extends HTMLElement {
	private config!: any;
	constructor() {
		super();
		this.config = {
			totalDays: null,
			maxSpending: null,
			conversionRatio: null,
			xStep: null,
			yStep: null,
			horizontalLineNumber: 5,
			width: 600,
			height: 380,
		};
	}

	connectedCallback() {
		this.render();
		this.renderLineChart();
	}

	mockData = {
		year: 2020,
		month: 8,
		dailyData: {
			1: { income: 0, spending: 22000 },
			2: { income: 0, spending: 17000 },
			3: { income: 0, spending: 31000 },
			4: { income: 0, spending: 5000 },
			5: { income: 0, spending: 9000 },
			6: { income: 0, spending: 11000 },
			7: { income: 0, spending: 30000 },
			8: { income: 0, spending: 29000 },
			9: { income: 0, spending: 6500 },
			10: { income: 0, spending: 19000 },
			11: { income: 0, spending: 17000 },
			12: { income: 0, spending: 21000 },
			13: { income: 0, spending: 7800 },
			14: { income: 0, spending: 6000 },
			15: { income: 0, spending: 41000 },
			16: { income: 0, spending: 39000 },
			17: { income: 0, spending: 28500 },
			18: { income: 0, spending: 39000 },
			19: { income: 0, spending: 5000 },
			20: { income: 0, spending: 5500 },
			21: { income: 0, spending: 18000 },
			22: { income: 0, spending: 7000 },
			23: { income: 0, spending: 22000 },
			24: { income: 0, spending: 9000 },
			25: { income: 1380000, spending: 12000 },
			26: { income: 0, spending: 30000 },
			27: { income: 0, spending: 5000 },
			28: { income: 0, spending: 7800 },
			29: { income: 0, spending: 5000 },
			30: { income: 0, spending: 12000 },
			31: { income: 0, spending: 10000 },
		},
		monthlyData: { income: 1380000, spending: 527100 },
	};

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

	getPathCommand() {
		const { width, height, totalDays, conversionRatio } = this.config;
		const axisXstep = width / (totalDays + 1);

		let command = '';
		for (const [day, items] of Object.entries(this.mockData.dailyData)) {
			const x = parseInt(day) * axisXstep;
			const y = height - items.spending * conversionRatio;
			if (day === '1') {
				command += `M ${x} ${y} `;
			} else {
				command += `L ${x} ${y} `;
			}
		}
		return command;
	}

	getAvgCommand() {
		const { width, height, totalDays, conversionRatio } = this.config;
		const avgConverted = (this.mockData.monthlyData.spending / totalDays) * conversionRatio;
		const command = `M 0 ${height - avgConverted} L ${width} ${height - avgConverted}`;
		return command;
	}

	getMaxSpending() {
		let maxSpending = 0;
		Object.values(this.mockData.dailyData).forEach(data => {
			if (data.spending > maxSpending) maxSpending = data.spending;
		});
		return maxSpending;
	}

	getXlabels() {
		const { totalDays, xStep } = this.config;
		let xLabels = '';
		for (let i = 1; i <= totalDays; i += 5) {
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
		const { totalDays } = this.config;
		const axisXstep = 600 / (totalDays + 1);
		return axisXstep;
	}

	getYstep() {
		const { maxSpending } = this.config;
		const amountStep = maxSpending / 5;
		return amountStep;
	}

	setConfig() {
		this.config['totalDays'] = new Date(this.mockData.year, this.mockData.month, 0).getDate();
		this.config['maxSpending'] = this.getMaxSpending();
		this.config['conversionRatio'] = this.getConversionRatio();
		this.config['xStep'] = this.getXstep();
		this.config['yStep'] = this.getYstep();
	}

	drawLine() {
		const chartArea = document.querySelector('svg.line-chart');
		const command = this.getPathCommand();
		chartArea.querySelector('path.line').setAttribute('d', command);
	}

	drawAverageLine() {
		const chartArea = document.querySelector('svg.line-chart');
		const avgCommand = this.getAvgCommand();
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

	showAvgSpending() {
		const { totalDays } = this.config;
		const wrapper = document.querySelector('.line-chart-container');
		const avgSpendingContainer = wrapper.querySelector('.avg-spending');
		// @ts-ignore
		const avgSpending = parseInt(this.mockData.monthlyData.spending / totalDays);
		// @ts-ignore
		avgSpendingContainer.innerText = `이번 달 일평균 ${numberToString(avgSpending)}원`;
	}

	renderLineChart() {
		this.setConfig();
		this.showAvgSpending();
		this.drawXaxis();
		this.drawYaxis();
		this.drawHorizontalLines();
		this.drawLine();
		this.drawAverageLine();
	}

	render() {
		const { height } = this.config;
		this.innerHTML = `
			<div class="line-chart-container">
				<div class="avg-spending"></div>
				<svg class="line-chart" viewbox="-80 -20 700 430">
					<defs>
						<marker
							id="dot"
							viewBox="0 0 10 10"
							refX="5"
							refY="5"
							markerWidth="5"
							markerHeight="5"
						>
							<circle cx="5" cy="5" r="3" />
						</marker>
					</defs>
					<path
						class="axis axis--x"
						d="
							M 0 ${height}
							L 600 ${height}
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
