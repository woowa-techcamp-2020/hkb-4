class LedgerByDate extends HTMLElement {
	private month!: number;
	private day!: number;
	private dIncome!: number;
	private dSpending!: number;
	constructor(data: {
		month: number;
		day: number;
		dIncome: number;
		dSpending: number;
		items: Array<any>;
	}) {
		super();
		this.month = data.month;
		this.day = data.day;
		this.dIncome = data.dIncome;
		this.dSpending = data.dSpending;
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<div class="date">
				<div class="date__header">
					<span class="date__date">${this.month}월 ${this.day}일</span>
					<span class="date__income">
					+${this.dIncome}원</span>
					<span class="date__spending">-${this.dSpending}원</span>
				</div>
			</div>
		`;
		// TODO: custom element에 클래스로 스타일링 주는 게 안되는 상태
		if (!(this.dIncome || this.dSpending)) {
			const dateGroup = this.querySelector('.date');
			if (dateGroup) {
				dateGroup.classList.add('hide');
			}
		}
	}
}

customElements.define('hkb-ledger-by-date', LedgerByDate);
export default customElements.get('hkb-ledger-by-date');
