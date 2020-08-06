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

	loginHandler({ target }) {
		const inputs = target.closest('.login-container').querySelectorAll('input');
		const userInputData = {};
		inputs.forEach(input => {
			userInputData[input.getAttribute('name')] = input.value;
		});
		const result = this.model.fetchLogin(userInputData);
		if (!result.status) this.alarmLoginFail();
	}

	headerHandler(e) {
		e.stopPropagation();
		if (e.target.classList.contains('logout-button')) {
			this.logoutHandler();
		}
	}

	logoutHandler() {
		this.model.fetchLogout();
	}
}

export default new UserController();
