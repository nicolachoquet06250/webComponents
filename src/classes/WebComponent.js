class WebComponent extends HTMLElement {
    static get observedAttributes() {
        return ['innerHTML'];
    }

    get before_template() {
        if(!this._bt && this.innerHTML)
            this._bt = this.innerHTML;
        if(!this._bt)
            this._bt = '';
        else this._bt += ' ';
        return this._bt;
    }

    get template() {
        return '';
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {}

    attributeChangedCallback(name, oldValue, newValue) {
        let changeListener = `on${name.substr(0, 1).toUpperCase()}${name.substr(1, name.length - 1).toLowerCase()}Change`;
        if(name in this
            && changeListener in this) {

            this[changeListener](oldValue, newValue);
            this[`_${name}`] = newValue;
            this.render();

        }
    }

    render() {
        this.innerHTML = this.template;
    }

    static define(tag, tagClass) {
        customElements.define(tag, tagClass);
    }
}