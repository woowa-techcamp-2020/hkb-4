class LineChart extends HTMLElement {
	constructor() {
		super();
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

	getConversionRatio(num) {
		const numToString = num.toString();
		const digitNum = numToString.length;
		const firstNum = parseInt(numToString.slice(0, 1));
		const secondNum = parseInt(numToString.slice(1, 2));
		let maxNum;
		if (secondNum < 5) {
			maxNum = firstNum * Math.pow(10, digitNum - 1) + 5 * Math.pow(10, digitNum - 2);
		} else {
			maxNum = (firstNum + 1) * Math.pow(10, digitNum - 1);
		}
		const ratio = 380 / maxNum;
		return ratio;
	}

	prepareHorizontalLines() {
		//	TODO: scss => svg 높이 변수 불러와서 사용
		const step = 380 / 5;
		let lines = '';
		for (let i = 1; i <= 5; i++) {
			lines += `<line x1="0" x2="600" y1="${step * (i - 1)}" y2="${step * (i - 1)}"></line>`;
		}
		return lines;
	}

	getPathCommand(conversionRatio) {
		//	TODO: scss => svg 너비 변수 불러와서 사용
		const totalDays = new Date(this.mockData.year, this.mockData.month, 0).getDate();
		const axisXstep = 600 / (totalDays + 1);

		let command = '';
		for (const [day, items] of Object.entries(this.mockData.dailyData)) {
			const x = parseInt(day) * axisXstep;
			const y = 380 - items.spending * conversionRatio;
			if (day === '1') {
				command += `M ${x} ${y} `;
			} else {
				command += `L ${x} ${y} `;
			}
		}
		return command;
	}

	getAvgCommand(conversionRatio) {
		const totalDays = new Date(this.mockData.year, this.mockData.month, 0).getDate();
		const axisXstep = 600 / (totalDays + 1);
		const avgConverted = (this.mockData.monthlyData.spending / totalDays) * conversionRatio;
		console.log(avgConverted);
		const command = `M 0 ${380 - avgConverted} L 600 ${380 - avgConverted}`;
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
		const totalDays = new Date(this.mockData.year, this.mockData.month, 0).getDate();
		const axisXstep = 600 / (totalDays + 1);
		let xLabels = '';
		for (let i = 1; i <= totalDays; i += 5) {
			xLabels += `<text x="${axisXstep * i}" y="400">${this.mockData.month}.${i}</text>`;
		}
		return xLabels;
	}

	getYlabels(max) {
		const axisStep = 380 / 5;
		const amountStep = max / 5;
		let yLabels = '';
		for (let i = 1; i <= 5; i++) {
			yLabels += `<text x="-50" y="${390 - axisStep * i}">${amountStep * i}</text>;`;
		}
		return yLabels;
	}

	renderLineChart() {
		const lineChartArea = document.querySelector('svg.line-chart');
		const lines = this.prepareHorizontalLines();
		lineChartArea.querySelector('g.lines').innerHTML = lines;
		const maxSpending = this.getMaxSpending();
		const conversionRatio = this.getConversionRatio(maxSpending);
		const command = this.getPathCommand(conversionRatio);
		lineChartArea.querySelector('path.line').setAttribute('d', command);
		const avgCommand = this.getAvgCommand(conversionRatio);
		lineChartArea.querySelector('path.average').setAttribute('d', avgCommand);
		const xLabels = this.getXlabels();
		lineChartArea.querySelector('g.x-labels').innerHTML = xLabels;
		const yLabels = this.getYlabels(maxSpending);
		lineChartArea.querySelector('g.y-labels').innerHTML = yLabels;
	}

	render() {
		this.innerHTML = `
      <div class="line-chart-container">
				<svg class="line-chart" viewbox="-60 -20 680 430">
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
							M 0 380
							L 600 380
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
