import model from '../models';

class UserController {
	private userModel!: any;
	private hkbModel!: any;
	constructor() {
		this.userModel = model.UserModel;
	}

	initUser() {
		this.userModel.checkUser();
	}

	loginPageHandler(e) {
		const idInput = e.target.closest('.input-name');
		const pwInput = e.target.closest('.input-pw');
		const signupButton = e.target.closest('.signup-button');
		const loginButton = e.target.closest('.login-button');
		e.stopPropagation();
		if (idInput) {
			this.idInputHandler(e);
		} else if (pwInput) {
			this.pwInputHandler(e);
		} else if (signupButton) {
			console.log('signup button click');
		} else if (loginButton) {
			this.loginHandler();
		}
	}

	idInputHandler(e) {
		if (e.key === 'Enter') {
			const pwInput = document.querySelector('input[name="password"]');
			(pwInput as HTMLInputElement).focus();
		}
	}

	pwInputHandler(e) {
		if (e.key === 'Enter') {
			this.loginHandler();
		}
	}

	alarmLoginFail() {
		const loginContainer = document.querySelector('.login-container');
		const prevAlarm = loginContainer.querySelector('.alarm');
		if (prevAlarm) return;
		const buttonZone = document.querySelector('.login-container .button-zone');
		const alarm = document.createElement('div');
		alarm.classList.add('alarm');
		alarm.innerHTML = '로그인에 실패하였습니다.';
		buttonZone.insertAdjacentElement('beforebegin', alarm);
	}

	async loginHandler() {
		const inputs = document.querySelector('.login-container').querySelectorAll('input');
		const userInputData = {};
		inputs.forEach(input => {
			userInputData[input.getAttribute('name')] = input.value;
		});
		const result = await this.userModel.fetchLogin(userInputData);
		if (!result.status) this.alarmLoginFail();
	}

	headerHandler(e) {
		e.stopPropagation();
		if (e.target.classList.contains('logout-button')) {
			this.logoutHandler();
		}
	}

	logoutHandler() {
		this.userModel.fetchLogout();
	}
}

export default new UserController();
