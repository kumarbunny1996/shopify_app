const makeRequestToServer = require('../ajax/ajax');
const userStore = require('../utils/userStore');
const { displayUserProfile, toolTipBox, uiHomeAfterLogin } = require('../utils/utils');
const { events, logOut, showMsg } = require('./uiHandler');
const { productModalShow, removeModal } = require("../app/sellerLogic");
const { itemStorage } = require('../utils/userStore');
const { reloadCartItems, saveProductToCart, cartValues, toCart, checkTheCartIfItemExists } = require("../components/product");
const { totalCartValues } = require("./cartLogic");
const { indexPage, UI_handlerEvents } = require('../components');




let init = () => {
    displayUserProfile();
    toolTipBox();
    events('#logOut', 'click', logOut);
    events('#link4', 'click', logOut);
}


let loginUserData = (requestObj = {}) => {
    makeRequestToServer(requestObj)
        .then(userObj => {
            userStore.setUsername(userObj.user.username);
            let seller = userStore.getDataValue();
            //console.log(seller);
            if (seller) {
                seller = "";
                userStore.setDataValue(seller);
                return location.hash = "#seller-central";
            }
            if (itemStorage.getItem("value")) {
                let cart = itemStorage.getItem("value");
                let value = cart["value"];
                console.log(value);
                itemStorage.removeItem("value");
                location.hash = "#shopify-cart";
                return;
            }
            if (itemStorage.getItem("id")) {
                let id = itemStorage.getItem("id");
                let item_id = id["id"];
                console.log(item_id);
                itemStorage.removeItem("id");
                checkTheCartIfItemExists(item_id);
                return;
            }
            location.hash = "#home";
            window.scrollTo(0, 0);
        })
        .catch(err => {
            //console.log(err);
            let msgObject = {
                message: err.message,
                code: '&#9888',
                term: 'Warning',
                value1: 'info-style',
                value2: 'warning'
            }
            showMsg(msgObject);
        });
}

let getUserProfileReload = (requestObj = {}) => {
    makeRequestToServer(requestObj)
        .then(userObj => {
            userStore.setUsername(userObj.user.username);
            if (document.getElementById('product-form')) {
                let sellerToken = userStore.authSellerToken();
                if (sellerToken) {
                    return removeModal();
                }
                productModalShow();
            };
            if (document.getElementById("sp-home-layout")) {
                uiHomeAfterLogin();
            }

            if (document.getElementById('index-content')) {
                return init();
            };
        })
        .catch(err => {
            //console.log(err);
            let msgObject = {
                message: err.message,
                code: '&#9888',
                term: 'Warning',
                value1: 'info-style',
                value2: 'warning'
            }
            showMsg(msgObject);
        });
}


const showUserData = () => {
    let token = userStore.authToken();
    let requestObject = {
        method: 'GET',
        url: '/api/users/profile',
        name: 'Authorization',
        value: token,
        data: null
    }
    loginUserData(requestObject);
}

const showReloadData = () => {
    let token = userStore.authToken();
    let requestObject = {
        method: 'GET',
        url: '/api/users/profile',
        name: 'Authorization',
        value: token,
        data: null
    }
    getUserProfileReload(requestObject);
}




module.exports = { showUserData, showReloadData, init };