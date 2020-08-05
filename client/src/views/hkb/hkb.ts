import observer from '../../models/observer';
import controller from '../../controller';
import NavigationBar from '../navigation';
import Ledger from '../ledger';
import Calendar from '../calendar';
import ChartsTab from '../charts';

class Hkb extends HTMLElement {
	private observer!: any;
	private hkbController!: any;
	private navigationBar = new NavigationBar();
	private ledgerTab = new Ledger();
	private calendarTab = new Calendar();
	private chartsTab = new ChartsTab();

	constructor() {
		super();
		this.observer = observer;
		this.hkbController = controller.HkbController;
	}

	connectedCallback() {
		this.observer.subscribe('tabChanged', this, this.changeTab.bind(this));
		this.observer.subscribe('dataFecthed', this, this.changeData.bind(this));
		this.hkbController.init();

		this.appendChild(this.navigationBar);

		const tabContainer = document.createElement('div');
		tabContainer.classList.add('tab-container');
		this.appendChild(tabContainer);
		tabContainer.appendChild(this.ledgerTab);
		tabContainer.appendChild(this.calendarTab);
		tabContainer.appendChild(this.chartsTab);
		this.init();
	}

	init() {
		// 나중에 없애야할 함수
		this.calendarTab.classList.add('display-none');
		this.chartsTab.classList.add('display-none');
	}

	reset() {
		const last = this.lastElementChild;
		if (last && last.tagName !== 'NAVIGATION-BAR') {
			this.removeChild(last);
		}
	}

	changeData(data) {
		const dateElement = document.querySelector('#nav-date') as HTMLElement;
		if (!dateElement) return;
		dateElement.textContent = `${data.year}.${data.month.toString().padStart(2, '0')}`;

		// this.ledgerTab.update(data);
		this.calendarTab.update(data);
		// this.chartsTab.update(data);
	}

	changeTab(tabName: string) {
		const tab = this.navigationBar.querySelector(`[name='${tabName}']`) as HTMLElement;
		const selected = document.querySelector('.selected-tab') as HTMLElement;
		selected.style.left = `${tab.offsetLeft}px`;

		if (tabName === this.ledgerTab.name) {
			this.ledgerTab.classList.remove('display-none');
			this.checkElementClass(this.calendarTab);
			this.checkElementClass(this.chartsTab);
		}
		if (tabName === this.calendarTab.name) {
			this.calendarTab.classList.remove('display-none');
			this.checkElementClass(this.ledgerTab);
			this.checkElementClass(this.chartsTab);
		}
		if (tabName === this.chartsTab.name) {
			this.chartsTab.classList.remove('display-none');
			this.checkElementClass(this.ledgerTab);
			this.checkElementClass(this.calendarTab);
		}
	}

	checkElementClass(element: HTMLElement) {
		if (!element.classList.contains('display-none')) {
			element.classList.add('display-none');
		}
	}

	render(data: any) {
		this.reset();
		switch (data.page) {
			case 'ledger':
				this.appendChild(new Ledger());
			case 'calender':
				this.appendChild(new Calendar());
			case 'charts':
				this.appendChild(new ChartsTab());
		}
	}
}

customElements.define('hkb-page', Hkb);
export default customElements.get('hkb-page');
