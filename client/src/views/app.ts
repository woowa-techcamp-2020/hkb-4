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

	reset() {
		const last = this.app.lastElementChild;
		if (last && last.tagName !== 'HKB-HEADER') {
			this.app.removeChild(last);
		}
	}

	render(user: object) {
		this.reset();

		if (Object.keys(user).length) {
			const appContent = document.createElement('div');
			appContent.setAttribute('id', 'app-content');
			this.app.appendChild(appContent);
			appContent.appendChild(new HkbPage());
		} else {
			this.app.appendChild(new LoginPage());
		}
	}
}

export default App;
