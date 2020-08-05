import LedgerByDate from '../ledgerByDate';
import controller from '../../controller';
import observer from '../../models/observer';

class Ledger extends HTMLElement {
	public name = 'ledger';
	private hkbController!: any;
	private observer!: any;
	private data: any | null;

	constructor() {
		super();
		this.hkbController = controller.HkbController;
		this.observer = observer;
		this.data = null;
	}

	connectedCallback() {
		this.observer.subscribe('dataFecthed', this, this.getData.bind(this));
		this.addEventListener('click', this.hkbController.ledgerHandler.bind(this.hkbController));
	}

	getData(data) {
		this.data = data;
		this.render();
	}

	render() {
		const { year, month, rawData, dailyData, monthlyData } = this.data;
		this.innerHTML = `
		  <div class="container container-input">
		    <div class="init-button">내용 지우기</div>
		    <div class="delete-button hide">삭제</div>
		    <div class="row">
		      <div class="group">
		        <span>분류</span>
		        <label for="type-income" class="button income-button">수입
		          <input id="type-income" type="radio" name="type" value="수입"/>
		        </label>
		        <label for="type-spending" class="button spending-button button--active">지출
		          <input id="type-spending" type="radio" name="type" value="지출">
		        </label>
		      </div>
		    </div>
		    <div class="row">
		      <div class="group">
		        <span>날짜</span>
		        <input type="date" value="2020-08-04"/>
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
		          <option value="하나카드" selected>하나카드</option>
		          <option value="삼성카드">삼성카드</option>
		        </select>
		      </div>
		    </div>
		    <div class="row">
		      <div class="group">
		        <span>금액</span>
		        <input type="text" name="amount" />
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
		  <div class="container container-monthly">
		    <div class="row">
		      <div class="group">
		        <input type="checkbox" checked /><span>총 수입: ${monthlyData.income}원</span>
		      </div>
		    </div>
		    <div class="row">
		      <div class="group">
		        <input type="checkbox" checked /><span>총 지출: ${monthlyData.spending}원</span>
		      </div>
		    </div>
		  </div>
		  <div class="container container-items"></div>
		  `;

		const itemContainer = this.querySelector('.container-items');
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
}

customElements.define('hkb-ledger', Ledger);
export default customElements.get('hkb-ledger');
