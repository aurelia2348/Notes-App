class AppBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header style="background: #6200ea; color: white; text-align: center; padding: 15px; font-size: 20px;">
                            Aplikasi Pencatatan
                          </header>`;
    }
}
customElements.define("app-bar", AppBar);
