import { ItemApi } from '../api';
import { ItemDTO } from '../../../shared/dto';
import observer from '../models/observer';

class HkbModel {
	private year: number | null;
	private month: number | null;
	private rawData!: Array<ItemDTO.Item>;
	private monthlyData!: { income: number; spending: number };
	private dailyData!: Array<{ data: number; income: number; spending: number }>;
	private categoryData!: Array<{ category: ItemDTO.SPENDING; amount: number }>;
	private observer!: any;
	constructor() {
		this.year = null;
		this.month = null;
		this.rawData = [];
		this.monthlyData = { income: 0, spending: 0 };
		this.dailyData = [];
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
