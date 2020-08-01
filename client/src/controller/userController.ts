import model from '../models';

class UserController {
	private model!: any;
	constructor() {
		this.model = model.UserModel;
	}

	initUser() {
		this.model.checkUser();
	}

	loginPageHandler(e) {
		e.stopPropagation();
		if (e.target.classList.contains('signup-button')) {
			e.preventDefault();
			console.log('signup button click');
		}
		if (e.target.classList.contains('login-button')) {
			e.preventDefault();
			this.loginHandler(e);
		}
	}

	loginHandler({ target }) {
		const inputs = target.closest('.login-container').querySelectorAll('input');
		const userInputData = {};
		inputs.forEach(input => {
			userInputData[input.getAttribute('name')] = input.value;
		});
		this.model.fetchLogin(userInputData);
	}
}

export default new UserController();
