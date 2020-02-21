class WebComponent extends HTMLElement {
    static get observedAttributes() {
        return [];
    }

    get isFirstLoad() {
        if(this._isFirstLoad === undefined) {
            this.setAttribute('firstHtmlContent', this.innerHTML + ' ');
            this._isFirstLoad = true;
        } else {
            this.setAttribute('firstHtmlContent', this.getAttribute('firstHtmlContent'));
            this._isFirstLoad = false;
        }
        return this._isFirstLoad;
    }

    get template() {
        return '';
    }

    connectedCallback() {
        this.render();
    }

    onLoaded() {}

    customScript() {}

    disconnectedCallback() {}

    attributeChangedCallback(name, oldValue, newValue) {
        let changeListener = `on${name.substr(0, 1).toUpperCase()}${name.substr(1, name.length - 1).toLowerCase()}Change`;
        if(name in this) {
            if(changeListener in this)
                this[changeListener](oldValue, newValue);
            this[`${name}`] = this.cast(newValue);
            this.render();
        }
    }

    synchronizePropAttr(name, value) {
        if(this[name] !== value) {
            this.setAttribute(name, value);
        }
    }

    render() {
        this.onLoaded();
        if(this.isFirstLoad) {
            if (this.getAttribute('firstHtmlContent') === '')
                this.innerHTML = this.template;
            else
                this.innerHTML = this.getAttribute('firstHtmlContent') + ' ' + this.template;
        } else {
            this.innerHTML = this.getAttribute('firstHtmlContent') + this.template;
        }
        this.customScript();
    }

    /**
     * @param {string} value
     * @returns {string|object|array|boolean|number}
     */
    cast(value) {
        if(typeof value === "string") {
            if (value.match(/(true|false)$/g)) value = value === 'true';
            else if (value.match(/[0-9]+$/g)) {
                value = Number.parseInt(value);
            }
            else if (value.match(/[0-9\.]+$/g)) {
                value = Number.parseFloat(value);
            }
            else if (value.match(/\[*\]+$/g) || value.match(/\{*\}+$/g)) {
                value = JSON.parse(value);
            }
        }
        return value;
    }

    static define(tag, tagClass) {
        customElements.define(tag, tagClass);
    }
}