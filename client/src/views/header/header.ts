class Header extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
      <div class="flex-1"></div>
      <div class="header">가계부</div>
      <span class="flex-1 user-name">@헤더가 흰색 아래 부분에 배경색있음좋겠ㅇ염</span>
    `;
	}
}

customElements.define('hkb-header', Header);
export default customElements.get('hkb-header');
