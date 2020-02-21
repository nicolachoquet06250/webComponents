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
            if(changeListener in this) {
                this[changeListener](oldValue, newValue);
            }
            this[`_${name}`] = newValue;
            this.render();
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

    static define(tag, tagClass) {
        customElements.define(tag, tagClass);
    }
}