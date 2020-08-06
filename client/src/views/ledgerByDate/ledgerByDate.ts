import LedgerItem from '../ledgerItem';

class LedgerByDate extends HTMLElement {
	private data!: any;
	constructor(data: {
		year: number;
		month: number;
		day: number;
		dIncome: number;
		dSpending: number;
		items: Array<any>;
	}) {
		super();
		this.data = data;
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const { month, day, dIncome, dSpending, items } = this.data;
		this.classList.add('date');
		if (!(dIncome || dSpending)) {
			this.classList.add('hide');
			return;
		}
		this.innerHTML = `
			<div class="date__header">
				<span class="date__date">${month}월 ${day}일</span>
				<span class="date__income">+${dIncome}원</span>
				<span class="date__spending">-${dSpending}원</span>
			</div>
		`;
		items.forEach(item => this.appendChild(new LedgerItem(item)));
	}
}

customElements.define('hkb-ledger-by-date', LedgerByDate);
export default customElements.get('hkb-ledger-by-date');
