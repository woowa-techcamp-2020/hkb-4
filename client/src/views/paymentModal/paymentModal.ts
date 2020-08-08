import controller from '../../controller';

class PaymentModal extends HTMLElement {
	private controller = controller.HkbController;
	constructor() {
		super();
	}

	connectedCallback() {
		this.initEvent();
		this.render();
	}

	initEvent() {
		this.addEventListener('click', this.controller.modalHandler.bind(this.controller));
		this.addEventListener('keypress', this.controller.modalHandler.bind(this.controller));
	}

	updatePayments(payments) {
		const paymentsContainer = this.querySelector('.modal__payments');
		let paymentsTemplate = '';
		for (const [id, name] of Object.entries(payments)) {
			paymentsTemplate += `
				<div class="payment" data-id=${id}>
					<span class="payment__name">${name}</span>
					<div class="payment__delete">삭제</div>
				</div>`;
		}
		paymentsContainer.innerHTML = paymentsTemplate;
	}

	render() {
		this.classList.add('hide');
		this.innerHTML = `
      <div class="payment-modal modal">
        <div class="modal__header">
					<i class="meterial-icons	modal__title">credit_card</i>
					<span class="modal__close">X</span>
				</div>
				<div class="modal__add">
					<label for="">결제 수단 이름</label>
					<input type="text" name="payment">
					<div class="button-add">등록</div>
				</div>
        <div class="modal__payments">
        </div>
      </div>
    `;
	}
}

customElements.define('payment-modal', PaymentModal);
export default customElements.get('payment-modal');
