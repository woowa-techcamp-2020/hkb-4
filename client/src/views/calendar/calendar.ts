class CalendarTab extends HTMLElement {
	public name = 'calendar';
	// private date!: Date;

	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
		this.initDate();
	}

	initDate() {
		// TODO date 가져와야하는데 연결을 안했네
		const date = new Date();
		this.renderCalendar(date.getFullYear(), date.getMonth());
	}

	update(year, month) {
		this.renderCalendar(year, month);
	}

	renderCalendar(year, month) {
		const currentMonth = new Date(year, month, 0);
		const currentLast = currentMonth.getDate();
		const currentFirstDay = new Date(year, month - 1, 1).getDay();
		const prevLast = new Date(year, month - 1, 0).getDate();
		const nextDays = currentMonth.getDay();

		let days = '';
		for (let i = currentFirstDay; i > 0; i--) {
			days += `<div class="non-date date">${prevLast - (i - 1)}</div>`;
		}
		for (let i = 0; i < currentLast; i++) {
			if ((i + currentFirstDay) % 7 === 0) {
				days += this.renderDays(i + 1, 'red', '', '');
			} else if ((i + currentFirstDay) % 7 === 6) {
				days += this.renderDays(i + 1, 'blue', '', '');
			} else {
				days += this.renderDays(i + 1, '', '', '');
			}
		}
		for (let i = 0; i < 6 - nextDays; i++) {
			days += `<div class="non-date date">${i + 1}</div>`;
		}

		const dateContainer = this.querySelector('.calendar-date-container') as HTMLElement;
		dateContainer.innerHTML = days;
	}

	renderDays(date: number, type: string, income: string, spending: string): string {
		return `<div class="date ${type}">
      <li class="date-text">${date}</li>
      <li class="income money">+1,000,000</li>
      <li class="spending money">-89,000</li>
    </div>`;
	}

	render() {
		this.innerHTML = `
    <div class="calendar">
    <ul class="calendar-week">
      <li class="red">SUN</li>
      <li>MON</li>
      <li>TUE</li>
      <li>WED</li>
      <li>THU</li>
      <li>FRI</li>
      <li class="blue">SAT</li>
    </ul>
    <div class="calendar-date-container">
    </div>
    </div>
    `;
	}
}

customElements.define('calendar-tab', CalendarTab);
export default customElements.get('calendar-tab');
