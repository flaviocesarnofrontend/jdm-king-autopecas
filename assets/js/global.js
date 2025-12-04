//script para gerenciar o menu hamburguer na versao mobile
console.log('%cJavascript activated!', 'color: lightgreen; background-color: blue;');

const navToggleBtn = document.querySelector('.nav-toggle-btn');
const nav = document.querySelector('.nav');

navToggleBtn.addEventListener('click', () => {
    nav.classList.toggle('nav--visible');
})