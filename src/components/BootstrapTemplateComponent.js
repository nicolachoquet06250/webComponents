WebComponent.define('wc-bootstrap', class BootstrapTemplateComponent extends WebComponent {
    static get observedAttributes() {
        return ['lang', 'title'];
    }

    // version reactive en changeant la valeur de l'attribut HTML
    customScript() {
        setTimeout(() => {
            let user = document.querySelector('#user');
            user.setAttribute('lastname', 'Loubet');
            user.setAttribute('test_bool', 'true');
        }, 5000);
        setTimeout(() => {
            document.querySelector('#user').setAttribute('test_bool', 'false');
        }, 10000);
    }

    onLoaded() {
        document.querySelector('head').innerHTML += `
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>${this.title}</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" 
              integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" 
              crossorigin="anonymous" />
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" 
                integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" 
                crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" 
                integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" 
                crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" 
                integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" 
                crossorigin="anonymous"></script>`;
    }

    get template() {
        return `<main class="container">
    <div class="row">
        <div class="col-12">
            <h1>${this.title}</h1>
        </div>
        <div class="col-12">
            <wc-user firstName="Karine" 
                     lastName="Choquet" 
                     id="user">
                Hello je m'appel
            </wc-user>
        </div>
    </div>
</main>`;
    }

    get lang() {
        return this.getAttribute('lang') || 'en';
    }
    set lang(lang) {
        this.synchronizePropAttr('lang', lang);
    }

    get title() {
        return this.getAttribute('title') || '';
    }
    set title(title) {
        this.synchronizePropAttr('title', title);
    }
});