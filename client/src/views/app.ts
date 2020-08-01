import Header from './header';
import observer from '../models/observer';
import controller from '../controller';
// import LoginPage from './login';
// import HkbPage from './hkb';

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
		this.observer.subscribe('userChanged', this, this.render);
		this.userController.initUser();
	}

	render(user: any) {
		// this.appContent.appendChild(new HkbPage());
		// this.appContent = document.createElement('div');
		// this.appContent.setAttribute('id', 'app-content');
		// this.app.appendChild(document.createElement('div'));
	}
}

export default App;
