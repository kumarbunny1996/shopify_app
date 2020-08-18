const express = require('express');
const crypto = require("crypto");
const router = express.Router();
const authenticateToken = require("../Middlewares/authenticate");
const { getProfile, saveUser, updateDb } = require("../Utils/dbUtils.js");

//generate signature
const generateSignature = (data) => {
    const secret = "g1D69PjcGuKkKHvO9FqQ7DTi";
    let { razorpay_payment_id, razorpay_order_id, razorpay_signature } = data;
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    //used to hash the string
    const generate_signature = crypto
        .createHmac("sha256", secret)
        .update(body.toString())
        .digest("hex");

    console.log(generate_signature, razorpay_signature);
    return generate_signature;
}

//time convertor
const timeConvertor = (timestamp) => {
    let UNIX_timestamp = timestamp;
    let dateObj = new Date(UNIX_timestamp * 1000);
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let year = dateObj.getFullYear();
    let month = months[dateObj.getMonth()];
    let date = dateObj.getDate();
    let day = days[dateObj.getDay()];
    let time = `${day} ${date}, ${month} ${year}`;
    return time;

}
const paymentVerification = async(userId, data) => {
    console.log(data);
    let query = {
        _id: userId,
    };
    console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({
            message: "No user available",
        });
    }
    let user_id = {
        _id: user._id
    }
    let orders = user.orders;
    let cart = user.cart;
    let shipping_address = user.address;
    let { razorpay_payment_id, razorpay_order_id, razorpay_signature, name, email, contact, amount, shippingCost, totalItems, created_at } = data;
    let generate_signature = generateSignature(data);
    if (generate_signature === razorpay_signature) {
        let time = timeConvertor(created_at);
        console.log(time);
        let items = cart.filter(item => item.status === 'checked');

        let orderObj = {
            order_id: razorpay_order_id,
            payer_id: razorpay_payment_id,
            name: name,
            email: email,
            contact: contact,
            amount: amount,
            shippingCost: shippingCost,
            oty: totalItems,
            shipping_address: shipping_address,
            product: items,
            order_placed: time,
        }
        orders.unshift(orderObj);
        return updateDb(user_id, {
                orders,
            })
            .catch(err => Promise.reject(err));
    }
}

//final process
const orderSucceed = async(req, res) => {
        let {
            userId
        } = req;
        let data = req.body;
        paymentVerification(userId, data)
            .then(user => {
                let orders = user.orders;
                let resObj = orders.find(item => item.order_id == data.razorpay_order_id);
                res.status(200).send({
                    resObj,
                    msg: "your payment has been successfully done"
                });
            })
            .catch(err => {
                console.log(err);
                let errObj = err.message ? err : {
                    code: 0,
                    message: 'your payment process has been failed',
                }
                res.status(400).send(errObj);
            });
    }
    //cash on delivery request

const cashOnDeliverLogic = async(userId, data) => {
    let query = {
        _id: userId,
    };
    console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({
            message: "No user available",
        });
    }
    let user_id = {
        _id: user._id
    }
    let orders = user.orders;
    let cart = user.cart;
    let shipping_address = user.address;
    let {
        order_id,
        name,
        email,
        contact,
        amount,
        shippingCost,
        totalItems,
        created_at
    } = data;
    let time = timeConvertor(created_at);
    console.log(time);
    let items = cart.filter(item => item.status === 'checked');

    let orderObj = {
        order_id,
        name: name,
        email: email,
        contact: contact,
        amount: amount,
        shippingCost: shippingCost,
        oty: totalItems,
        shipping_address: shipping_address,
        product: items,
        order_placed: time,
    }
    orders.unshift(orderObj);
    return updateDb(user_id, {
            orders,
        })
        .catch(err => Promise.reject(err));
}


const deliveryRequest = async(req, res) => {
    let {
        userId
    } = req;
    let data = req.body;
    cashOnDeliverLogic(userId, data)
        .then(user => {
            let orders = user.orders;
            let resObj = orders.find(item => item.order_id == data.order_id);
            res.status(200).send({
                resObj,
                msg: "your order has been successfully saved"
            });
        })
        .catch(err => {
            console.log(err);
            let errObj = err.message ? err : {
                code: 0,
                message: 'your order process has been failed',
            }
            res.status(400).send(errObj);
        });
}

router.post('/verification', authenticateToken, orderSucceed);
router.post('/cash_on_delivery', authenticateToken, deliveryRequest);
module.exports = router;