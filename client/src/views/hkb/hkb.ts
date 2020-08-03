import Ledger from '../ledger';
import Calendar from '../calendar';

class Hkb extends HTMLElement {
	private calendar!: HTMLElement;
	constructor() {
		super();
		this.calendar = new Calendar();
	}

	connectedCallback() {
		this.render();
		this.appendChild(this.calendar);
	}

	render() {
		this.appendChild(new Ledger());
	}
}

customElements.define('hkb-page', Hkb);
export default customElements.get('hkb-page');
