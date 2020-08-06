import model from '../models';
import { ItemDTO } from '../../../shared/dto';
import { template } from '@babel/core';

class HkbController {
	private model!: any;
	constructor() {
		this.model = model.HkbModel;
	}

	async init() {
		await this.model.initPayment();
		await this.model.initData();
	}

	changeTab() {
		const tab = (event.target as HTMLElement).closest('li');
		if (!tab) return;
		this.model.setTabName(tab.getAttribute('name'));
	}

	changePrevMonth() {
		const date = this.model.getDate();
		const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
		this.model.setYearMonth(newDate.getFullYear(), newDate.getMonth());
	}
	changeNextMonth() {
		const date = this.model.getDate();
		const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
		this.model.setYearMonth(newDate.getFullYear(), newDate.getMonth());
	}

	ledgerHandler(e) {
		e.stopPropagation();
		const item = e.target.closest('hkb-ledger-item');
		const radioButton = e.target.closest('input[type="radio"]');
		const submitButton = e.target.closest('.submit-button');
		const initButton = e.target.closest('.init-button');
		const deleteButton = e.target.closest('.delete-button');
		const filtrationContainer = e.target.closest('input[type="checkbox"]');
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
			this.handleFiltrationLedger(filtrationContainer);
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
		const {
			data: { type, amount, description, date },
		} = item;
		inputContainer.querySelector('.init-button').classList.add('hide');
		inputContainer.querySelector('.delete-button').classList.remove('hide');
		const checkedRadioButton = inputContainer.querySelector(
			`input[value="${type === 1 ? '수입' : '지출'}"]`,
		);
		checkedRadioButton.checked = true;
		this.toggleTypeButton(checkedRadioButton);
		// @ts-ignore
		inputContainer.querySelector('input[name="amount"]').value = amount;
		//@ts-ignore
		inputContainer.querySelector('input[name="description"]').value = description;
		//@ts-ignore
		inputContainer.querySelector('input[type="date"]').value = date;
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

	async handleItemSubmit(button) {
		const inputContainer = document.querySelector('.container-input');
		// @ts-ignore
		const type = parseInt(inputContainer.querySelector('input[name="type"]:checked').value);
		// @ts-ignore
		const date = inputContainer.querySelector('input[name="date"]').value;
		// @ts-ignore
		const category = inputContainer.querySelector('select[name="category"]>option:checked').value;
		// @ts-ignore
		const pid_item = parseInt(
			(inputContainer.querySelector('select[name="payment"]>option:checked') as HTMLInputElement)
				.value,
		);
		// @ts-ignore
		const amount = parseInt(inputContainer.querySelector('input[name="amount"]').value);
		// @ts-ignore
		const description = inputContainer.querySelector('input[name="description"]').value;

		const inputData = { type, date, category, pid_item, amount, description };
		await this.model.fetchItemCreated(inputData);
	}

	handleInputInit(button) {
		console.log('handleInputInit');
	}

	handleItemDelete(button) {
		console.log('handleItemDelete');
	}

	handleFiltrationLedger(filtrationContainer) {
		const ledgerContainer = document.querySelector('hkb-ledger') as HTMLElement;
		const checkedIncome = ledgerContainer.querySelector('.income-input') as HTMLInputElement;
		const checkedSpending = ledgerContainer.querySelector('.spending-input') as HTMLInputElement;
		const items = document.querySelectorAll('hkb-ledger-item') as NodeListOf<Element>;
		const dateItems = document.querySelectorAll('hkb-ledger-by-date') as NodeListOf<Element>;
		items.forEach(item => {
			if (item.getAttribute('type') === filtrationContainer.getAttribute('content')) {
				filtrationContainer.checked
					? item.classList.remove('display-none')
					: item.classList.add('display-none');
			}
		});

		dateItems.forEach(date => {
			const income = date.querySelector('.date__income') as HTMLElement;
			const spending = date.querySelector('.date__spending') as HTMLElement;
			if (checkedIncome.checked) {
				income.classList.remove('display-none');
			} else {
				income.classList.add('display-none');
			}
			if (checkedSpending.checked) {
				spending.classList.remove('display-none');
			} else {
				spending.classList.add('display-none');
			}
			if (
				(spending.classList.contains('display-none') &&
					income.classList.contains('display-none')) ||
				(income.classList.contains('display-none') && spending.textContent === '-0원') ||
				(spending.classList.contains('display-none') && income.textContent === '+0원')
			) {
				date.classList.add('display-none');
			} else {
				date.classList.remove('display-none');
			}
		});
	}
}

export default new HkbController();
