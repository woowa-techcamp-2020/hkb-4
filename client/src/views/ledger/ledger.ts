import LedgerByDate from '../ledgerByDate';
import controller from '../../controller';
import MonthlyFilter from '../monthlyFilter';
import { ItemDTO } from '../../../../shared/dto';

class Ledger extends HTMLElement {
	public name = 'ledger';
	private hkbController!: any;
	private monthlyFilter;

	constructor() {
		super();
		this.hkbController = controller.HkbController;
		this.monthlyFilter = new MonthlyFilter();
	}

	connectedCallback() {
		this.addEventListener('click', e => this.hkbController.ledgerHandler(e));
		this.render();
		const monthlyContainer = document.querySelector('.monthly-container') as HTMLElement;
		monthlyContainer.appendChild(this.monthlyFilter);
	}

	updatePayments(payments) {
		const paymentSelection = this.querySelector('select[name="payment"]');
		let options = '<option value="" hidden disabled selected>선택하세요</option>';
		for (const [id, name] of Object.entries(payments)) {
			options += `<option value="${id}">${name}</option>`;
		}
		paymentSelection.innerHTML = options;
	}

	update(data) {
		this.updatePayments(data.payments);
		this.monthlyFilter.update(data);
		this.renderItemList(data);
	}

	renderItemList(data) {
		const { year, month, rawData, dailyData, monthlyData } = data;
		console.log(year, month, rawData, dailyData, monthlyData);
		const itemContainer = this.querySelector('.container-items');
		itemContainer.innerHTML = '';
		if (itemContainer) {
			const lastDay = new Date(year, month, 0).getDate();
			for (let i = 1; i <= lastDay; i++) {
				if (dailyData[i]) {
					itemContainer.appendChild(
						new LedgerByDate({
							year: year,
							month: month,
							day: i,
							dIncome: dailyData[i].income,
							dSpending: dailyData[i].spending,
							items: rawData[i],
						}),
					);
				}
			}
		}
	}

	render() {
		const { INCOME, SPENDING } = ItemDTO.ItemType;
		this.innerHTML = `
		  <div class="container container-input">
		    <div class="init-button">내용 지우기</div>
		    <div class="delete-button hide">삭제</div>
		    <div class="row">
		      <div class="group">
		        <span>분류</span>
		        <label for="type-income" class="button income-button">수입
		          <input id="type-income" type="radio" name="type" value="${INCOME}"/>
		        </label>
		        <label for="type-spending" class="button spending-button button--active">지출
		          <input id="type-spending" type="radio" name="type" value="${SPENDING}" checked>
		        </label>
		      </div>
		    </div>
		    <div class="row">
		      <div class="group">
		        <span>날짜</span>
		        <input type="date" name="date" value="2020-08-04"/>
		      </div>
		      <div class="group">
		        <span>카테고리</span>
		        <select name="category">
		          <option value="식비" selected>식비</option>
		          <option value="생활">생활</option>
		          <option value="쇼핑/뷰티">쇼핑/뷰티</option>
		          <option value="교통">교통</option>
		          <option value="의료/건강">의료/건강</option>
		          <option value="문화/여가">문화/여가</option>
		          <option value="미분류">미분류</option>
		        </select>
		      </div>
		      <div class="group">
		        <span>결제수단</span>
		        <select name="payment">
		        </select>
		      </div>
		    </div>
		    <div class="row">
		      <div class="group">
						<span>금액</span>
						<input type="number" step="1" min="0" name="amount" />원
		      </div>
		      <div class="group">
		        <span>내용</span>
		        <input type="text" name="description"/>
		      </div>
		    </div>
		    <div class="row">
		      <div class="button button--large button--active submit-button">
		        확인
		      </div>
		    </div>
			</div>
			<div class="monthly-container">
			</div>
		  <div class="container container-items"></div>
		  `;
	}
}

customElements.define('hkb-ledger', Ledger);
export default customElements.get('hkb-ledger');
