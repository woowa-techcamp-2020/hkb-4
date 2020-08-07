import { ItemDTO } from '../../../../shared/dto';
import { numberToString } from '../../util/common';

class LedgerItem extends HTMLElement {
	private data!: any;
	constructor(data: any) {
		super();
		this.data = data;

		this.render();
	}

	render() {
		const { type, category, payment, amount, description } = this.data;
		this.setAttribute('type', type === ItemDTO.ItemType.INCOME ? 'income' : 'spending');
		this.innerHTML = `
			<div class="item__category">
				<span class="${type === 1 ? 'income' : 'spending'}">
					${category}</span>
			</div>
			<div class="item__description">${description}</div>
			<div class="item__payment">${payment}</div>
			<div class="item__amount ${type === 1 ? 'income' : 'spending'}">
				${type === 1 ? '+' : '-'} ${numberToString(amount)}원
			</div>
    `;
	}
}

customElements.define('hkb-ledger-item', LedgerItem);
export default customElements.get('hkb-ledger-item');
