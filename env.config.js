require('dotenv').config();

const key = process.env.RAZORPAY_KEY_ID;
module.exports = {
    env: {
        key,
    }
}