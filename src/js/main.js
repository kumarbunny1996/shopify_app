//main source to file
const { indexPage, UI_handlerEvents } = require("./components/index");
const loginForm = require("./components/login");
const { events, showHide } = require("./app/uiHandler");
const registerForm = require("./components/register");
const { passwordEvents, registerEvents, validateBeforeClick } = require("./app/registerLogic");
require('./routes/mainRoutes');


//calls the common function to all pages
indexPage();
UI_handlerEvents();

//sets the login page
if (location.hash === "#login") {
    loginForm();
    events("#toggle", 'click', showHide);
}

//sets the register page
if (location.hash === "#register") {
    registerForm();
    passwordEvents();
    registerEvents();
}