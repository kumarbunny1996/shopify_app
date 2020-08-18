//login form validation
const { events, showHide, showMsg, removeOverlayLoader } = require("./uiHandler");
const makeRequestToServer = require('../ajax/ajax');
const { loaderDiv } = require("../utils/utils");
const {
    usersDataObj,
    loginToCart,
    loginToCartWithItemId,
    loginToBuyWithBuyBtn,
    loginToOrders,
    loginToAccount,
} = require("./userslogic");
//const { showUserData } = require("./userslogic");

const checkPassword = () => {
    let passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,256}/;
    let myInput = document.getElementById("password");
    let password = myInput.value.match(passwordPattern);
    if (!password) {
        //document.getElementById("correct-content2").style.display = "none";
        document.getElementById("errorMsg2").style.display = "block";

    } else {
        document.getElementById("errorMsg2").style.display = "none";
        //document.getElementById("correct-content2").style.display = "block";
        document.getElementById("login-btn").disabled = false;

    }
    return password;
}

const checkMobileOrEmail = () => {
    let emailPattern = /^([a-zA-Z0-9_\-\.\$]+)@([a-zA-Z0-9_\-\.\$]+)\.([a-zA-Z]{2,5})$/;
    let mobilePattern = /^[0-9]{10}$/;
    let myInput = document.getElementById("user-input").value;
    let userInput = myInput.match(emailPattern) || myInput.match(mobilePattern);
    if (userInput) {
        document.getElementById("errorMsg").style.display = "none";
    } else {
        document.getElementById("errorMsg").style.display = "block";
        document.getElementById("login-btn").disabled = false;
    }
    return userInput;
}

const inputElements = () => {
    //input elements

    let mobile = document.getElementById('user-input').value;
    let email = document.getElementById('user-input').value;
    let password = document.getElementById("password").value;

    const data = {
        mobile,
        email,
        password,
    }
    return data;

}

const getToken = () => {
    let data = inputElements();
    let requestObject = {
        method: 'POST',
        url: '/api/users/login',
        name: undefined,
        value: undefined,
        data: data
    };
    return makeRequestToServer(requestObject)
        .then(successObj => {
            //console.log(successObj);
            if (successObj.logged_in) {
                if (localStorage.getItem('AccessToken')) {
                    localStorage.removeItem('AccessToken');
                }
                localStorage.setItem('AccessToken', JSON.stringify(successObj.token));
                //showUserData();
                return successObj.user;
            }
        })
        .catch(errObj => {
            if (errObj) {
                let msgObject = {
                    message: errObj.message,
                    code: '&#10008',
                    term: 'Failure',
                    value1: 'info-style',
                    value2: 'failure'
                }
                showMsg(msgObject);
            }
        })
        .finally(() => {
            removeOverlayLoader();
        });
}

const loginValidation = () => {
    let password = checkPassword();
    let userInput = checkMobileOrEmail();

    let mobile = document.getElementById('user-input').value;
    let passwordInput = document.getElementById("password").value;
    if (passwordInput === "" || mobile === "") return;

    if (password === null || userInput === null) {
        document.getElementById("login-btn").disabled = true;
    } else {
        document.getElementById("login-btn").disabled = false;
        loaderDiv();
        return getToken()
            .then(user => {
                return user;
            });

    }
}

const redirectToRegister = () => {
    location.hash = "#register";
}
const userData = () => {
    loginValidation()
        .then(user => {
            console.log(user);
            usersDataObj(user);
            userStore.setUsername(user.userObj.username);
            let seller = userStore.getDataValue();
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
            if (itemStorage.getItem("orders") || itemStorage.getItem("orders_2")) {
                return loginToOrders();
            }
            if (itemStorage.getItem("account") || itemStorage.getItem("account_2")) {
                return loginToAccount();
            }
            location.hash = "#home";
            window.scrollTo(0, 0);
        });
}

const loginEvents = () => {
    events('#password', 'keyup', checkPassword);
    events('#user-input', 'keyup', checkMobileOrEmail);
    events('#toggle', 'click', showHide);
    events('#login-btn', 'click', (e) => {
        userData();
    });
    events('#create-btn', 'click', redirectToRegister)
}

module.exports = Object.freeze({ loginEvents, loginValidation });