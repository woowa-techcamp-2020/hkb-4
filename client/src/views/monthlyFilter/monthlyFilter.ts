import { numberToString } from '../../util/common';
class MonthlyFilter extends HTMLElement {
	private controller;
	connectedCallback() {
		this.render();
	}

	update(data) {
		const monthly = data.monthlyData;
		const income = this.querySelector('.total-income') as HTMLElement;
		const spending = this.querySelector('.total-spending') as HTMLElement;
		income.textContent = `${numberToString(monthly.income)}원`;
		spending.textContent = `${numberToString(monthly.spending)}원`;
	}

	render() {
		this.innerHTML = `
    <div class="checkbox-group">
      <input id="checkbox-income" type="checkbox" class="income-input" content="income" checked />
      <label for="checkbox-income">
        총 수입: 
        <span class="total-income"></span>
      </label>
    </div>
    <div class="checkbox-group" type="spending">
      <input id="checkbox-spending" type="checkbox" class="spending-input" content="spending" checked/>
      <label for="checkbox-spending">
        총 지출: 
        <span class="total-spending"></span>
      </label>
    </div>`;
	}
}

customElements.define('monthly-filter', MonthlyFilter);
export default customElements.get('monthly-filter');
