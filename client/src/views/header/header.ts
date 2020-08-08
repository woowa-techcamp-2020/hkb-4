import { UserDTO } from '../../../../shared/dto';
import observer from '../../models/observer';
import controller from '../../controller';

class Header extends HTMLElement {
	private observer!: any;
	private userController!: any;
	private hkbController!: any;
	private username: string | null;
	constructor() {
		super();
		this.observer = observer;
		this.userController = controller.UserController;
		this.hkbController = controller.HkbController;
		this.username = null;
	}

	connectedCallback() {
		this.observer.subscribe('userChanged', this, this.getUser.bind(this));
		this.addEventListener('click', this.hkbController.headerHandler.bind(this.hkbController));
		this.addEventListener('click', this.userController.headerHandler.bind(this.userController));
	}

	getUser(user: UserDTO.RESPONSE_LOGIN) {
		this.username = user.name;
		this.render();
	}

	render() {
		this.innerHTML = `
			<div class="title">가계부</div>
			${
				this.username
					? `
				<div class="user-info">
					<span class="user-name"> ${this.username} 님, <em>부자</em>되세요</span>
					<span><i class="material-icons payment-button">payment</i></span>
					<span><i class="material-icons logout-button">exit_to_app</i></span>
				</div>
				`
					: ''
			}
    `;
	}
}

customElements.define('hkb-header', Header);
export default customElements.get('hkb-header');
