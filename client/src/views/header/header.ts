import { UserDTO } from '../../../../shared/dto';
import observer from '../../models/observer';
import controller from '../../controller';

class Header extends HTMLElement {
	private observer!: any;
	private userController!: any;
	private username: string | null;
	constructor() {
		super();
		this.observer = observer;
		this.userController = controller.UserController;
		this.username = null;
	}

	connectedCallback() {
		this.observer.subscribe('userChanged', this, this.getUser.bind(this));
		this.addEventListener('click', this.userController.headerHandler.bind(this.userController));
	}

	getUser(user: UserDTO.RESPONSE_LOGIN) {
		this.username = user.name;
		this.render();
	}

	render() {
		this.innerHTML = `
      			<div class="flex-1"></div>
			<div class="header">가계부</div>
			<span class="flex-1 user-name">${this.username ? this.username : ''}</span>
			${this.username ? '<span class="logout-button">logout</span>' : ''}
    `;
	}
}

customElements.define('hkb-header', Header);
export default customElements.get('hkb-header');
