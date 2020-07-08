const { indexPage, UI_handlerEvents } = require("../components/index");
const loginForm = require("../components/login");
const registerForm = require("../components/register");
const { passwordEvents, registerEvents } = require('../app/registerLogic');
const { loginEvents } = require("../app/loginLogic");
const { init } = require("../app/userslogic");
const { loginAreaAfterSuccess } = require("../utils/utils");
const userStore = require("../utils/userStore");
const { showReloadData } = require('../app/userslogic')
    //const homePage = require("../components/home");



//sets the home page as default
const setDefaultPage = () => {
    let token = userStore.authToken();
    if (!location.hash) {
        location.hash = "#home";
        if (token) {
            showReloadData();

        }
    }
}
setDefaultPage();

//navigation event handler
const navigation = () => {
    const fragmentId = location.hash.substr(1);
    let token = userStore.authToken();

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
            init();
        }
    }

}
window.addEventListener('hashchange', navigation);