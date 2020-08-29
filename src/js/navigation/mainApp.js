const { indexPage, UI_handlerEvents, selectedAll } = require("../components/index");
const loginForm = require("../components/login");
const registerForm = require("../components/register");
const { passwordEvents, registerEvents } = require('../app/registerLogic');
const { loginEvents } = require("../app/loginLogic");
const { loginAreaAfterSuccess, uiHomeAfterLogin } = require("../utils/utils");
const userStore = require("../utils/userStore");
const { init } = require('../app/userslogic');
const { sellerDom, sellerEvents } = require("../components/seller");
const { homePage, slider, sliderRun, homeCategoryEvents, homeLogicEvents } = require("../components/home");
const { sellerCentralDom, prodFormHtml, sellerFormHtml, imagePreview } = require("../components/seller_central");
const { sellerCentralEvents, keepDataOnInput, setsProductData, productModalShow, removeModal, productPageEvents } = require("../app/sellerLogic");
const { mobileCategory, speakerCategory, laptopCategory, electronicsCategory, homeCategory, womenCategory, menCategory, allCategories } = require("../components/category");
const { getsCategoryDataList, eventForShowingProduct, eventsForSingleCategory } = require("../app/categoryLogic");
const { productDom, productEvents, cartValues, toCart, productPage } = require("../components/product");
const { itemStorage } = require("../utils/userStore");
const { checksCartItems } = require("../app/cartLogic");
const { addressUI } = require("../components/address");
const { orderPage } = require("../components/buy_comp");
const { orderPageUI, cancelOrdersPageUI } = require("../components/orders");
const { accountUI, editAccountUI } = require("../components/account");
const { removeOverlayNav } = require("../app/uiHandler");


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
        sliderRun(fragmentId);
        removeModal();
        registerForm();
        passwordEvents();
        registerEvents();
    }
    if (fragmentId === "home") {
        removeModal();
        indexPage();
        selectedAll();
        UI_handlerEvents();
        homePage();
        slider();
        homeCategoryEvents();
        homeLogicEvents();
        if (token) {
            init();
            uiHomeAfterLogin();
            cartValues();
        }
    }
    if (fragmentId === "sell-on-shopify") {
        sliderRun(fragmentId)
        removeModal();
        indexPage();
        selectedAll();
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
        removeModal();
        removeOverlayNav();
        allCategories();
        eventsForSingleCategory();
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
            selectedAll();
            UI_handlerEvents();
            init();
            sliderRun(fragmentId);
            toCart();
            //cartLogicEvents();
        }
    }
    if (fragmentId === "delivery-address") {
        sliderRun(fragmentId)
        if (!token) {
            location.hash = "#login";
        }
        if (token) {
            indexPage();
            selectedAll();
            UI_handlerEvents();
            init();
            cartValues();
            addressUI();
        }

    }

    //sets payment page
    if (fragmentId === "payment-gateway") {
        sliderRun(fragmentId)
        if (!token) {
            location.hash = "#login";
        }
        if (token) {
            orderPage();
        }
    }

    //sets the order items page
    if (fragmentId === "your-orders") {
        sliderRun(fragmentId);
        if (!token) {
            location.hash = "#login";
            return;
        }
        if (token) {
            removeModal();
            indexPage();
            selectedAll();
            UI_handlerEvents();
            init();
            cartValues();
            orderPageUI();
            cancelOrdersPageUI();
        }
    }

    if (fragmentId === "your-account") {
        sliderRun(fragmentId);
        if (!token) {
            location.hash = "#login";
            return;
        }
        removeModal();
        removeOverlayNav();
        cartValues();
        accountUI();
    }

    if (fragmentId === "edit-account") {
        sliderRun(fragmentId);
        if (!token) {
            location.hash = "#login";
            return;
        }
        cartValues();
        editAccountUI();
    }
    //sets the product data 
    productPage();
}
window.addEventListener('hashchange', navigation);