const { indexPage, UI_handlerEvents } = require("../components/index");
const loginForm = require("../components/login");
const registerForm = require("../components/register");
const { passwordEvents, registerEvents } = require('../app/registerLogic');
const { events, showHide } = require("../app/uiHandler");


//sets the home page as default
const setDefaultPage = () => {
    if (!location.hash) {
        location.hash = "#home";
    }
}
setDefaultPage();

//navigation event handler
const navigation = () => {
    const fragmentId = location.hash.substr(1);

    if (fragmentId === "login") {
        loginForm();
        //show or hide the input password
        events("#toggle", 'click', showHide);
    }
    if (fragmentId === "register") {
        registerForm();
        passwordEvents();
        registerEvents();
    }
    if (fragmentId === "home") {
        indexPage();
        UI_handlerEvents();
    }

}
window.addEventListener('hashchange', navigation);