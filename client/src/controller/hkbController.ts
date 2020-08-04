import model from '../models';

class HkbController {
	private model!: any;
	constructor() {
		this.model = model.HkbModel;
	}

	initDate() {
		this.model.getCurrDate();
	}

	getRawData() {
		this.model.fetchRawData();
	}
}

export default new HkbController();
