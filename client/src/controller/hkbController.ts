import model from '../models';
import { ItemDTO } from '../../../shared/dto';

class HkbController {
	private model!: any;
	private validator!: any;
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

	headerHandler(e) {
		e.stopPropagation();
		const paymentButton = e.target.closest('.payment-button');
		if (paymentButton) {
			this.openPaymentManager();
		}
	}

	openPaymentManager() {
		const paymentManager = document.querySelector('payment-modal');
		paymentManager.classList.remove('hide');
		const paymentInput = paymentManager.querySelector('input[name="payment"]');
		(paymentInput as HTMLInputElement).focus();
	}

	modalHandler(e) {
		e.stopPropagation();
		const closeButton = e.target.closest('.modal__close');
		const paymentInput = e.target.closest('input[name="payment"]');
		const addButton = e.target.closest('.button-add');
		const deleteButton = e.target.closest('.payment__delete');
		const isBackDropClicked = e.target.tagName === 'PAYMENT-MODAL';
		if (closeButton) {
			this.closeModal();
		} else if (addButton) {
			const newPayment = addButton.closest('.modal__add').querySelector('input[name="payment"]')
				.value;
			this.addPayment(newPayment);
		} else if (paymentInput) {
			if (e.key === 'Enter') {
				this.enterOnInput((paymentInput as HTMLInputElement).value);
			}
		} else if (deleteButton) {
			const deleteId = deleteButton.closest('.payment').dataset.id;
			this.deletePayment(deleteId);
		} else if (isBackDropClicked) {
			this.closeModal();
		}
	}

	enterOnInput(value) {
		this.addPayment(value);
	}

	async deletePayment(id) {
		await this.model.fetchPaymentDelete(id);
		const paymentInput = document.querySelector('payment-modal input[name="payment"]');
		paymentInput.classList.remove('invalid');
		(paymentInput as HTMLInputElement).value = '';
	}

	async addPayment(paymentName) {
		const isAddable = await this.model.fetchPaymentCreate({ name: paymentName });
		const paymentInput = document.querySelector('payment-modal input[name="payment"]');
		if (!isAddable) {
			paymentInput.classList.add('invalid');
		} else {
			paymentInput.classList.remove('invalid');
			(paymentInput as HTMLInputElement).value = '';
		}
	}

	closeModal() {
		const modal = document.querySelector('payment-modal');
		modal.classList.add('hide');
	}

	ledgerHandler(e) {
		e.stopPropagation();
		const item = e.target.closest('hkb-ledger-item');
		const radioButton = e.target.closest('input[type="radio"]');
		const submitButton = e.target.closest('.submit-button');
		const initButton = e.target.closest('.init-button');
		const deleteButton = e.target.closest('.delete-button');
		const cancelButton = e.target.closest('.cancel-button');
		const filtrationContainer = e.target.closest('input[type="checkbox"]');
		if (item) {
			this.handleItemClick(item);
		} else if (radioButton) {
			this.toggleTypeButton(radioButton);
		} else if (submitButton) {
			this.handleSubmitClick(submitButton);
		} else if (initButton) {
			this.handleInputInit();
		} else if (deleteButton) {
			this.handleItemDelete(deleteButton);
		} else if (filtrationContainer) {
			this.handleFiltrationLedger();
		} else if (cancelButton) {
			this.handleCancelbuttonClick();
		}
	}

	handleCancelbuttonClick() {
		this.handleButtonInit();
		this.handleInputInit();
	}

	handleItemClick(item) {
		const inputContainer = item.closest('hkb-ledger').querySelector('.container-input');
		const submitButton = inputContainer.querySelector('.submit-button');
		const deleteButton = inputContainer.querySelector('.delete-button');
		const initButton = inputContainer.querySelector('.init-button');
		submitButton.classList.add('edit-button');
		submitButton.innerText = '수정';
		submitButton.dataset.id = item.data.id;
		deleteButton.dataset.id = item.data.id;
		this.handleInputInit();
		this.fillInput(item, inputContainer);
	}

