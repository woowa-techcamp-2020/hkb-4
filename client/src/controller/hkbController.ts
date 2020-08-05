import model from '../models';

class HkbController {
	private model!: any;
	constructor() {
		this.model = model.HkbModel;
	}

	init() {
		this.model.initData();
	}

	changeTab() {
		const tab = (event.target as HTMLElement).closest('li');
		if (!tab) return;
		this.model.setTabName(tab.getAttribute('name'));
	}

	changePrevMonth() {
		const date = this.model.getDate();
		this.model.setYearMonth(new Date(date.getFullYear(), date.getMonth() - 1, 1));
	}
	changeNextMonth() {
		const date = this.model.getDate();
		this.model.setYearMonth(new Date(date.getFullYear(), date.getMonth() + 1, 1));
	}

	getRawData() {
		this.model.fetchRawData();
	}
}

export default new HkbController();
