class NavigationBar extends HTMLElement {
	private date!: Date;
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
		this.initDate();
		this.initEvent();
	}

	initDate() {
		this.date = new Date();
		const dateElement = this.querySelector('span') as HTMLElement;
		dateElement.textContent = this.dateToString(this.date);
	}

	initEvent() {
		const navtab = this.querySelector('.nav-tab') as HTMLElement;
		const prevMonth = this.querySelector('.left-btn') as HTMLElement;
		const nextMonth = this.querySelector('.right-btn') as HTMLElement;
		const dateElement = this.querySelector('span') as HTMLElement;

		navtab.addEventListener('click', (event: MouseEvent) => {
			const tab = (event.target as HTMLElement).closest('li');
			if (!tab) return;
			const selected = this.querySelector('.selected-tab') as HTMLElement;
			selected.style.left = `${tab.offsetLeft}px`;
		});
		prevMonth.addEventListener('click', (event: MouseEvent) => {
			this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
			dateElement.textContent = this.dateToString(this.date);
		});
		nextMonth.addEventListener('click', (event: MouseEvent) => {
			this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
			dateElement.textContent = this.dateToString(this.date);
		});
	}

	dateToString(date: Date) {
		return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
	}

	render() {
		this.innerHTML = `
    <div class="nav-month">
      <i class="material-icons left-btn">chevron_left</i>
      <span></span>
      <i class="material-icons right-btn">chevron_right</i>
    </div>
    <ul class="nav-tab">
      <li class="tab">내역</li>
      <li class="tab">달력</li>
      <li class="tab">통계</li>
      <li class="selected-tab" id="selected"></li>
    </ul>
    `;
	}
}

customElements.define('navigation-bar', NavigationBar);
export default customElements.get('navigation-bar');
