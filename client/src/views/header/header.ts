import observer from '../../models/observer';

class Header extends HTMLElement {
	private observer!: any;
	constructor() {
		super();
		this.observer = observer;
	}

	connectedCallback() {
		this.observer.subscribe('userChanged', this, this.render.bind(this));
	}

	render(user) {
		this.innerHTML = `
      <div class="flex-1"></div>
      <div class="header">가계부</div>
			<span class="flex-1 user-name">${user ? user.name : ''}</span>
			${user ? '<span>logout</span>' : ''}
    `;
	}
}

customElements.define('hkb-header', Header);
export default customElements.get('hkb-header');
