const { moneyFormatter } = require("../app/cartLogic");
const { itemStorage } = require("../utils/userStore");
const { events, showModel, removeOverlayLoader } = require('../app/uiHandler');
const userStore = require("../utils/userStore");
const { removeLoader, loaderDiv } = require("../utils/utils");
const makeRequestToServer = require("../ajax/ajax");
const { paymentDom, createRazorpay, cashOnDeliveryRequest } = require("../app/payment");
require("../../css/buy.css");

const buyOptionComponent = (address = {}) => {
    const buyCont = document.getElementById("content");
    document.title = '@shopify Payment';
    buyCont.innerHTML = `
        <div class="buy-section" id="buy-section">
            <div class="abs-block">
                <div class="order-delivery">
                    <h3>Delivery address:</h3>
                    <p>${address.name}</p>
                    <p>${address.street}</p>
                    <p>${address.township}</p>
                    <p>${address.state} - <span>${address.pin_code}</span></p>
                </div>
                <div class="buy-head">
                    <h3 id="total"></h3>
                    <div class="share-it">
                        <h3>Share it on:</h3>
                        <div class="icons"><i class="fa fa-facebook" aria-hidden="true"></i></div>
                        <div class="icons"><i class="fa fa-whatsapp" aria-hidden="true"></i></div>
                        <div class="icons"><i class="fa fa-instagram" aria-hidden="true"></i></div>
                    </div>
                    <div class="contact-us">
                        <h3>Contact us:</h3>
                        <h4><i class="fa fa-envelope" aria-hidden="true"></i> kumarbunny3110@gmail.com</h4>
                        <h5><i class="fa fa-phone" aria-hidden="true"></i> +91 9150748808</h5>
                    </div>
                    <div class="terms">
                        <h3>Terms and conditions:</h3>
                        <input type="checkbox" id="checkBox">
                        <label for="checkBox">By agreeing our terms and conditions with shopify payment gateway</label>
                    </div>
                    <div class="btn">
                        <button id="order-btn" disabled>Place your order</button>
                    </div>
                </div>
            </div>
            <h2><span>@</span>Shopify.in</h2>
            <div class="order-top">
                <h3>Review Your Order</h3>
                <h5>Price</h5>
            </div>
            <div class="order-items" id="order-items">
            </div>
            <div class="end-order">
                <span id="end-order"></span>
            </div>
        </div>
    `;
}

const orderItemsDom = (cart = [], address = {}) => {
    let orderItems = document.getElementById("order-items");
    let result = "";
    let orderedItems = cart.filter(item => item.status === "checked");
    orderedItems.forEach(item => {
        result += `
            <div class="order-items-block">
                <img src="${item.image}" alt="product-img">
                <div class="order-details">
                    <h2>${item.item_name}</h2>
                    <h3>${item.brand_name}</h3>
                    <h4>Price: <i>&#8377;</i> ${item.price}</h4>
                    <h4 id="ship" data-value="${address.shipping_cost}">Shipping cost: Free delivery <i>&#8377;</i> ${address.shipping_cost}</h4>
                    <h4>Delivery time: <em id="delivery-time"></em></h4>
                </div>
                <div class="price">
                    <h6><i>&#8377;</i>${item.price}</h6>
                </div>
            </div>
            <div class="line"></div>
        `;
    });
    orderItems.innerHTML = result;
}

//sets the order values

