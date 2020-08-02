class LedgerItem extends HTMLElement {
	private type!: string;
	private category!: string;
	private payment!: string;
	private amount!: number;
	private description!: string;
	constructor(data: any) {
		super();
		this.id = data.id;
		this.type = data.type;
		this.category = data.category;
		this.payment = data.payment;
		this.amount = data.amount;
		this.description = data.description;

		this.render();
	}

	render() {
		this.innerHTML = `
      <div class="date__item">
				<div class="item__category">
					<span class="${this.type === '지출' ? 'spending' : 'income'}">
						${this.category}</span>
				</div>
        <div class="item__description">${this.description}</div>
        <div class="item__payment">${this.payment}</div>
				<div class="item__amount ${this.type === '지출' ? 'spending' : 'income'}">
					${this.type === '지출' ? '-' : '+'} ${this.amount}원
				</div>
      </div>
    `;
	}
}

customElements.define('hbk-ledger-item', LedgerItem);
export default customElements.get('hbk-ledger-item');
