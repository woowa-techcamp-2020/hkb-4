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
			<div class="user-info flex-1">
			<span class="user-name">${this.username ? this.username : ''}</span>
			${this.username ? '<i class="material-icons logout-button">exit_to_app</span>' : ''}
			</div>
			
    `;
	}
}

customElements.define('hkb-header', Header);
export default customElements.get('hkb-header');