const setsOrderValues = (cart = []) => {
    let totalPrice = 0;
    let totalItem = 0;
    let orderedItems = cart.filter(item => item.status === "checked");
    orderedItems.filter(item => {
        let price = item.price.replace(/,/g, "");
        totalPrice += Number(price * item.amount);
        totalItem += Number(item.amount);
    });
    let price = moneyFormatter(totalPrice);
    let start = document.getElementById('total');
    let end = document.getElementById('end-order');
    if (price == 0 || totalItem === 0) {
        start.innerHTML = `Subtotal(${totalItem} items):<span>&#8377;</span>${price}`;
        end.innerHTML = `Subtotal(${totalItem} items):<i>&#8377;</i>${price}`;
        start.setAttribute('data-price', price.toString());
        start.setAttribute('data-items', totalItem.toString());
        return;
    }
    if (totalItem === 1) {
        start.innerHTML = `Subtotal(${totalItem} item):<span>&#8377;</span>${price}`;
        end.innerHTML = `Subtotal(${totalItem} item):<i>&#8377;</i>${price}`;
        start.setAttribute('data-price', price.toString());
        start.setAttribute('data-items', totalItem.toString());
        return;
    }
    if (totalItem > 1) {
        start.innerHTML = `Subtotal(${totalItem} items):<span>&#8377;</span>${price}`;
        end.innerHTML = `Subtotal(${totalItem} items):<i>&#8377;</i>${price}`;
        start.setAttribute('data-price', price.toString());
        start.setAttribute('data-items', totalItem.toString());
        return;
    }

}

//sets status of delivery time;
const setsStatusOfDeliveryTime = () => {
    let el2 = document.getElementById('delivery-time');
    let el = document.getElementById('ship');
    let value = el.dataset.value;
    if (value == "40.00") {
        el2.innerText = "One day delivery"
    }
    if (value == "29.00") {
        el2.innerText = 'within 1-3 days';
    }
    if (value == '19.00') {
        el2.innerText = 'within 3-5 days';
    }
    if (value == '0.00') {
        el2.innerText = 'within 7 days';
    }
}

const checkInputStatus = () => {
        let checkEl = document.getElementById('checkBox');
        let check = checkEl.checked;
        if (check === true) {
            document.getElementById('order-btn').disabled = false;
        } else {
            document.getElementById('order-btn').disabled = true;
        }
    }
    //order request to server
const orderRequest = () => {
    let token = userStore.authToken();
    let el = document.getElementById('ship');
    let start = document.getElementById('total');
    let price = start.dataset.price;
    //console.log(price);
    let total_items = start.dataset.items;
    let shipping_cost = el.dataset.value;
    let data = {
        price,
        total_items,
        shipping_cost,
    }
    let requestObject = {
        method: 'POST',
        url: `/api/users/order`,
        name: 'Authorization',
        value: token,
        data: data
    }
    window.scrollTo(0, 0);
    loaderDiv();
    makeRequestToServer(requestObject)
        .then(resObj => {
            //console.log(resObj);
            paymentDetails(resObj);
        })
        .catch(err => console.log(err))
        .finally(() => removeOverlayLoader());
}


//order object
const setOrderObject = (resObj, e) => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let contact = document.getElementById("phone").value;
    let totalItems = resObj.notes.totalItems;
    let shippingCost = resObj.notes.shippingCost;
    let currency = resObj.currency;
    let id = resObj.id;
    if (name === "" || email === "" || contact === "") {
        e.target.disabled = true;
        return false;
    }
    e.target.disabled = false;
    let orderObj = {
        id,
        amount: resObj.amount,
        currency,
        name,
        email,
        contact,
        shippingCost,
        totalItems,
        created_at: resObj.created_at,
    };
    return orderObj;
}

//sets the default status
let isNameDisabled = false;
let isEmailDisabled = false;
let isPhoneDisabled = false;

//checks the button status
const checkPayButtonStatus = (button, button2) => {
        if (isNameDisabled === true || isEmailDisabled === true || isPhoneDisabled === true) {
            document.getElementById(button).disabled = true;
            document.getElementById(button2).disabled = true;
        } else {
            document.getElementById(button).disabled = false;
            document.getElementById(button2).disabled = false;
        }
    }
    //checks name value
const checkNamePayInput = (e) => {
        let name = e.target.value;
        let msg = document.getElementById('pay-err-name');
        let button = "rzp-button1";
        let button2 = "cash-on"
        let re = /^([a-zA-Z\s]){1,256}$/;
        if (!re.exec(name)) {
            name = "";
            msg.classList.add("err-style");
            msg.style.display = 'block';
            msg.innerText = 'Enter valid name';
            e.target.style.border = "3px solid rgb(255, 130, 130)";
            isNameDisabled = true;
            checkPayButtonStatus(button, button2);
        } else {
            msg.style.display = "none";
            msg.classList.remove("err-style");
            e.target.style.border = "3px solid rgb(82, 175, 82)";
            isNameDisabled = false;
            checkPayButtonStatus(button, button2)
        }
    }
    //email validation
