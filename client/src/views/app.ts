import Header from './header';
import LoginPage from './login';

class App {
	private app!: HTMLElement;
	constructor(target: HTMLElement) {
		this.app = target;
		const header = new Header();
		this.app.appendChild(header);
		//
		const loginPage = new LoginPage();
		this.app.appendChild(loginPage);
	}
}

export default App;
