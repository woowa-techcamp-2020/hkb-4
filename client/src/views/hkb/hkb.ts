import observer from '../../models/observer';
import controller from '../../controller';
import NavigationBar from '../navigation';
import Ledger from '../ledger';
import Calendar from '../calendar';
import ChartsTab from '../charts';
    
class Hkb extends HTMLElement {
	private observer!: any;
	private hkbController!: any;
	constructor() {
		super();
		this.observer = observer;
		this.hkbController = controller.HkbController;
	}

	connectedCallback() {
		this.appendChild(new NavigationBar());
		this.observer.subscribe('dateChanged', this, this.render.bind(this));
		this.hkbController.initDate();
	}

	reset() {
		const last = this.lastElementChild;
		if (last && last.tagName !== 'NAVIGATION-BAR') {
			this.removeChild(last);
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
