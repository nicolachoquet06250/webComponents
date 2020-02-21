WebComponent.define('wc-test', class TestComponent extends WebComponent {
    static get observedAttributes() {
        return ['text'];
    }

    get text() {
        return this.getAttribute('text') || '';
    }
    set text(text) {
        this.synchronizePropAttr('text', text);
    }

    get template() {
        return `<b>${this.text}</b><br />`;
    }

    disconnectedCallback() {
        console.log(`this tag <${this.tagName.toLowerCase()} /> is deleted`);
    }
});