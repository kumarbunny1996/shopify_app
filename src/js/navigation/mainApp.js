const { indexPage, UI_handlerEvents } = require("../components/index");
const loginForm = require("../components/login");
const registerForm = require("../components/register");
const { passwordEvents, registerEvents } = require('../app/registerLogic');
const { loginEvents } = require("../app/loginLogic");
const { loginAreaAfterSuccess, uiHomeAfterLogin } = require("../utils/utils");
const userStore = require("../utils/userStore");
const { init } = require('../app/userslogic');
const { sellerDom, sellerEvents } = require("../components/seller");
const { homePage, slider, sliderRun } = require("../components/home");
const { sellerCentralDom, prodFormHtml, sellerFormHtml, imagePreview } = require("../components/seller_central");
const { sellerCentralEvents, keepDataOnInput, setsProductData, productModalShow, removeModal, productPageEvents } = require("../app/sellerLogic");
const { mobileCategory, speakerCategory, laptopCategory, electronicsCategory, homeCategory, womenCategory, menCategory, allCategories } = require("../components/category");
const { getsCategoryDataList, eventForShowingProduct } = require("../app/categoryLogic");
const { productDom, productEvents, reloadProductData, reloadCartItems, cartValues, toCart, productPage } = require("../components/product");
const { itemStorage } = require("../utils/userStore");
const { itemsDom, cartDom } = require("../components/cart");
const { setCartValues, checksCartItems, totalCartValues, cartLogicEvents } = require("../app/cartLogic");


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
        uiHomeAfterLogin();
        if (token) {
            init();
            cartValues();
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
            cartValues();
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
    if (fragmentId === "categories") {
        sliderRun(fragmentId);
        allCategories();
    }

    if (fragmentId === "mobiles") {
        sliderRun(fragmentId);
        mobileCategory();
        getsCategoryDataList("Mobiles", "mobileData");
        eventForShowingProduct("#mobileData");
    }

    if (fragmentId === "speakers") {
        sliderRun(fragmentId);
        speakerCategory();
        getsCategoryDataList("Speakers", "speakerData");
        eventForShowingProduct("#speakerData");
    }
    if (fragmentId === "laptops") {
        sliderRun(fragmentId);
        laptopCategory();
        getsCategoryDataList("Laptops", "laptopData");
        eventForShowingProduct("#laptopData");
    }
    if (fragmentId === "electronics") {
        sliderRun(fragmentId);
        electronicsCategory();
        getsCategoryDataList("Electronics", "electronicsData");
        eventForShowingProduct("#electronicsData");
    }
    if (fragmentId === "home-appliances") {
        sliderRun(fragmentId);
        homeCategory();
        getsCategoryDataList("Home-appliances", "homeData");
        eventForShowingProduct("#homeData");
    }
    if (fragmentId === "women") {
        sliderRun(fragmentId);
        womenCategory();
        getsCategoryDataList("Women", "womenData");
        eventForShowingProduct("#womenData");
    }
    if (fragmentId === "men") {
        sliderRun(fragmentId);
        menCategory();
        getsCategoryDataList("Men", "menData");
        eventForShowingProduct("#menData");
    }
    if (itemStorage.getItem('product')) {
        let product = itemStorage.getItem("product");
        let item = product["product"];
        let category = item.product.category;
        let id = item.product._id;
        if (fragmentId === `${category}_${id}`) {
            sliderRun(fragmentId);
            productDom(item);
            productEvents();
            if (token) {
                checksCartItems(id);
            }
        }

    }
    if (fragmentId === "shopify-cart") {
        if (!token) {
            location.hash = "#login";
        }
        if (token) {
            indexPage();
            UI_handlerEvents();
            init();
            sliderRun(fragmentId);
            toCart();
            //cartLogicEvents();
        }
    }
    //sets the product data 
    productPage();
}
window.addEventListener('hashchange', navigation);