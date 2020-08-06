import controller from '../../controller';

class NavigationBar extends HTMLElement {
	private date!: Date;
	private controller = controller.HkbController;
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
		this.initEvent();
	}

	initEvent() {
		const navtab = this.querySelector('.nav-tab') as HTMLElement;
		const prevMonth = this.querySelector('.left-btn') as HTMLElement;
		const nextMonth = this.querySelector('.right-btn') as HTMLElement;

		navtab.addEventListener('click', (event: MouseEvent) => this.controller.changeTab());
		prevMonth.addEventListener('click', (event: MouseEvent) => this.controller.changePrevMonth());
		nextMonth.addEventListener('click', (event: MouseEvent) => this.controller.changeNextMonth());
	}

	dateToString(date: Date) {
		return `${date.getFullYear()}.${date.getMonth().toString().padStart(2, '0')}`;
	}

	render() {
		this.innerHTML = `
    <div class="nav-month">
      <i class="material-icons left-btn">chevron_left</i>
      <span id="nav-date"></span>
      <i class="material-icons right-btn">chevron_right</i>
    </div>
    <ul class="nav-tab">
      <li class="tab" name='ledger'>내역</li>
      <li class="tab" name='calendar'>달력</li>
      <li class="tab" name='charts'>통계</li>
      <li class="selected-tab" id="selected"></li>
    </ul>
    `;
	}
}

customElements.define('navigation-bar', NavigationBar);
export default customElements.get('navigation-bar');
