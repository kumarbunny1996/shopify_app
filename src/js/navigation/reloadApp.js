const mainApp = require('../components/app');
const { indexPage, UI_handlerEvents } = require("../components/index");
const loginForm = require("../components/login");
const { loginEvents } = require('../app/loginLogic');
const registerForm = require("../components/register");
const { passwordEvents, registerEvents } = require("../app/registerLogic");
const displayUserAccount = require("../app/userslogic");
const { loginAreaAfterSuccess } = require('../utils/utils');
//const homePage = require('../components/home');


let token = JSON.parse(localStorage.getItem('AccessToken'));

//calls the common function to all pages when reloaded

const reloadPages = () => {
    mainApp();
    if (location.hash === "#home") {
        indexPage();
        UI_handlerEvents();
        if (token) {
            displayUserAccount();
        }
    }

    //sets the login page

    if (location.hash === "#login") {
        if (token) {
            return loginAreaAfterSuccess();
        }
        loginForm();
        loginEvents();
    }

    //sets the register page
    if (location.hash === "#register") {
        registerForm();
        passwordEvents();
        registerEvents();
    }
}

reloadPages();