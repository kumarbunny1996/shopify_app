const jwt = require('jsonwebtoken');
require('dotenv').config();

let accessSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;

const generateAuthToken = (payload = null, options = {}) => {
    let token = jwt.sign(payload, accessSecretKey, options);
    return `@ShopifyApp ${token}`;

}

const verifyToken = (token = undefined, options = {}) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, accessSecretKey, options, (err, data) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(data);
                console.log(data);
            }
        });
    });

}

module.exports = Object.freeze({
    generateAuthToken,
    verifyToken
});