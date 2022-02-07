export default class SwitchForm {
    constructor(
        signIn = "[data-sign='in']",
        signUp = "[data-sign='up']",
        button = "[data-button]",
        container = "[data-container]"
    ) {
        this.signIn = document.querySelectorAll(signIn);
        this.signUp = document.querySelectorAll(signUp);
        this.button = document.querySelectorAll(button);
        this.container = document.querySelector(container);
    }

    // Desativa um formulário e ativa outro...
    switch(e) {
        e.preventDefault();
        this.signIn.forEach((item) => {
            item.classList.toggle("active");
            item.classList.add("clicked");
        });
        this.signUp.forEach((item) => {
            item.classList.toggle("active");
            item.classList.add("clicked");
        });
        this.container.classList.toggle("active");
        this.container.classList.add("clicked");
    }

    // Adiciona um evento ao botão...
    addEvents() {
        this.button.forEach((item) => {
            item.addEventListener("click", this.switch);
        });
    }

    // Mantém a referência correta do método...
    bindEvents() {
        this.switch = this.switch.bind(this);
    }

    // Inicializa a classe...
    init() {
        this.bindEvents();
        this.addEvents();
        return this;
    }
}
