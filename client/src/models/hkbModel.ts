import { ItemApi, PaymentApi } from '../api';
import { ItemDTO, PaymentDTO } from '../../../shared/dto';
import observer from '../models/observer';

type tabType = 'ledger' | 'calendar' | 'charts';
const url = location.pathname;

class HkbModel {
	private year: number | null;
	private month: number | null;
	private tab: tabType | null;
	private rawData!: any;
	private monthlyData!: { income: number; spending: number };
	private dailyData!: object;
	private categoryData!: object;
	private payments!: object;
	private observer!: any;

	constructor() {
		this.year = null;
		this.month = null;
		// TODO
		// @ts-ignore
		this.rawData = {};
		this.monthlyData = { income: 0, spending: 0 };
		this.dailyData = {};
		this.categoryData = {};
		this.payments = {};
		this.observer = observer;

		this.observer.subscribe('routeChanged', this, this.checkRouteChanged.bind(this));
	}

	checkRouteChanged(state) {
		// TODO
		// 제일 처음으로 돌아가면 오류나 왜냐면 설정안해줬거든~
		const tab = state.tab === null ? 'ledger' : state.tab;
		if (tab !== this.tab) {
			this.tab = tab;
			this.observer.notify('tabChanged', this.tab);
		} else {
			this.year = state.year;
			this.month = state.month;
			this.fetchRawData();
			// this.observer.notify('dateChanged', { year: this.year, month: this.month });
		}
	}

	notifyDataFetched() {
		this.observer.notify('dataFetched', {
			year: this.year,
			month: this.month,
			rawData: this.rawData,
			dailyData: this.dailyData,
			monthlyData: this.monthlyData,
			categoryData: this.categoryData,
			payments: this.payments,
		});
	}

	async fetchRawData() {
		const result = await ItemApi.getItemsByDate(
			`${this.year}-${this.month < 10 ? `0${this.month}` : this.month}`,
		);
		// TODO : result type
		// @ts-ignore
		this.rawData = result;
		this.calcAllStatictics();
		this.notifyDataFetched();
	}

	calcAllStatictics() {
		this.calcDailyData();
		this.calcMonthlyData();
		this.calcCategoryData();
	}

	updateHistory() {
		history.pushState(
			{
				tab: this.tab,
				year: this.year,
				month: this.month,
			},
			'hkb',
			`/${this.year}${this.month}/${this.tab}`,
		);
	}

	calcDailyData() {
		const dailyDict = {};
		const lastDay = 31;
		for (let i = 1; i <= lastDay; i++) {
			let dIncome = 0,
				dSpending = 0;
			if (this.rawData[i]) {
				this.rawData[i].forEach(item => {
					if (item.type === 1) {
						dIncome += item.amount;
					} else {
						dSpending += item.amount;
					}
				});
			}
			dailyDict[i] = { income: dIncome, spending: dSpending };
		}
		this.dailyData = dailyDict;
	}

	calcMonthlyData() {
		let mIncome = 0,
			mSpending = 0;
		for (const [day, statics] of Object.entries(this.dailyData)) {
			//@ts-ignore
			mIncome += statics.income;
			//@ts-ignore
			mSpending += statics.spending;
		}
		this.monthlyData = { income: mIncome, spending: mSpending };
	}

	calcCategoryData() {
		const categoryDict = {};
		for (const [day, items] of Object.entries(this.rawData)) {
			items
				// TODO
				// @ts-ignore
				.filter(item => item.type === 2)
				.forEach(item => {
					if (!categoryDict[item.category]) {
						categoryDict[item.category] = 0;
					}
					categoryDict[item.category] += item.amount;
				});
		}
		this.categoryData = categoryDict;
	}

	async fetchItemEdit(data: ItemDTO.UPDATE) {
		const updatedItem = await ItemApi.update(data);
		const convertedItemObj = this.syncronizeItem(updatedItem);
		this.afterCUD(convertedItemObj, 'edit');
	}

	syncronizeItem(item) {
		const { id, type, date, description, category, pid_item, amount } = item;
		const convertedItemObj = {
			amount: parseInt(amount),
			category,
			date,
			description,
			pid: pid_item,
			type,
			id,
			payment: this.payments[pid_item],
		};
		return convertedItemObj;
	}

	async fetchItemCreate(data: ItemDTO.CREATE) {
		const addedItem = await ItemApi.create(data);
		const convertedItemObj = this.syncronizeItem(addedItem);
		this.afterCUD(convertedItemObj, 'add');
	}

	async fetchItemDelete(data: ItemDTO.DELETE) {
		const result = await ItemApi.delete(data);
		this.afterCUD({ id: result.id, date: data.date }, 'delete');
	}

	afterCUD(item, action) {
		const itemMonth = new Date(item.date).getMonth() + 1;
		const itemDay = new Date(item.date).getDate();
		if (this.month !== itemMonth) return;

		if (action === 'add') {
			if (!this.rawData[itemDay]) {
				this.rawData[itemDay] = [];
			}
			this.rawData[itemDay].push(item);
		} else if (action === 'edit') {
			this.rawData[itemDay] = this.rawData[itemDay].map(prevItem => {
				if (prevItem.id === item.id) {
					return item;
				} else {
					return prevItem;
				}
			});
		} else if (action === 'delete') {
			this.rawData[itemDay] = this.rawData[itemDay].filter(prevItem => prevItem.id !== item.id);
		}
		this.calcAllStatictics();
		this.notifyDataFetched();
	}

	initData() {
		const currDate = new Date();
		this.setTabName('ledger');
		this.setYearMonth(currDate.getFullYear(), currDate.getMonth());
	}

	async initPayment() {
		const payments = await PaymentApi.getPayments();
		this.payments = payments;
	}

	async setYearMonth(year, month) {
		this.year = year;
		this.month = month + 1;
		await this.fetchRawData();
		this.updateHistory();
	}

	getDate() {
		return new Date(this.year, this.month - 1, 1);
	}

	setTabName(tab: tabType) {
		if (this.tab === tab) return;
		this.tab = tab;
		this.observer.notify('tabChanged', this.tab);
		this.updateHistory();
	}

	async fetchPaymentCreate(data: PaymentDTO.CREATE) {
		if (Object.values(this.payments).includes(data.name)) return false;
		const result = await PaymentApi.create(data);
		this.payments[result.id] = result.name;
		this.observer.notify('paymentUpdated', this.payments);
		return true;
	}

	async fetchPaymentDelete(data: PaymentDTO.DELETE) {
		const result = await PaymentApi.delete(data);
		const deletedId = result.id;
		delete this.payments[deletedId];
		this.observer.notify('paymentUpdated', this.payments);
	}
}

export default new HkbModel();
