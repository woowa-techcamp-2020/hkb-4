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
      <span class="flex-1 user-name">유저네임</span>
    `;
	}
}

customElements.define('hkb-header', Header);
export default customElements.get('hkb-header');
