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
const { sellerCentralEvents, keepDataOnInput, setsProductData, removeModal, productPageEvents } = require("../app/sellerLogic");
const { mobileCategory, speakerCategory, laptopCategory, electronicsCategory, homeCategory, womenCategory, menCategory, allCategories } = require("../components/category");
const { getsCategoryDataList, eventForShowingProduct } = require("../app/categoryLogic");
const { reloadCart, productPage } = require("../components/product");



let token = userStore.authToken();

//calls the common function to all pages when reloaded

const reloadPages = () => {
    indexPage();
    removeModal();
    UI_handlerEvents();
    if (token) {
        showReloadData();
        reloadCart();
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

    if (location.hash === "#categories") {
        sliderRun();
        allCategories();
    }

    if (location.hash === "#mobiles") {
        sliderRun();
        mobileCategory();
        getsCategoryDataList("Mobiles", "mobileData");
        eventForShowingProduct("#mobileData");
    }
    if (location.hash === "#speakers") {
        sliderRun();
        speakerCategory();
        getsCategoryDataList("Speakers", "speakerData");
        eventForShowingProduct("#speakerData");
    }
    if (location.hash === "#laptops") {
        sliderRun();
        laptopCategory();
        getsCategoryDataList("Laptops", "laptopData");
        eventForShowingProduct("#laptopData");
    }
    if (location.hash === "#electronics") {
        sliderRun();
        electronicsCategory();
        getsCategoryDataList("Electronics", "electronicsData");
        eventForShowingProduct("#electronicsData");
    }
    if (location.hash === "#home-appliances") {
        sliderRun();
        homeCategory();
        getsCategoryDataList("Home-appliances", "homeData");
        eventForShowingProduct("#homeData");
    }
    if (location.hash === "#women") {
        sliderRun();
        womenCategory();
        getsCategoryDataList("Women", "womenData");
        eventForShowingProduct("#womenData");
    }
    if (location.hash === "#men") {
        sliderRun();
        menCategory();
        getsCategoryDataList("Men", "menData");
        eventForShowingProduct("#menData");
    }

    if (location.hash === "#shopify-cart") {
        sliderRun();
        //console.log(location.hash);
    }
    //sets the product page data
    productPage();

}

reloadPages();