window.addEventListener('load', () => {
    document.querySelector('wc-test').setAttribute('text', 'tata');

    let test2 = document.createElement('wc-test');
    test2.setAttribute('text', 'trouloulou');
    document.querySelector('body').appendChild(test2);

    test2.remove();

    document.querySelector('body').innerHTML += `<wc-test text="mdr" id="test">hello</wc-test>`;

    document.querySelector('#test').innerHTML += ' xptdr';
});