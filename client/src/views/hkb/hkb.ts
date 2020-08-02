import Ledger from '../ledger';

class Hkb extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.appendChild(new Ledger());
	}
}

customElements.define('hkb-page', Hkb);
export default customElements.get('hkb-page');
