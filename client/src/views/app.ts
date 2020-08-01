import Header from './header';
import observer from '../models/observer';
import controller from '../controller';
import LoginPage from './login';
import HkbPage from './hkb';

class App {
	private app!: HTMLElement;
	private observer!: any;
	private userController!: any;
	// private appContent!: HTMLElement;
	constructor(target: HTMLElement) {
		this.app = target;
		this.observer = observer;
		this.userController = controller.UserController;

		this.init();
	}

	init() {
		this.app.appendChild(new Header());
		this.observer.subscribe('userChanged', this, this.render.bind(this));
		this.userController.initUser();
	}

	render(user: any) {
		if (this.app.childElementCount === 2) {
			this.app.removeChild(this.app.lastChild);
		}
		if (user) {
			const appContent = document.createElement('div');
			appContent.setAttribute('id', 'app-content');
			this.app.appendChild(document.createElement('div'));
			appContent.appendChild(new HkbPage());
		} else {
			this.app.appendChild(new LoginPage());
		}
	}
}

export default App;
