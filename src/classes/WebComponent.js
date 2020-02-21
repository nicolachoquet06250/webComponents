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
        this.onLoaded();
        this.render();
        this.customScript();
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
        if(this.isFirstLoad) {
            if (this.getAttribute('firstHtmlContent') === '')
                this.innerHTML = this.template;
            else
                this.innerHTML = this.getAttribute('firstHtmlContent') + ' ' + this.template;
        } else {
            this.innerHTML = this.getAttribute('firstHtmlContent') + this.template;
        }
    }

    /**
     * @param {string} value
     * @returns {string|object|array|boolean|number}
     */
    cast(value) {
        if(typeof value === "string") {
            if (value.match(/true|false/)) value = value === 'true';
            else if (value.match(/[0-9]+/)) value = Number.parseInt(value);
            else if (value.match(/[0-9\.]+/)) value = Number.parseFloat(value);
            else if (value.match(/\[*\]+/) || value.match(/\{*\}+/)) value = JSON.parse(value);
        }
        return value;
    }

    static define(tag, tagClass) {
        customElements.define(tag, tagClass);
    }
}