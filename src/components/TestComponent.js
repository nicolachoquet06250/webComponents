WebComponent.define('wc-test', class TestComponent extends WebComponent {
    static get observedAttributes() {
        return ['text'];
    }

    get text() {
        return this._text || '';
    }
    set text(text) {
        this._text = text;
    }

    get template() {
        return `<b>${this.text}</b><br />`;
    }

    disconnectedCallback() {
        console.log(`this tag <${this.tagName.toLowerCase()} /> is deleted`);
    }
});