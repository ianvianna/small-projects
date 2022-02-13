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
        if (e.type === "mousedown") {
            console.log('Click!');
            this.distance.startX = e.clientX;
            this.wrapper.addEventListener("mousemove", this.onMove);
        } else if (e.type === "touchstart") {
            this.distance.startX = e.changedTouches[0].clientX;
            this.wrapper.addEventListener("touchmove", this.onMove);
        }
    }
    onMove(e) {
        e.preventDefault();
        console.log(e.type)
        if (e.type === "mousemove") {
            const finalPosition = this.updatePosition(e.clientX);
            this.moveSlide(finalPosition);
        } else if (e.type === "touchmove") {
            const finalPosition = this.updatePosition(e.changedTouches[0].clientX);
            this.moveSlide(finalPosition);
        }
    }
    onEnd() {
        this.wrapper.removeEventListener("mousemove", this.onMove);
        this.wrapper.removeEventListener("touchmove", this.onMove);
        this.distance.finalPosition = this.distance.movePosition;
    }

    // Adiciona eventos...
    addEvents() {
        this.wrapper.addEventListener("mousedown", this.onStart);
        this.wrapper.addEventListener("touchstart", this.onStart);
        this.wrapper.addEventListener("mouseup", this.onEnd);
        this.wrapper.addEventListener("touchend", this.onEnd);
    }

    // Mantém a referência correta dos eventos...
    bindEvents() {
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
    }

    // Configurações...
    slidePosition(slide) {
        const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
        return -(slide.offsetLeft - margin);
    }
    slideIndexNav(index) {
        const last = this.slideArray.length - 1;
        this.index = {
            prev: index ? index - 1 : null,
            active: index,
            next: index === last ? null : index + 1,
        }
    }
    changeSlide(index) {
        const activeSlide = this.slideArray[index];
        this.moveSlide(this.slideArray[index].position);
        this.slideIndexNav(index);
        this.distance.finalPosition = activeSlide.position;
    }
    slideConfig() {
        this.slideArray = [...this.slide.children].map((element) => {
            const position = this.slidePosition(element);
            return { position, element };
        });
        console.log(this.slideArray);
    }

    // Inicializa a classe...
    init() {
        this.bindEvents();
        this.addEvents();
        this.slideConfig();
    }
}
