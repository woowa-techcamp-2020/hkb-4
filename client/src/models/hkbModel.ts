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

	async getAll(id: ItemDTO.GET, date: string) {
		const result = await ItemApi.getItemsById(id, date);
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
			`/${this.year}${this.month}/${this.tab}`,
		);
		this.observer.notify('tabChanged', this.tab);
	}
}

export default new HkbModel();
