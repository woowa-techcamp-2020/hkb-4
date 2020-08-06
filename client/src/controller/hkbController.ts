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
			this.handleItemClick(item);
		} else if (radioButton) {
			this.toggleTypeButton(radioButton);
		} else if (submitButton) {
			this.handleItemSubmit(submitButton);
		} else if (initButton) {
			this.handleInputInit();
		} else if (deleteButton) {
			this.handleItemDelete(deleteButton);
		} else if (filtrationContainer) {
			this.handleFiltrationLedger(filtrationContainer);
		}
	}

	handleItemClick(item) {
		const inputContainer = item.closest('hkb-ledger').querySelector('.container-input');
		const submitButton = inputContainer.querySelector('.submit-button');
		const deleteButton = inputContainer.querySelector('.delete-button');
		submitButton.classList.add('edit-button');
		submitButton.dataset.id = item.data.id;
		deleteButton.dataset.id = item.data.id;
		this.fillInput(item, inputContainer);
	}

	changhOption(type, item) {
		const optionsContainer = document.querySelector(`select[name="${type}"`);
		const options = optionsContainer.querySelectorAll('option');
		options.forEach(option => {
			if (option.value === item.data[type].toString()) {
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
		const checkedRadioButton = inputContainer.querySelector(`input[value="${type}"]`);
		checkedRadioButton.checked = true;
		this.toggleTypeButton(checkedRadioButton);
		(inputContainer.querySelector('input[name="amount"]') as HTMLInputElement).value = amount;
		(inputContainer.querySelector(
			'input[name="description"]',
		) as HTMLInputElement).value = description;
		(inputContainer.querySelector('input[type="date"]') as HTMLInputElement).value = date;
		this.changhOption('category', item);
		this.changhOption('pid', item);
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

	changeCategory(type) {
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
		if (type === ItemDTO.ItemType.INCOME) {
			categorySelect.innerHTML = incomeCategory.reduce(
				(prev, next) => prev + `<option value="${next}">${next}</option>`,
				'<option value="" hidden selected disabled>선택하세요</option>',
			);
		} else {
			categorySelect.innerHTML = spendingCategory.reduce(
				(prev, next) => prev + `<option value="${next}">${next}</option>`,
				'<option value="" hidden selected disabled>선택하세요</option>',
			);
		}
	}

	async handleItemSubmit(button) {
		const inputContainer = document.querySelector('.container-input');
		const type = parseInt(
			(inputContainer.querySelector('input[name="type"]:checked') as HTMLInputElement).value,
		);
		const date = (inputContainer.querySelector('input[name="date"]') as HTMLInputElement).value;
		const category = (inputContainer.querySelector(
			'select[name="category"]>option:checked',
		) as HTMLInputElement).value;
		const pid_item = parseInt(
			(inputContainer.querySelector('select[name="pid"]>option:checked') as HTMLInputElement).value,
		);
		const amount = parseInt(
			(inputContainer.querySelector('input[name="amount"]') as HTMLInputElement).value,
		);
		const description = (inputContainer.querySelector(
			'input[name="description"]',
		) as HTMLInputElement).value;

		const inputData = { type, date, category, pid_item, amount, description };

		if (button.classList.contains('edit-button')) {
			const id = parseInt(button.dataset.id);
			await this.model.fetchItemEdit({ id, ...inputData });
			this.handleButtonInit();
		} else {
			await this.model.fetchItemCreate(inputData);
		}
	}

	handleButtonInit() {
		const submitButton = document.querySelector('submit-button');
		const deleteButton = document.querySelector('delete-button');
		const initButton = document.querySelector('init-button');
		initButton.classList.remove('hide');
		deleteButton.classList.add('hide');
		deleteButton.removeAttribute('data-id');
		submitButton.classList.remove('edit-button');
		submitButton.removeAttribute('data-id');
	}

	initType() {
		const spendingButton = document.querySelector(
			`input[name="type"][value="${ItemDTO.ItemType.SPENDING}"]`,
		);
		// @ts-ignore
		spendingButton.checked = true;
		this.toggleTypeButton(spendingButton);
	}

	initDate() {
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth() + 1;
		const date = today.getDate();
		const todayToString = `${year}-${month > 10 ? month : `0${month}`}-${
			date > 10 ? date : `0${date}`
		}`;
		const dateInput = document.querySelector('input[name="date"]');
		// @ts-ignore
		dateInput.value = todayToString;
	}

	initCategory() {
		const categorySelect = document.querySelector('select[name="category"]');
		const options = categorySelect.querySelectorAll('option');
		options[0].selected = true;
	}

	initPayment() {
		const paymentSelect = document.querySelector('select[name="pid"]');
		const options = paymentSelect.querySelectorAll('option');
		options[0].selected = true;
	}

	initAmount() {
		const amountInput = document.querySelector('input[name="amount"]');
		// @ts-ignore
		amountInput.value = '';
	}

	initDescription() {
		const descriptionInput = document.querySelector('input[name="description"]');
		// @ts-ignore
		descriptionInput.value = '';
	}

	handleInputInit() {
		this.initType();
		this.initDate();
		this.initCategory();
		this.initPayment();
		this.initAmount();
		this.initDescription();
	}

	async handleItemDelete(button) {
		const inputContainer = document.querySelector('.container-input');
		const date = (inputContainer.querySelector('input[name="date"]') as HTMLInputElement).value;
		const id = parseInt(button.dataset.id);
		await this.model.fetchItemDelete({ id, date });
		this.handleButtonInit();
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