	changeOption(type, item) {
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
		inputContainer.querySelector('.delete-button-zone').classList.remove('hide');
		const checkedRadioButton = inputContainer.querySelector(`input[value="${type}"]`);
		checkedRadioButton.checked = true;
		this.toggleTypeButton(checkedRadioButton);
		(inputContainer.querySelector('input[name="amount"]') as HTMLInputElement).value = amount;
		(inputContainer.querySelector(
			'input[name="description"]',
		) as HTMLInputElement).value = description;
		(inputContainer.querySelector('input[type="date"]') as HTMLInputElement).value = date;
		this.changeOption('category', item);
		this.changeOption('pid', item);
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
		if (parseInt(type) === ItemDTO.ItemType.INCOME) {
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

	validateSelect(inputContainer, name) {
		const select = inputContainer.querySelector(`select[name="${name}"]`);
		const selectedOption = select.querySelector('option:checked').value;
		if (selectedOption) {
			select.classList.remove('invalid');
		} else {
			select.classList.add('invalid');
		}
		return selectedOption;
	}

	validateInput(inputContainer, name) {
		const input = inputContainer.querySelector(`input[name="${name}"]`);
		const value = input.value;
		if (value) {
			input.classList.remove('invalid');
		} else {
			input.classList.add('invalid');
		}
		return value;
	}

	async submitContent(button, data) {
		if (button.classList.contains('edit-button')) {
			const id = parseInt(button.dataset.id);
			await this.model.fetchItemEdit({ id, ...data });
			this.handleInputInit();
			this.handleButtonInit();
		} else {
			await this.model.fetchItemCreate(data);
			this.handleInputInit();
		}
	}

	async handleSubmitClick(button) {
		const inputContainer = document.querySelector('.container-input');
		const type = parseInt(
			(inputContainer.querySelector('input[name="type"]:checked') as HTMLInputElement).value,
		);
		const date = (inputContainer.querySelector('input[name="date"]') as HTMLInputElement).value;
		const category = this.validateSelect(inputContainer, 'category');
		const pid_item = this.validateSelect(inputContainer, 'pid');
		const amount = this.validateInput(inputContainer, 'amount');
		const description = this.validateInput(inputContainer, 'description');

		if (![category, pid_item, amount, description].every(elem => elem)) return;

		const inputData = { type, date, category, pid_item, amount, description };
		await this.submitContent(button, inputData);
	}

	handleButtonInit() {
		const submitButton = document.querySelector('.submit-button');
		const deleteButtonZone = document.querySelector('.delete-button-zone');
		const initButton = document.querySelector('.init-button');
		initButton.classList.remove('hide');
		deleteButtonZone.classList.add('hide');
		deleteButtonZone.removeAttribute('data-id');
		submitButton.classList.remove('edit-button');
		// @ts-ignore
		submitButton.innerText = '확인';
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
		categorySelect.classList.remove('invalid');
		const options = categorySelect.querySelectorAll('option');
		options[0].selected = true;
	}

	initPayment() {
		const paymentSelect = document.querySelector('select[name="pid"]');
		paymentSelect.classList.remove('invalid');
		const options = paymentSelect.querySelectorAll('option');
		options[0].selected = true;
	}

	initAmount() {
		const amountInput = document.querySelector('input[name="amount"]');
		amountInput.classList.remove('invalid');
		// @ts-ignore
		amountInput.value = '';
	}

	initDescription() {
		const descriptionInput = document.querySelector('input[name="description"]');
		descriptionInput.classList.remove('invalid');
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
		this.handleInputInit();
	}

	handleFiltrationLedger() {
		const ledgerContainer = document.querySelector('hkb-ledger') as HTMLElement;
		const checkedIncome = ledgerContainer.querySelector('.income-input') as HTMLInputElement;
		const checkedSpending = ledgerContainer.querySelector('.spending-input') as HTMLInputElement;
		const items = document.querySelectorAll('hkb-ledger-item') as NodeListOf<Element>;
		const dateItems = document.querySelectorAll('hkb-ledger-by-date') as NodeListOf<Element>;
		items.forEach(item => {
			if (item.getAttribute('type') === checkedIncome.getAttribute('content')) {
				checkedIncome.checked
					? item.classList.remove('display-none')
					: item.classList.add('display-none');
			}
			if (item.getAttribute('type') === checkedSpending.getAttribute('content')) {
				checkedSpending.checked
					? item.classList.remove('display-none')
					: item.classList.add('display-none');
			}
		});
		dateItems.forEach(date => {
			if (date.classList.contains('hide')) return;
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
