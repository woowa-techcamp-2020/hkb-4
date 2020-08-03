import observer from '../../models/observer';
import controller from '../../controller';

class Header extends HTMLElement {
	private observer!: any;
	private userController!: any;
	constructor() {
		super();
		this.observer = observer;
		this.userController = controller.UserController;
	}

	connectedCallback() {
		this.observer.subscribe('userChanged', this, this.render.bind(this));
		this.addEventListener('click', this.userController.headerHandler.bind(this.userController));
	}

	render(user: any) {
		this.innerHTML = `
      <div class="flex-1"></div>
			<div class="header">가계부</div>
			<span class="flex-1 user-name">${Object.keys(user).length ? user.name : ''}</span>
			${Object.keys(user).length ? '<span class="logout-button">logout</span>' : ''}
    `;
	}
}

customElements.define('hkb-header', Header);
export default customElements.get('hkb-header');
