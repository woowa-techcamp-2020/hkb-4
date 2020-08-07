import controller from '../../controller';

class LoginPage extends HTMLElement {
	private userController!: any;
	constructor() {
		super();
		this.userController = controller.UserController;
	}

	connectedCallback() {
		this.render();
		this.addEventListener('click', this.userController.loginPageHandler.bind(this.userController));
		this.addEventListener(
			'keypress',
			this.userController.loginPageHandler.bind(this.userController),
		);
	}

	render() {
		this.classList.add('content');
		this.innerHTML = `
      <div class="login-container">
        <h2> Login </h2>
        <div class="input-wrapper">
          <input class="input-name" type='text' placeholder='id' name="name" autofocus></input>
        </div>
        <div class="input-wrapper">
          <input class="input-pw" type='password' placeholder='password' name="password"></input>
        </div>
        <div class="button-zone">
          <div class="signup-button">Sign Up</div>
          <div class="login-button">Login</div>
        </div>
      </div>
    `;
	}
}

customElements.define('login-page', LoginPage);

export default customElements.get('login-page');
