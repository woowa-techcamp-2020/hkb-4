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

	async loginHandler({ target }) {
		const inputs = target.closest('.login-container').querySelectorAll('input');
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
