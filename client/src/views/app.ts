import Header from './header';
import LoginPage from './login';
import HkbPage from './hkb';

class App {
	private app!: HTMLElement;
	private appContent!: HTMLElement;
	constructor(target: HTMLElement) {
		this.app = target;
		const header = new Header();
		this.app.appendChild(header);
		this.appContent = document.createElement('div');
		this.appContent.setAttribute('id', 'app-content');
		this.app.appendChild(this.appContent);

		//
		// const loginPage = new LoginPage();
		// this.app.appendChild(loginPage);

		const hkbPage = new HkbPage();
		this.appContent.appendChild(hkbPage);
	}
}

export default App;
