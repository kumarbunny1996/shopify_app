const { findUserByKeys } = require('../Utils/dbUtils');
const { comparePasswords } = require('../Dependencies/encrypt');
const { generateAuthToken } = require('../Dependencies/authToken');


const getUserLogin = async({ mobile = undefined, email = undefined, password }) => {
    let query = [{ mobile }, { email }];
    let user = await findUserByKeys(query);
    console.log(user);
    if (user == null) {
        return Promise.reject({ message: 'No User Found ' });
    }

    let correctPassword = comparePasswords(password, user.password);

    if (correctPassword === false) {
        return Promise.reject({ message: 'Incorrect Password' })
    } else {
        return userLogin(user);
    }
}

let userLogin = (userData) => {
    return getTokenOfUser(userData);
}

let getTokenOfUser = (user) => {
    let {
        _id,
        username,
        mobile,
        email
    } = user;
    let userObj = {
        _id,
        username,
        mobile,
        email
    };
    let cart = user.cart;
    let savedItems = user.saved_items;
    let address = user.delivery_address;
    let addressObj = user.address;
    let orders = user.orders;
    let cancelledOrders = user.cancelledOrders
    let token = generateAuthToken(userObj);
    return {
        token,
        cart,
        savedItems,
        address,
        addressObj,
        orders,
        cancelledOrders,
        userObj,
    }

}


module.exports = Object.freeze({ getUserLogin });