const { indexPage, UI_handlerEvents } = require("../components/index");
const loginForm = require("../components/login");
const registerForm = require("../components/register");
const { passwordEvents, registerEvents } = require('../app/registerLogic');
const { loginEvents } = require("../app/loginLogic");
const { loginAreaAfterSuccess } = require("../utils/utils");
const userStore = require("../utils/userStore");
const { init } = require('../app/userslogic');
const { sellerDom, sellerEvents } = require("../components/seller");
const { homePage, slider, sliderRun } = require("../components/home");
const { sellerCentralDom, prodFormHtml, sellerFormHtml, imagePreview } = require("../components/seller_central");
const { sellerCentralEvents, keepDataOnInput, setsProductData, validateProductForm, productModalShow, removeModal, productPageEvents } = require("../app/sellerLogic");
const { events } = require("../app/uiHandler");


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
    let token = userStore.authToken();
    //console.log(fragmentId);
    if (fragmentId === "login") {
        sliderRun(fragmentId)
        removeModal();
        if (token) {
            return loginAreaAfterSuccess();
        }
        loginForm();
        loginEvents();
    }
    if (fragmentId === "register") {
        sliderRun(fragmentId)
        removeModal();
        registerForm();
        passwordEvents();
        registerEvents();
    }
    if (fragmentId === "home") {
        removeModal();
        indexPage();
        UI_handlerEvents();
        homePage();
        slider();
        if (token) {
            init();
        }
    }
    if (fragmentId === "sell-on-shopify") {
        sliderRun(fragmentId)
        removeModal();
        indexPage();
        UI_handlerEvents();
        sellerDom();
        sellerEvents();
        if (token) {
            init();
        }

    }
    if (fragmentId === "seller-central") {
        if (token) {
            sliderRun(fragmentId)
            removeModal();
            let sellerForm = sellerFormHtml();
            sellerCentralDom(sellerForm);
            sellerCentralEvents();
            keepDataOnInput();
        }

    }

    if (fragmentId === "seller-product") {
        if (token) {
            let sellerToken = userStore.authSellerToken();
            if (sellerToken) {
                removeModal();
            } else {
                productModalShow();
            }
            let prodForm = prodFormHtml();
            sellerCentralDom(prodForm);
            imagePreview();
            setsProductData();
            productPageEvents();
        }

    }


}
window.addEventListener('hashchange', navigation);