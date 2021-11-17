WebComponent.define('wc-user', class UserComponent extends WebComponent {
    static get observedAttributes() {
        return ['lastname', 'firstname', 'test_bool'];
    }

    // version reactive en changeant directement la valeur de la propriété
    // customScript() {
    //     setTimeout(() => {
    //         this.lastname = 'Loubet';
    //     }, 5000);
    // }

    get template() {
        return `<span>${this.firstname} ${this.lastname} ${this.test_bool}</span>`;
    }

    get firstname() {
        return this.getAttribute('firstname') || '';
    }
    set firstname(fn) {
        this.synchronizePropAttr('firstname', fn);
    }

    get lastname() {
        return this.getAttribute('lastname') || '';
    }
    set lastname(ln) {
        this.synchronizePropAttr('lastname', ln);
    }

    get test_bool() {
        return this.getAttribute('test_bool') || false;
    }
    set test_bool(bool) {
        this.synchronizePropAttr('test_bool', bool);
    }
});