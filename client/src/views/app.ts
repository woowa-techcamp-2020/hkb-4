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

import { UserApi, ItemApi } from '../api';
async function test() {
	try {
		const a = await UserApi.login({
			name: 'lee',
			password: '1234',
		});
		console.log(a);
	} catch (err) {
		console.log(err);
	}

	try {
		const b = await UserApi.getUser();
		console.log(b);
	} catch (err) {
		console.log(err);
	}
}
test();

export default App;
