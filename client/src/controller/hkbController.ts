import model from '../models';

class HkbController {
	private model!: any;
	constructor() {
		this.model = model.HkbModel;
	}

	initDate() {
		this.model.getCurrDate();
	}

	changeTab() {
		const tab = (event.target as HTMLElement).closest('li');
		if (!tab) return;
		const selected = document.querySelector('.selected-tab') as HTMLElement;
		selected.style.left = `${tab.offsetLeft}px`;
		this.model.setTabName(tab.getAttribute('name'));
	}

	changeMonth() {
		//
	}
}

export default new HkbController();
