import model from '../models';

class HkbController {
	private model!: any;
	constructor() {
		this.model = model.HkbModel;
	}

	initDate() {
		this.model.getCurrDate();
	}
}

export default new HkbController();
