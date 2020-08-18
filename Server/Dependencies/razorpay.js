const Razorpay = require("razorpay");
const shortId = require("shortid");


//create new razorpay account with keys
const razorpay = new Razorpay({
    key_id: 'rzp_test_ITCqf9A3ntRB2N',
    key_secret: 'g1D69PjcGuKkKHvO9FqQ7DTi',
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