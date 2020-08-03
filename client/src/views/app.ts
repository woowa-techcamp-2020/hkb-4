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

export default App;
