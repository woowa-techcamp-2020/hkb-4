import LedgerItem from '../ledgerItem';

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
		if (!(this.dIncome || this.dSpending)) return;
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

		const dateGroup = this.querySelector('.date');
		const mockData = [
			{
				id: 1,
				type: '지출',
				category: '식비',
				payment: '현대카드',
				amount: 20000,
				description: '맥도날드',
			},
			{
				id: 2,
				type: '수입',
				category: '월급',
				payment: '현대카드',
				amount: 2500000,
				description: '월급',
			},
		];

		if (dateGroup) {
			for (let i = 0; i < mockData.length; i++) {
				dateGroup.appendChild(new LedgerItem(mockData[i]));
			}
		}
	}
}

customElements.define('hkb-ledger-by-date', LedgerByDate);
export default customElements.get('hkb-ledger-by-date');
