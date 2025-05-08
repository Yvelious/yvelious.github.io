// _toggle_nav_btn.js
class toggleNavBtn {
    constructor() {
        this.nav = document.querySelector(".b-nav");
        this.toggleButton = document.querySelector(".b_navbar-toggle-btn");
    }

    toggleNav() {
        this.nav.classList.toggle("b-nav--close");
        this.nav.classList.toggle("b-nav--open");
    }



    init() {
        this.toggleButton.addEventListener("click", this.toggleNav.bind(this));
    }
}

export default toggleNavBtn;

