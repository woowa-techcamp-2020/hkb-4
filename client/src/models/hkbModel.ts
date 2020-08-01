import { ItemApi } from '../api';
import { ItemDTO } from '../../../shared/dto';
import observer from '../models/observer';

class HkbModel {
	private rawData!: Array<ItemDTO.Item>;
	private monthlyData!: { income: number; spending: number };
	private dailyData!: Array<{ data: number; income: number; spending: number }>;
	private categoryData!: Array<{ category: ItemDTO.SPENDING; amount: number }>;
	private observer!: any;
	constructor() {
		this.rawData = [];
		this.monthlyData = { income: 0, spending: 0 };
		this.dailyData = [];
		this.categoryData = [];
		this.observer = observer;
	}

	async getAll(id: ItemDTO.GET, date: string) {
		const result = await ItemApi.getItemsById(id, date);
		// TODO : result type
		// @ts-ignore
		this.rawData = result;
		// 계산하는 메서드 호출
		// observer.notify 주기
	}
}

export default new HkbModel();
