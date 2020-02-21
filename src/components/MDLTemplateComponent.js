WebComponent.define('wc-mdl', class MDLTemplateComponent extends WebComponent {
    static get observedAttributes() {
        return ['title', 'theme', 'page'];
    }

    onLoaded() {
        document.querySelector('head').innerHTML += `
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<title>${this.title}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css" />
<script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
`;
    }

    customScript() {
        setTimeout(() => this.page = 'titi', 5000);
    }

    get template() {
        return `<div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
    <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">${this.title}</span>
        <nav class="mdl-navigation">
            ${this.menu.map(m => `<a class="mdl-navigation__link" href="${m.href}">${m.title}</a>`).join('\n')}
        </nav>
    </div>
    <main class="mdl-layout__content">
        <div class="page-content">
            <h1>${this.page_template}</h1>
        </div>
    </main>
</div>
`;
    }

    get page_template() {
        switch (this.page) {
            case 'toto':
                return `toto`;
            case 'titi':
                return `titi`;
            default:
                return `toto`;
        }
    }

    get title() {
        return this.getAttribute('title') || '';
    }
    set title(title) {
        this.synchronizePropAttr('title', title);
    }

    get theme() {
        return this.getAttribute('theme') || 'blue_grey-deep_purple';
    }
    set theme(theme) {
        theme.synchronizePropAttr('theme', theme);
    }

    get menu() {
        return this.cast(this.getAttribute('menu')) || [];
    }
    set menu(menu) {
        this.synchronizePropAttr('menu', menu);
    }

    get page() {
        return this.getAttribute('page') || '';
    }
    set page(page) {
        this.synchronizePropAttr('page', page);
    }
});