// import NavigationBar from '../navigation';

class Hkb extends HTMLElement {
	// private navigation!: HTMLElement;
	constructor() {
		super();
		// this.navigation = new NavigationBar();
	}

	connectedCallback() {
		this.render();
		// this.appendChild(this.navigation);
	}

	render() {}
}

customElements.define('hkb-page', Hkb);
export default customElements.get('hkb-page');
