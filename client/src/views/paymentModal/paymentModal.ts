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
	}

	render() {
		this.classList.add('hide');
		this.innerHTML = `
      <div class="payment-modal modal">
        <div class="modal__header">
					<span class="modal__title">결제수단 관리</span>
					<span class="modal__close">X</span>
        </div>
        <div class="modal__content">
        </div>
      </div>
    `;
	}
}

customElements.define('payment-modal', PaymentModal);
export default customElements.get('payment-modal');
