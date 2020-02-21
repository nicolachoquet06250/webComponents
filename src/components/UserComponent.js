WebComponent.define('wc-user', class UserComponent extends WebComponent {
    static get observedAttributes() {
        return ['lastname', 'firstname'];
    }

    get template() {
        console.log(`<span>${this.firstname} ${this.lastname}</span>`)
        return `<span>${this.firstname} ${this.lastname}</span>`;
    }

    get firstname() {
        return this._firstname || '';
    }
    set firstname(fn) {
        this._firstname = fn;
    }

    get lastname() {
        return this._lastname || '';
    }
    set lastname(ln) {
        this._lastname = ln;
    }
});