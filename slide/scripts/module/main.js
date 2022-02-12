export default class SlideMain {
    constructor(wrapper, slide) {
        this.wrapper = document.querySelector(wrapper);
        this.slide = document.querySelector(slide);
    }

    // Eventos principais...
    onStart(e) {
        e.preventDefault();
        this.wrapper.addEventListener("mousemove", this.onMove);
    }
    onMove(e) {
        e.preventDefault();
    }
    onEnd() {
        this.wrapper.removeEventListener("mousemove", this.onMove);
    }

    // Adiciona eventos...
    addEvents() {
        this.wrapper.addEventListener("mousedown", this.onStart);
        this.wrapper.addEventListener("mouseup", this.onEnd);
    }

    // Mantém a referência correta dos eventos...
    bindEvents() {
        this.onStart = this.onStart.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    // Inicializa a classe...
    init() {
        this.bindEvents();
        this.addEvents();
    }
}