const checkEmailPayInput = (e) => {
    let email = e.target.value;
    let msg = document.getElementById('pay-err-email');
    let button = "rzp-button1";
    let button2 = "cash-on"
    let re = /^([a-zA-Z0-9_\-\.\$]+)@([a-zA-Z0-9_\-\.\$]+)\.([a-zA-Z]{2,5})$/;
    if (!re.exec(email)) {
        email = "";
        msg.classList.add("err-style");
        msg.style.display = 'block';
        msg.innerText = 'Enter valid email address';
        e.target.style.border = "3px solid rgb(255, 130, 130)";
        isEmailDisabled = true;
        checkPayButtonStatus(button, button2);
    } else {
        msg.style.display = "none";
        msg.classList.remove("err-style");
        e.target.style.border = "3px solid rgb(82, 175, 82)";
        isEmailDisabled = false;
        checkPayButtonStatus(button, button2)
    }
}

//check phone number
const checkPhonePayInput = (e) => {
    let phone = e.target.value;
    let msg = document.getElementById('pay-err-phone');
    let button = "rzp-button1";
    let button2 = "cash-on"
    let re = /^[0-9]{10}$/;
    if (!re.exec(phone)) {
        phone = "";
        msg.classList.add("err-style");
        msg.style.display = 'block';
        msg.innerText = 'Enter valid mobile no';
        e.target.style.border = "3px solid rgb(255, 130, 130)";
        isPhoneDisabled = true;
        checkPayButtonStatus(button, button2);
    } else {
        msg.style.display = "none";
        msg.classList.remove("err-style");
        e.target.style.border = "3px solid rgb(82, 175, 82)";
        isPhoneDisabled = false;
        checkPayButtonStatus(button, button2)
    }
}

//payment Input events

const paymentInputEvents = () => {
    events("#name", 'keyup', (e) => {
        checkNamePayInput(e);
    });
    events("#email", 'keyup', (e) => {
        checkEmailPayInput(e);
    });
    events("#phone", 'keyup', (e) => {
        checkPhonePayInput(e);
    });
}

// payment details

const paymentDetails = (resObj) => {
    let priceValue = (resObj.amount - Number(resObj.notes.shippingCost)) / 100;
    let price = moneyFormatter(priceValue);
    let shipping = Number(resObj.notes.shippingCost) / 100;
    let totalItems = resObj.notes.totalItems;
    let shippingCost = moneyFormatter(shipping);
    let totalAmount = moneyFormatter(resObj.amount / 100);

    let config = {
        price,
        shippingCost,
        totalAmount,
        totalItems,
    }
    let valueDom = paymentDom(config);
    showModel(valueDom);
    //payment input events
    paymentInputEvents();
    //online pay request
    events('#rzp-button1', 'click', (e) => {
        let orderObj = setOrderObject(resObj, e);
        if (orderObj === false) return;
        createRazorpay(orderObj);
        e.preventDefault();
    });
    //cash on delivery 
    events("#cash-on", 'click', (e) => {
        let orderObj = setOrderObject(resObj, e);
        if (orderObj === false) return;
        cashOnDeliveryRequest(orderObj);
    });

}
const orderPage = () => {
    let cartItems = itemStorage.getItem("cart");
    let cart = cartItems['cart'];
    let addressObj = itemStorage.getItem("addressObject");
    let address = addressObj["addressObject"];
    buyOptionComponent(address);
    orderItemsDom(cart, address);
    setsOrderValues(cart);
    setsStatusOfDeliveryTime();
    events('#checkBox', 'click', (e) => checkInputStatus());
    events('#order-btn', 'click', (e) => orderRequest());
}

module.exports = {
    orderPage,
}