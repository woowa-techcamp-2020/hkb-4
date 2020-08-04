import { ItemApi } from '../api';
import { ItemDTO } from '../../../shared/dto';
import observer from '../models/observer';

class HkbModel {
	private year: number | null;
	private month: number | null;
	private rawData!: Array<ItemDTO.Item>;
	private monthlyData!: { income: number; spending: number };
	private dailyData!: object;
	private categoryData!: Array<{ category: ItemDTO.SPENDING; amount: number }>;
	private observer!: any;
	constructor() {
		this.year = null;
		this.month = null;
		this.rawData = [];
		this.monthlyData = { income: 0, spending: 0 };
		this.dailyData = {};
		this.categoryData = [];
		this.observer = observer;
	}

	async fetchRawData(date: string) {
		const result = await ItemApi.getItemsByDate(
			`${this.year}-${this.month < 10 ? `0${this.month}` : this.month}`,
		);
		// TODO : result type
		// @ts-ignore
		this.rawData = result;
		// 계산하는 메서드 호출
		// observer.notify 주기
		this.calcDailyData();
		this.calcMonthlyData();
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

	getCurrDate() {
		const currDate = new Date();
		const year = currDate.getFullYear();
		const month = currDate.getMonth() + 1;
		this.setYearMonth(year, month);
	}

	setYearMonth(year, month) {
		this.year = year;
		this.month = month;
		this.observer.notify('dateChanged', { year: this.year, month: this.month });
	}
}

export default new HkbModel();
