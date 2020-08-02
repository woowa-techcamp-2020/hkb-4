// import NavigationBar from '../navigation';
import observer from '../../models/observer';
import controller from '../../controller';

class Hkb extends HTMLElement {
	// private navigation!: HTMLElement;
	private observer!: any;
	private hkbController!: any;
	constructor() {
		super();
		this.observer = observer;
		this.hkbController = controller.HkbController;
		// this.navigation = new NavigationBar();
	}

	connectedCallback() {
		this.observer.subscribe('dateChanged', this, this.render.bind(this));
		// this.appendChild(this.navigation);
		this.hkbController.initDate();
	}

	reset() {
		// 기존 것들 날리기
	}

	render(data) {
		this.reset();
		this.innerHTML = `<span>${data.year}</span><span>${data.month}</span>`;
	}
}

customElements.define('hkb-page', Hkb);
export default customElements.get('hkb-page');
