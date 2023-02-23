import Pizza from "./Pizza.js";
document.addEventListener('deviceready', onDeviceReady);

function onDeviceReady() {
    const homeNav = document.querySelector('#home-nav');
    const homePage = document.querySelector('#home-page');
    homeNav.root = homePage;

    const pizzasNav = document.querySelector('#pizzas-nav');
    const pizzasPage = document.querySelector('#pizzas-page');
    pizzasNav.root = pizzasPage;

    const btCreatePizza = document.querySelector('#bt-create-pizza');

    const pizza = new Pizza();
    btCreatePizza.addEventListener('click', pizza.promptPizza);
}
