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
		},
		monthlyData: { income: 1380000, spending: 517100 },
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
		const step = 380 / 10;
		let lines = '';
		for (let i = 1; i <= 10; i++) {
			lines += `<line x1="0" x2="600" y1="${step * i}" y2="${step * i}"></line>`;
		}
		return lines;
	}

	getPathCommand(conversionRatio) {
		//	TODO: scss => svg 너비 변수 불러와서 사용
		const totalDays = new Date(this.mockData.year, this.mockData.month, 0).getDate();
		const axisXstep = 600 / totalDays;

		let command = '';
		for (const [day, items] of Object.entries(this.mockData.dailyData)) {
			const x = parseInt(day) * axisXstep;
			const y = items.spending * conversionRatio;
			if (day === '1') {
				command += `M ${x} ${y} `;
			} else {
				command += `L ${x} ${y} `;
			}
		}
		return command;
	}

	renderLineChart() {
		const lineChartArea = document.querySelector('svg.line-chart');
		const lines = this.prepareHorizontalLines();
		lineChartArea.querySelector('g.lines').innerHTML = lines;
		const conversionRatio = this.getConversionRatio(this.mockData.monthlyData.spending);
		const command = this.getPathCommand(conversionRatio);
		lineChartArea.querySelector('path.line').setAttribute('d', command);
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
					<path class="line" d=""/>
				</svg>
      </div>
    `;
	}
}

customElements.define('hkb-line', LineChart);
export default customElements.get('hkb-line');
