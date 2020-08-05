import { ItemApi } from '../api';
import { ItemDTO } from '../../../shared/dto';
import observer from '../models/observer';

type tabType = 'ledger' | 'calendar' | 'charts';
const url = location.pathname;

class HkbModel {
	private year: number | null;
	private month: number | null;
	private tab: tabType | null;
	private rawData!: Array<ItemDTO.Item>;
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
			this.observer.notify('dateChanged', { year: this.year, month: this.month });
		}
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
		const lastDay = 31;
		for (let i = 0; i <= lastDay; i++) {
			let dIncome = 0,
				dSpending = 0;

			this.rawData[i].forEach(item => {
				if (item.type === 1) {
					dIncome += item.amount;
				} else {
					dSpending += item.amount;
				}
			});
			dailyDict[i] = { income: dIncome, spending: dSpending };
			this.dailyData = dailyDict;
		}
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

	initData() {
		const currDate = new Date();

		// TODO
		// 두번 불리는데 이러면...
		this.tab = 'ledger';
		this.setYearMonth(currDate);
	}

	setYearMonth(year, month) {
		this.year = year;
		this.month = month;
		this.fetchRawData();
  }
// 	setYearMonth(date: Date) {
// 		this.year = date.getFullYear();
// 		this.month = date.getMonth();
// 		history.pushState(
// 			{
// 				tab: this.tab,
// 				year: this.year,
// 				month: this.month,
// 			},
// 			'hkb',
// 			`/${this.year}${this.month + 1}/${this.tab}`,
// 		);
// 		this.observer.notify('dateChanged', { year: this.year, month: this.month });
// 	}
	getDate() {
		return new Date(this.year, this.month, 1);
	}

	setTabName(tab: tabType) {
		if (this.tab === tab) return;
		this.tab = tab;
		history.pushState(
			{
				tab: this.tab,
				year: this.year,
				month: this.month,
			},
			'hkb',
			`/${this.year}${this.month + 1}/${this.tab}`,
		);
		this.observer.notify('tabChanged', this.tab);
	}
}

export default new HkbModel();
