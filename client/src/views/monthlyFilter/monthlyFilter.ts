import { numberToString } from '../../util/common';

class MonthlyFilter extends HTMLElement {
	connectedCallback() {
		this.render();
		console.log('111111111');
	}

	update(data) {
		const monthly = data.monthlyData;
		console.log('222222222');
		const income = this.querySelector('.total-income') as HTMLElement;
		const spending = this.querySelector('.total-spending') as HTMLElement;
		income.textContent = `${numberToString(monthly.income)}원`;
		spending.textContent = `${numberToString(monthly.spending)}원`;
	}

	render() {
		this.innerHTML = `
    <div class="checkbox-group">
      <input type="checkbox"  content="income" checked id="monthly-income-check"/>
      <label for="monthly-income-check">
        총 수입: 
        <span class="total-income"></span>
      </label>
    </div>
    <div class="checkbox-group" type="spending">
      <input type="checkbox"  content="spending" checked id="monthly-spending-check"/>
      <label for="monthly-spending-check">
        총 지출: 
        <span class="total-spending"></span>
      </label>
    </div>`;
	}
}

customElements.define('monthly-filter', MonthlyFilter);
export default customElements.get('monthly-filter');
