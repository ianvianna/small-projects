export default class SlideMain {
    constructor(wrapper, slide) {
        this.wrapper = document.querySelector(wrapper);
        this.slide = document.querySelector(slide);
        this.distance = { finalPosition: 0, startX: 0, movement: 0, };
    }

    // Atualiza o posicionamento através do cálculo...
    moveSlide(distX) {
        this.distance.movePosition = distX;
        this.slide.style.transform = `translate3d(${distX}px, 0px, 0px)`;
    }
    updatePosition(clientX) {
        this.distance.movement = (this.distance.startX - clientX) * 1.5;
        return this.distance.finalPosition - this.distance.movement;
    }

    // Eventos principais...
    onStart(e) {
        e.preventDefault();
        this.distance.startX = e.clientX;
        this.wrapper.addEventListener("mousemove", this.onMove);
    }
    onMove(e) {
        e.preventDefault();
        const finalPosition = this.updatePosition(e.clientX);
        this.moveSlide(finalPosition);
    }
    onEnd() {
        this.wrapper.removeEventListener("mousemove", this.onMove);
        console.log(this.distance.finalPosition);
        this.distance.finalPosition = this.distance.movePosition;
    }

    // Adiciona eventos...
    addEvents() {
        this.wrapper.addEventListener("mousedown", this.onStart);
        this.wrapper.addEventListener("mouseup", this.onEnd);
    }

    // Mantém a referência correta dos eventos...
    bindEvents() {
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
    }

    // Inicializa a classe...
    init() {
        this.bindEvents();
        this.addEvents();
    }
}
