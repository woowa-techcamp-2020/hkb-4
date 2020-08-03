// import NavigationBar from '../navigation';
import ChartsTab from '../charts';

class Hkb extends HTMLElement {
	private navigation!: HTMLElement;
	private chartsTab!: HTMLElement;
	constructor() {
		super();
		// this.navigation = new NavigationBar();
		this.chartsTab = new ChartsTab();
	}

	connectedCallback() {
		this.render();
		// this.appendChild(this.navigation);
		this.appendChild(this.chartsTab);
	}

	render() {}
}

customElements.define('hkb-page', Hkb);
export default customElements.get('hkb-page');
