import { ItemApi } from '../api';
import { ItemDTO } from '../../../shared/dto';
import observer from '../models/observer';

class HkbModel {
	private year: number | null;
	private month: number | null;
	private rawData!: object;
	private monthlyData!: { income: number; spending: number };
	private dailyData!: object;
	private categoryData!: object;
	private observer!: any;
	constructor() {
		this.year = null;
		this.month = null;
		this.rawData = {};
		this.monthlyData = { income: 0, spending: 0 };
		this.dailyData = {};
		this.categoryData = {};
		this.observer = observer;
	}

	async fetchRawData() {
		const result = await ItemApi.getItemsByDate(
			`${this.year}-${this.month < 10 ? `0${this.month}` : this.month}`,
		);
		// TODO : result type
		// @ts-ignore
		this.rawData = result;
		// observer.notify 주기
		this.calcDailyData();
		this.calcMonthlyData();
		this.calcCategoryData();
		this.observer.notify('dataFecthed', {
			year: this.year,
			month: this.month,
			rawData: this.rawData,
			dailyData: this.dailyData,
			monthlyData: this.monthlyData,
			categoryData: this.categoryData,
		});
	}

	calcDailyData() {
		const dailyDict = {};
		for (const [day, items] of Object.entries(this.rawData)) {
			let dIncome = 0,
				dSpending = 0;
			//@ts-ignore
			items.forEach(item => {
				if (item.type === 1) {
					dIncome += item.amount;
				} else {
					dSpending += item.amount;
				}
			});
			dailyDict[day] = { income: dIncome, spending: dSpending };
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

	getCurrDate() {
		const currDate = new Date();
		const year = currDate.getFullYear();
		const month = currDate.getMonth() + 1;
		this.setYearMonth(year, month);
	}

	setYearMonth(year, month) {
		this.year = year;
		this.month = month;
		this.fetchRawData();
		this.observer.notify('dateChanged', { year: this.year, month: this.month });
	}
}

export default new HkbModel();
