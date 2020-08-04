import model from '../models';

class HkbController {
	private model!: any;
	constructor() {
		this.model = model.HkbModel;
	}

	initDate() {
		this.model.getCurrDate();
	}

	ledgerHandler(e) {
		e.stopPropagation();
		const item = e.target.closest('hkb-ledger-item');
		const radioButton = e.target.closest('input[type="radio"]');
		const submitButton = e.target.closest('.submit-button');
		const initButton = e.target.closest('.init-button');
		const deleteButton = e.target.closest('.delete-button');
		const filtrationContainer = e.target.closest('.container-monthly');
		if (item) {
			this.handleItemEdit(item);
		} else if (radioButton) {
			this.handleTypeSelection(radioButton);
		} else if (submitButton) {
			this.handleItemSubmit(submitButton);
		} else if (initButton) {
			this.handleInputInit(initButton);
		} else if (deleteButton) {
			this.handleItemDelete(deleteButton);
		} else if (filtrationContainer) {
			this.handleFiltration(filtrationContainer);
		}
	}

	handleItemEdit(item) {
		console.log('handleItemEdit');
	}

	handleTypeSelection(button) {
		const labels = button.closest('.group').querySelectorAll('label');
		labels.forEach(label => {
			const radio = label.querySelector('input');
			if (radio.checked) {
				label.classList.add('button--active');
			} else {
				label.classList.remove('button--active');
			}
		});
	}

	handleItemSubmit(button) {
		console.log('handleItemSubmit');
	}

	handleInputInit(button) {
		console.log('handleInputInit');
	}

	handleItemDelete(button) {
		console.log('handleItemDelete');
	}

	handleFiltration(filtrationContainer) {
		console.log('handleFiltration');
	}
}

export default new HkbController();
