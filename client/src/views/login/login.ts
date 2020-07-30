class LoginPage extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.classList.add('content');
		this.innerHTML = `
      <div class="login-container">
        <h2> Login </h2>
        <div class="input-wrapper">
          <input type='text' placeholder='id'></input>
        </div>
        <div class="input-wrapper">
          <input type='password' placeholder='password'></input>
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
