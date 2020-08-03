import Header from './header';
import observer from '../models/observer';
import controller from '../controller';
import LoginPage from './login';
import HkbPage from './hkb';
import { UserDTO } from '../../../shared/dto';

class App {
	private app!: HTMLElement;
	private observer!: any;
	private userController!: any;
	private header!: HTMLElement;
	private appContent!: HTMLElement;
	private username: string | null;
	constructor(target: HTMLElement) {
		this.app = target;
		this.observer = observer;
		this.userController = controller.UserController;
		this.header = new Header();
		this.appContent = document.createElement('div');
		this.username = null;

		this.init();
	}

	init() {
		this.observer.subscribe('userChanged', this, this.getUser.bind(this));
		this.app.appendChild(this.header);
		this.appContent.setAttribute('id', 'app-content');
		this.app.appendChild(this.appContent);
		this.userController.initUser();
	}

	getUser(user: UserDTO.RESPONSE_LOGIN) {
		this.username = user.name;
		this.render();
	}

	reset() {
		this.appContent.innerHTML = '';
	}
	render() {
		this.reset();
		if (this.username) {
			this.appContent.appendChild(new HkbPage());
		} else {
			this.appContent.appendChild(new LoginPage());
		}
	}
}

export default App;
