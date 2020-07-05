const { indexPage, UI_handlerEvents } = require("../components/index");
const loginForm = require("../components/login");
const registerForm = require("../components/register");
const { passwordEvents, registerEvents } = require('../app/registerLogic');
const { loginEvents } = require("../app/loginLogic");
const displayUserAccount = require("../app/userslogic");
const { loginAreaAfterSuccess } = require("../utils/utils");
//const homePage = require("../components/home");



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
    let token = JSON.parse(localStorage.getItem('AccessToken'));

    if (fragmentId === "login") {
        if (token) {
            return loginAreaAfterSuccess();
        }
        loginForm();
        loginEvents();
    }
    if (fragmentId === "register") {
        registerForm();
        passwordEvents();
        registerEvents();
    }
    if (fragmentId === "home") {
        indexPage();
        UI_handlerEvents();
        if (token) {
            displayUserAccount();
        }
    }

}
window.addEventListener('hashchange', navigation);