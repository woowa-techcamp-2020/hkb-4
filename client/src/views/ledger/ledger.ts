import LedgerByDate from '../ledgerByDate';

class Ledger extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
    <div class="container container-input">
      <div class="row">
        <div class="group">
          <span>분류</span>
          <div class="button spending-button">수입</div>
          <div class="button button--active income-button">지출</div>
        </div>
      </div>
      <div class="row">
        <div class="group">
          <span>날짜</span>
          <input type="date" />
        </div>
        <div class="group">
          <span>카테고리</span>
          <select
            ><option value="기타">기타</option
            ><option value="교육비">교육비</option></select
          >
        </div>
        <div class="group">
          <span>결제수단</span>
          <select
            ><option value="하나카드">하나카드</option
            ><option value="삼성카드">삼성카드</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="group">
          <span>금액</span>
          <input type="text" />
        </div>
        <div class="group">
          <span>내용</span>
          <input type="text" />
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
          <input type="checkbox" /><span>총 수입: 100,000원</span>
        </div>
      </div>
      <div class="row">
        <div class="group">
          <input type="checkbox" /><span>총 지출: 50,000원</span>
        </div>
      </div>
    </div>
    <div class="container container-items"></div>
    `;
		const itemContainer = this.querySelector('.container-items');
		if (itemContainer) {
			const data = { year: 2020, month: 7 };
			const lastDay = new Date(data.year, data.month, 0).getDate();
			for (let i = 1; i <= lastDay; i++) {
				itemContainer.appendChild(
					new LedgerByDate({
						month: data.month,
						day: i,
						dIncome: (i - 1) * 1000,
						dSpending: (i - 1) * 500,
						item: [],
					}),
				);
			}
		}
	}
}

customElements.define('hkb-ledger', Ledger);
export default customElements.get('hkb-ledger');
