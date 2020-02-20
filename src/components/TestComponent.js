WebComponent.define('wc-test', class TestComponent extends WebComponent {
    static get observedAttributes() {
        return ['innerHTML', 'text'];
    }

    get text() {
        return this._text || '';
    }
    set text(text) {
        this._text = text;
    }

    get template() {
        return `${this.before_template}<b>${this.text}</b><br />`;
    }

    constructor() {
        super();
    }

    /**
     * called when text property changed
     * @param oldValue
     * @param newValue
     */
    onTextChange(oldValue, newValue) {
        console.log('old', oldValue, 'new', newValue);
    }

    onInnerHTMLChange(oldValue, newValue) {
        console.log('old', oldValue, 'new', newValue);
    }


    disconnectedCallback() {
        console.log(`this tag <${this.tagName.toLowerCase()} /> is deleted`);
    }
});