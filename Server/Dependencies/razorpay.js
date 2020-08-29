const Razorpay = require("razorpay");
const shortId = require("shortid");
require('dotenv').config();


//create new razorpay account with keys
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

//create orders from razorpay
const orders = async(data) => {
    let { price, total_items, shipping_cost } = data;
    let price2 = price.replace(/,/g, "");
    let amountValue = Number(price2) * 100;
    let totalItems = Number(total_items);
    let shippingCost = Number(shipping_cost) * 100;
    let amount = amountValue + shippingCost;
    let payment_capture = 1; //automatically captures the payment
    let currency = 'INR';
    let receipt = shortId.generate(); //generates the unique id;
    let notes = {
        "totalItems": totalItems,
        "shippingCost": shippingCost,
    };
    let options = {
        amount,
        currency,
        receipt,
        payment_capture,
        notes
    }
    try {
        const response = await razorpay.orders.create(options);
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return Promise.reject({ msg: 'There is problem in creating your orders, please try again' });
    }
}

module.exports = {
    orders,
}