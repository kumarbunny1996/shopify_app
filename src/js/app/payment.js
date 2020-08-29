const userStore = require("../utils/userStore");
const makeRequestToServer = require("../ajax/ajax");
const { loaderDiv } = require("../utils/utils");
const { removeOverlayLoader } = require("./uiHandler");
const { removeModal } = require("./sellerLogic");
const { itemStorage } = require("../utils/userStore");
//const { key } = require('../../../env.config');
require("../../css/payment.css");

//payment dom

const paymentDom = (config = {}) => {
        return `
        <div class="payment" id="payment">
            <h2>Payment details</h2>
            <h3>Order summary:</h3>
            <div class="summary">
                <div class="title-cont">
                    <h4>Subtotal(${config.totalItems} items):</h4>
                    <h4>Shipping cost:</h4>
                    <h4>Total amount:</h4>
                </div>
                <div class="values">
                    <em><span>&#8377;</span> ${config.price}</em>
                    <em><span>&#8377;</span> ${config.shippingCost}</em>
                    <em><span>&#8377;</span> ${config.totalAmount}</em>
                </div>
            </div>
            <div class="input-order">
                <label for="name">Name:</label>
                <input type="text" id="name" class="input" autocomplete="off">
            </div>
            <p id="pay-err-name"></p>
            <div class="input-order">
                <label for="email">Email:</label>
                <input type="text" id="email" class="input" autocomplete="off">
            </div>
            <p id="pay-err-email"></p>
            <div class="input-order">
                <label for="phone">Mobile no:</label>
                <input type="text" id="phone" class="input" autocomplete="off">
            </div>
            <p id="pay-err-phone"></p>
            <p id="lead-pay"><em>All Fields are required</em></p>
            <div class="btn">
                <button id="rzp-button1" class="razorpay-payment-button">Pay <span>&#8377;</span> ${config.totalAmount}</button>
            </div>
            <p>Or</p>
            <div class="btn">
                <button id="cash-on">Cash on delivery</button>
            </div>
        </div>
    `;
    }
    //verify the response obj from razorpay
const verificationToServer = (response, config) => {
    let token = userStore.authToken();
    let data = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        name: config.name,
        email: config.email,
        contact: config.contact,
        created_at: config.created_at,
        amount: config.amount,
        shippingCost: config.shippingCost,
        totalItems: config.totalItems,
    }
    let requestObject = {
        method: 'POST',
        url: `/api/payments/verification`,
        name: 'Authorization',
        value: token,
        data: data
    }
    loaderDiv();
    makeRequestToServer(requestObject)
        .then(obj => {
            //console.log(obj);
            let ordered_item = obj.resObj;
            removeModal();
            if (itemStorage.getItem('orders')) {
                let orders = itemStorage.getItem('orders');
                let items = orders['orders'];
                items.unshift(ordered_item);
            }
            location.hash = "#your-orders";
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => removeOverlayLoader());
}

//request to server for cash on delivery
const cashOnDeliveryRequest = (config = {}) => {
    let token = userStore.authToken();
    let data = {
        order_id: config.id,
        name: config.name,
        email: config.email,
        contact: config.contact,
        created_at: config.created_at,
        amount: config.amount,
        shippingCost: config.shippingCost,
        totalItems: config.totalItems,
    }
    let requestObject = {
        method: 'POST',
        url: `/api/payments/cash_on_delivery`,
        name: 'Authorization',
        value: token,
        data: data
    }
    loaderDiv();
    makeRequestToServer(requestObject)
        .then(obj => {
            // console.log(obj);
            let ordered_item = obj.resObj;
            removeModal();
            if (itemStorage.getItem('orders')) {
                let orders = itemStorage.getItem('orders');
                let items = orders['orders'];
                items.unshift(ordered_item);
            }
            location.hash = "#your-orders";
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => removeOverlayLoader());
}

//load checkOut js of razorPay
const loadSource = (src) => {
    return new Promise(resolve => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    });
}

//create rzpl payment
const createRazorpay = async(config = {}) => {
    console.log(config);
    loaderDiv();
    loadSource("https://checkout.razorpay.com/v1/checkout.js")
        .then(res => {
            if (!res) {
                alert('Razorpay sdk failed');
                return;
            }
            let options = {
                "key": process.env.RAZORPAY_KEY_ID,
                "amount": config.amount.toString(),
                "currency": config.currency,
                "name": "Shopify store",
                "description": "Purchase your products with secure payments ",
                "image": "",
                "order_id": config.id,
                "handler": function(response) {
                    //console.log(response);
                    verificationToServer(response, config);
                },
                "prefill": {
                    "name": config.name,
                    "email": config.email,
                    "contact": config.contact,
                },
                "theme": {
                    "color": "#528FF0"
                }
            };
            let paymentObject = new Razorpay(options);
            paymentObject.open();
        })
        .catch(err => console.log(err))
        .finally(() => removeOverlayLoader());
}


module.exports = {
    paymentDom,
    createRazorpay,
    cashOnDeliveryRequest,
}