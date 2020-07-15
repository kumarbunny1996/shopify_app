const { indexPage, UI_handlerEvents } = require("../components/index");
const loginForm = require("../components/login");
const { loginEvents } = require('../app/loginLogic');
const registerForm = require("../components/register");
const { passwordEvents, registerEvents } = require("../app/registerLogic");
const { showReloadData } = require("../app/userslogic");
const { loginAreaAfterSuccess } = require('../utils/utils');
const userStore = require('../utils/userStore');
const { sellerDom, sellerEvents } = require('../components/seller');
const { homePage, slider, sliderRun } = require("../components/home");
const { sellerCentralDom, prodFormHtml, sellerFormHtml, imagePreview } = require("../components/seller_central");
const { events } = require("../app/uiHandler");
const { sellerCentralEvents, keepDataOnInput, setsProductData, validateProductForm, removeModal, productPageEvents } = require("../app/sellerLogic");



let token = userStore.authToken();

//calls the common function to all pages when reloaded

const reloadPages = () => {
    indexPage();
    removeModal();
    UI_handlerEvents();
    if (token) {
        showReloadData();
    }

    if (location.hash === "#home") {
        removeModal();
        homePage();
        slider();
    }

    //sets the login page

    if (location.hash === "#login") {
        sliderRun();
        removeModal();
        if (token) {
            return loginAreaAfterSuccess();
        }
        loginForm();
        loginEvents();
    }

    //sets the register page
    if (location.hash === "#register") {
        sliderRun();
        removeModal();
        registerForm();
        passwordEvents();
        registerEvents();
    }
    if (location.hash === "#sell-on-shopify") {
        sliderRun();
        removeModal();
        sellerDom();
        sellerEvents();
    }
    if (location.hash === "#seller-central") {
        sliderRun();
        removeModal();
        if (token) {
            let sellerForm = sellerFormHtml();
            sellerCentralDom(sellerForm);
            sellerCentralEvents();
            keepDataOnInput();
        }
    }
    if (location.hash === "#seller-product") {
        sliderRun();
        if (token) {
            let prodForm = prodFormHtml();
            sellerCentralDom(prodForm);
            imagePreview();
            setsProductData();
            productPageEvents();
        }

    }
}

reloadPages();