import observer from '../../models/observer';
import controller from '../../controller';
import NavigationBar from '../navigation';
import Ledger from '../ledger';
import Calendar from '../calendar';

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
		console.log('rendering page');
	}
}

customElements.define('hkb-page', Hkb);
export default customElements.get('hkb-page');
