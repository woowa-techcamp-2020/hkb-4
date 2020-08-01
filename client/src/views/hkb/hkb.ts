// import NavigationBar from '../navigation';
import Calendar from '../calendar';

class Hkb extends HTMLElement {
	private navigation!: HTMLElement;
	private calendar!: HTMLElement;
	constructor() {
		super();
		// this.navigation = new NavigationBar();
		this.calendar = new Calendar();
	}

	connectedCallback() {
		this.render();
		// this.appendChild(this.navigation);
		this.appendChild(this.calendar);
	}

	render() {}
}

customElements.define('hkb-page', Hkb);
export default customElements.get('hkb-page');
