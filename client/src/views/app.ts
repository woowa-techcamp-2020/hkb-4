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

// import { UserApi, ItemApi } from '../api';
// async function test() {
// 	try {
// 		const a = await UserApi.login({
// 			name: 'lee',
// 			password: '1234',
// 		});
// 		console.log(a);
// 	} catch (err) {
// 		console.log(err);
// 	}

// 	try {
// 		const b = await UserApi.getUser();
// 		console.log(b);
// 	} catch (err) {
// 		console.log(err);
// 	}
// }
// test();

export default App;
