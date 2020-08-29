const makeRequestToServer = require('../ajax/ajax');
const userStore = require('../utils/userStore');
const { displayUserProfile, toolTipBox, uiHomeAfterLogin, loaderDiv } = require('../utils/utils');
const { events, logOut, showMsg, removeOverlayLoader } = require('./uiHandler');
const { productModalShow, removeModal } = require("../app/sellerLogic");
const { itemStorage } = require('../utils/userStore');
const { reloadCartItems, checkTheCartIfItemExists, checkTheCartIfItemExistsBuyBtn } = require("../components/product");
const { loginValidation } = require('./loginLogic');




let init = () => {
    displayUserProfile();
    toolTipBox();
    events('#logOut', 'click', logOut);
    events('#link4', 'click', logOut);
}
const loginToCart = () => {
    let cart = itemStorage.getItem("value");
    let value = cart["value"];
    //console.log(value);
    itemStorage.removeItem("value");
    location.hash = "#shopify-cart";
    return;
}

const loginToOrders = () => {
    if (itemStorage.getItem("orders")) {
        let cart = itemStorage.getItem("orders");
        let value = cart["orders"];
        //console.log(value);
        itemStorage.removeItem("orders");
        location.hash = "#your-orders";
        return;
    }
    if (itemStorage.getItem("orders_2")) {
        let cart = itemStorage.getItem("orders_2");
        let value = cart["orders_2"];
        //console.log(value);
        itemStorage.removeItem("orders_2");
        location.hash = "#your-orders";
        return;
    }
}
const loginToAccount = () => {
    if (itemStorage.getItem("account")) {
        let cart = itemStorage.getItem("account");
        let value = cart["account"];
        //console.log(value);
        itemStorage.removeItem("account");
        location.hash = "#your-account";
        return;
    }
    if (itemStorage.getItem("account_2")) {
        let cart = itemStorage.getItem("account_2");
        let value = cart["account_2"];
        //console.log(value);
        itemStorage.removeItem("account_2");
        location.hash = "#your-account";
        return;
    }
}

const loginToCartWithItemId = () => {
    let id = itemStorage.getItem("id");
    let item_id = id["id"];
    //console.log(item_id);
    itemStorage.removeItem("id");
    itemStorage.removeItem("cart-btn");
    checkTheCartIfItemExists(item_id);
    return;
}
const loginToBuyWithBuyBtn = () => {
    let id = itemStorage.getItem("id");
    let item_id = id["id"];
    //console.log(item_id);
    itemStorage.removeItem("id");
    itemStorage.removeItem("buy-btn");
    checkTheCartIfItemExistsBuyBtn(item_id);
    return;
}

/*let loginUserData = (requestObj = {}) => {
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
               return loginToCart();
            }
            if (itemStorage.getItem("cart-btn")) {
                return loginToCartWithItemId();
            }
            if (itemStorage.getItem("buy-btn")) {
               return loginToBuyWithBuyBtn();
            }
            if (itemStorage.getItem("orders") || itemStorage.getItem("orders_2")){
             return loginToOrders();
            }
             if (itemStorage.getItem("account") || itemStorage.getItem("account_2")) {
                return loginToAccount();
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
        })
        .finally(() => removeOverlayLoader());
}*/

let getUserProfileReload = (requestObj = {}) => {
    loaderDiv();
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
        })
        .finally(() => removeOverlayLoader());
}


/*const showUserData = () => {
    loaderDiv();
    let token = userStore.authToken();
    let requestObject = {
        method: 'GET',
        url: '/api/users/profile',
        name: 'Authorization',
        value: token,
        data: null
    }
    loginUserData(requestObject);
}*/

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

//gets the users data after login
const usersDataObj = (cartObj) => {
    let cartItems = cartObj.cart;
    let savedItems = cartObj.saved_items;
    let address = cartObj.delivery_address;
    let singleAddressObj = cartObj.address;
    let orders = cartObj.orders;
    let cancelledOrders = cartObj.cancelledOrders;
    let user = {
        username: cartObj.username,
        mobile: cartObj.mobile,
        email: cartObj.email,
    };
    itemStorage.setItem("user", user);
    itemStorage.setItem("cart", cartItems);
    itemStorage.setItem("savedItems", savedItems);
    itemStorage.setItem("address", address);
    itemStorage.setItem("orders", orders);
    itemStorage.setItem("cancel_orders", cancelledOrders);
    if (itemStorage.getItem("addressObject")) {
        itemStorage.removeItem("addressObject");
        itemStorage.setItem("addressObject", singleAddressObj);
    } else {
        itemStorage.setItem("addressObject", singleAddressObj);
    }

}



module.exports = {
    showReloadData,
    init,
    usersDataObj,
    loginToCart,
    loginToCartWithItemId,
    loginToBuyWithBuyBtn,
    loginToOrders,
    loginToAccount,
}