import Header from './header';

class App {
	private app!: HTMLElement;
	constructor(target: HTMLElement) {
		this.app = target;
		const header = new Header();
		//
		this.app.appendChild(header);
	}
}

export default App;
