import { numberToString } from '../../util/common';
import MonthlyFilter from '../monthlyFilter';
class CalendarTab extends HTMLElement {
	public name = 'calendar';
	private monthlyFilter;

	constructor() {
		super();
		this.monthlyFilter = new MonthlyFilter();
	}

	connectedCallback() {
		this.render();
		this.prepend(this.monthlyFilter);
		this.addEventListener('change', () => this.filtering());
	}

	filtering() {
		const dates = this.querySelectorAll('.money') as NodeListOf<Element>;
		const checkedIncome = this.querySelector('.income-input') as HTMLInputElement;
		const checkedSpending = this.querySelector('.spending-input') as HTMLInputElement;

		dates.forEach(date => {
			if (date.classList.contains('income')) {
				if (checkedIncome.checked) {
					date.classList.remove('display-none');
				} else {
					date.classList.add('display-none');
				}
			}
			if (date.classList.contains('spending')) {
				if (checkedSpending.checked) {
					date.classList.remove('display-none');
				} else {
					date.classList.add('display-none');
				}
			}
		});
	}

	update(data) {
		this.renderCalendar(data.year, data.month, data.dailyData);
		this.monthlyFilter.update(data);
		this.filtering();
	}

	renderCalendar(year, month, daily) {
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
				days += this.renderDays(i + 1, 'red', daily[i + 1]);
			} else if ((i + currentFirstDay) % 7 === 6) {
				days += this.renderDays(i + 1, 'blue', daily[i + 1]);
			} else {
				days += this.renderDays(i + 1, '', daily[i + 1]);
			}
		}
		for (let i = 0; i < 6 - nextDays; i++) {
			days += `<div class="non-date date">${i + 1}</div>`;
		}

		const dateContainer = this.querySelector('.calendar-date-container') as HTMLElement;
		dateContainer.innerHTML = days;
	}

	renderDays(date: number, type: string, daily): string {
		return `<div class="date monthly-date ${type}">
			<li class="date-text">${date}</li>
			<li class="income money ${daily && daily.income !== 0 ? '' : 'value-none'}">${
			daily && daily.income !== 0 ? '+' + numberToString(daily.income) : ''
		}</li>
			<li class="spending money ${daily && daily.spending !== 0 ? '' : 'value-none'}">${
			daily && daily.spending !== 0 ? numberToString(-daily.spending) : ''
		}</li>
			
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
