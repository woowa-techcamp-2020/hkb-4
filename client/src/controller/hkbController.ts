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
			this.toggleTypeButton(radioButton);
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
		const inputContainer = item.closest('hkb-ledger').querySelector('.container-input');
		this.fillInput(item, inputContainer);
	}

	changeSelectOption(type, item) {
		const optionsContainer = document.querySelector(`select[name="${type}"`);
		const options = optionsContainer.querySelectorAll('option');
		options.forEach(option => {
			if (option.value === item[type]) {
				option.setAttribute('selected', '');
			}
		});
	}

	fillInput(item, inputContainer) {
		inputContainer.querySelector('.init-button').classList.add('hide');
		inputContainer.querySelector('.delete-button').classList.remove('hide');
		const checkedRadioButton = inputContainer.querySelector(`input[value="${item.type}"]`);
		checkedRadioButton.checked = true;
		this.toggleTypeButton(checkedRadioButton);
		// @ts-ignore
		inputContainer.querySelector('input[name="amount"]').value = item.amount;
		//@ts-ignore
		inputContainer.querySelector('input[name="description"]').value = item.description;
		//@ts-ignore
		inputContainer.querySelector('input[type="date"]').value = '2020-01-01';
		this.changeSelectOption('category', item);
		this.changeSelectOption('payment', item);
	}

	toggleTypeButton(button) {
		const labels = button.closest('.group').querySelectorAll('label');
		labels.forEach(label => {
			const radio = label.querySelector('input');
			if (radio.checked) {
				label.classList.add('button--active');
				this.changeCategory(radio.value);
			} else {
				label.classList.remove('button--active');
			}
		});
	}

	changeCategory(category) {
		const spendingCategory = [
			'식비',
			'생활',
			'쇼핑/뷰티',
			'교통',
			'의료/건강',
			'문화/여가',
			'미지정',
		];
		const incomeCategory = ['월급', '용돈', '기타수입'];
		const categorySelect = document.querySelector('select[name="category"]');
		if (category === '수입') {
			categorySelect.innerHTML = incomeCategory.reduce(
				(prev, next) => prev + `<option value="${next}">${next}</option>`,
				'',
			);
		} else {
			categorySelect.innerHTML = spendingCategory.reduce(
				(prev, next) => prev + `<option value="${next}">${next}</option>`,
				'',
			);
		}
		categorySelect.firstElementChild.setAttribute('selected', '');
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
