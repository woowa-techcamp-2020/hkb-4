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
		this.observer.subscribe('dataFetched', this, this.changeData.bind(this));
		this.hkbController.init();

		this.appendChild(this.navigationBar);

		const tabContainer = document.createElement('div');
		tabContainer.classList.add('tab-container');
		this.appendChild(tabContainer);
		tabContainer.appendChild(this.ledgerTab);
		tabContainer.appendChild(this.calendarTab);
		tabContainer.appendChild(this.chartsTab);
	}

	reset() {
		const last = this.lastElementChild;
		if (last && last.tagName !== 'NAVIGATION-BAR') {
			this.removeChild(last);
		}
	}

	changeData(data) {
		const dateElement = document.querySelector('#nav-date') as HTMLElement;
		dateElement.textContent = `${data.year}.${data.month.toString().padStart(2, '0')}`;

		this.ledgerTab.update(data);
		this.calendarTab.update(data);
		this.chartsTab.update(data);
	}

	changeTab(tabName: string) {
		const tab = this.navigationBar.querySelector(`[name='${tabName}']`) as HTMLElement;
		const selected = document.querySelector('.selected-tab') as HTMLElement;
		selected.style.left = `${tab.offsetLeft}px`;

		this.ledgerTab.tabChanged(tabName);
		this.calendarTab.tabChanged(tabName);
		this.chartsTab.tabChanged(tabName);
	}

	checkElementClass(element: HTMLElement) {
		if (!element.classList.contains('display-none')) {
			element.classList.add('display-none');
		}
	}
}

customElements.define('hkb-page', Hkb);
export default customElements.get('hkb-page');
