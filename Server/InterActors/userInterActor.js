const { getProfile, saveUser, updateDb } = require('../Utils/dbUtils.js');
const { comparePasswords } = require('../Dependencies/encrypt');
const { getProduct } = require("../Utils/productDbUtils");


const getUserData = async(user_id) => {
    let query = { _id: user_id };
    //console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({ message: 'No user available' })
    } else {
        return userData(user);

    }
}

let userData = (user) => {
    return getUserInfo(user);
}
let getUserInfo = ({ username, email }) => {
    let userInfo = {
        username,
        email
    }
    return userInfo;
}

const checkPswd = async(userId, password) => {
    let query = {
        _id: userId
    };
    //console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({
            message: 'No user available'
        });
    }
    let correctPassword = comparePasswords(password, user.password);

    if (correctPassword === false) {
        return Promise.reject({
            message: 'Incorrect Password'
        })
    }
}

const saveProductInCart = async(userId, id) => {
    let query = {
        _id: userId
    };
    //console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({
            message: 'No user available'
        });
    }

    if (user) {
        let prodQuery = {
            _id: id
        }
        let user_id = {
            _id: user._id
        }
        let { username, mobile, email, password } = user;
        let userObj = {
            username,
            mobile,
            email,
            password
        };
        let product = await getProduct(prodQuery);
        if (product) {
            let { _id, item_name, brand_name, category, price, shipping_cost } = product;
            let image = product.image.toString();

            let item = { _id, item_name, brand_name, category, price, shipping_cost, image };
            let cartItem = {...item, amount: "1", status: "checked" };
            //save items to cart
            let cart = user.cart;
            let index = cart.findIndex(item => item._id == prodQuery._id);
            if (index == -1) {
                cart.unshift(cartItem);
            }
            //checks the saved cart if any same item exists
            let saved_items = user.saved_items;
            let savedIndex = saved_items.findIndex(item => item._id == prodQuery._id);
            if (savedIndex != -1) {
                saved_items.splice(savedIndex, 1);
            }
            let userObject = {...userObj, cart };
            let userFinalObject = {...userObject, saved_items };
            return updateDb(user_id, userFinalObject)
                .catch(err => Promise.reject(err));
        }
    }
}

const saveProductInSavedItems = async(userId, id) => {
    let query = {
        _id: userId
    };
    //console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({
            message: 'No user available'
        });
    }

    if (user) {
        let prodQuery = {
            _id: id
        }
        let user_id = {
            _id: user._id
        }
        let { username, mobile, email, password } = user;
        let userObj = {
            username,
            mobile,
            email,
            password,

        };
        let product = await getProduct(prodQuery);
        if (product) {
            let { _id, item_name, brand_name, category, price, shipping_cost } = product;
            let image = product.image.toString();

            let item = { _id, item_name, brand_name, category, price, shipping_cost, image };
            let saveItem = {...item, amount: "1" };
            //save item to saved collection
            let saved_items = user.saved_items;
            let index = saved_items.findIndex(item => item._id == prodQuery._id);
            if (index == -1) {
                saved_items.unshift(saveItem);
            }
            //delete if item exists in the cart
            let cart = user.cart;
            let cartIndex = cart.findIndex(item => item._id == prodQuery._id);
            if (cartIndex != -1) {
                cart.splice(cartIndex, 1);
            }
            let userObject = {...userObj, cart };
            let userFinalObject = {...userObject, saved_items };
            return updateDb(user_id, userFinalObject)
                .catch(err => Promise.reject(err));
        }
    }
}

//save item to cart from saved collection

const saveProductToCartFromSavedItems = async(userId, id) => {
    let query = {
        _id: userId
    };
    //console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({
            message: 'No user available'
        });
    }

    if (user) {
        let prodQuery = {
            _id: id
        }
        let user_id = {
            _id: user._id
        }
        let { username, mobile, email, password, cart } = user;
        let userObj = {
            username,
            mobile,
            email,
            password,
        };
        let product = await getProduct(prodQuery);
        if (product) {
            let { _id, item_name, brand_name, category, price, shipping_cost } = product;
            let image = product.image.toString();

            let item = { _id, item_name, brand_name, category, price, shipping_cost, image };
            let cartItem = {...item, amount: "1", status: "checked" };
            //cart to add item
            let cart = user.cart;
            let cartIndex = cart.findIndex(item => item._id == prodQuery._id);
            if (cartIndex == -1) {
                cart.unshift(cartItem);
            }
            //checks the save items
            let saved_items = user.saved_items;
            let index = saved_items.findIndex(item => item._id == prodQuery._id);
            if (index != -1) {
                saved_items.splice(index, 1);
            }
            let userObject = {...userObj, cart };
            let userFinalObject = {...userObject, saved_items };
            return updateDb(user_id, userFinalObject)
                .catch(err => Promise.reject(err));
        }
    }
}

//gets the collections [cart],[saved_items]
const getCartObj = async(userId) => {
    let query = {
        _id: userId
    };
    //console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({
            message: 'No user available'
        });
    }
    if (user) {
        //console.log(user);
        let cart = user.cart;
        let savedItems = user.saved_items;
        return {
            cart,
            savedItems
        }
    }
}

const updateCartQty = async(userId, qty, id) => {
    let query = {
        _id: userId
    };
    //console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({
            message: 'No user available'
        });
    }
    if (user) {
        let prodQuery = {
            _id: id
        }
        let user_id = {
            _id: user._id
        }
        let { username, mobile, email, password } = user;
        let userObj = {
            username,
            mobile,
            email,
            password
        };
        let cart = user.cart;
        let item = cart.find(item => {
            return item._id == prodQuery._id;
        });
        // console.log(item);
        item.amount = qty;
        //console.log(item.amount);
        let index = cart.findIndex(item => {
            return item._id == prodQuery._id;
        });
        //console.log(index);
        cart.splice(index, 1, item);
        let userObject = {...userObj, cart };
        //console.log(userObj);
        return updateDb(user_id, userObject)
            .catch(err => Promise.reject(err));
    }
}

const deleteItem = async(userId, id) => {
    let query = {
        _id: userId
    };
    //console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({
            message: 'No user available'
        });
    }
    if (user) {
        let prodQuery = {
            _id: id
        }
        let user_id = {
            _id: user._id
        }
        let { username, mobile, email, password } = user;
        let userObj = {
            username,
            mobile,
            email,
            password
        };
        let cart = user.cart;
        let index = cart.findIndex(item => {
            return item._id == prodQuery._id;
        });
        cart.splice(index, 1);
        let userObject = {...userObj, cart };
        //console.log(userObj);
        return updateDb(user_id, userObject)
            .catch(err => Promise.reject(err));
    }
}

const deleteSavedItem = async(userId, id) => {
        let query = {
            _id: userId
        };
        //console.log(query);
        let user = await getProfile(query);
        if (user == null) {
            return Promise.reject({
                message: 'No user available'
            });
        }
        if (user) {
            let prodQuery = {
                _id: id
            }
            let user_id = {
                _id: user._id
            }
            let {
                username,
                mobile,
                email,
                password,
                cart
            } = user;
            let userObj = {
                username,
                mobile,
                email,
                password,
                cart
            };
            let saved_items = user.saved_items;
            let index = saved_items.findIndex(item => {
                return item._id == prodQuery._id;
            });
            saved_items.splice(index, 1);
            let userObject = {
                ...userObj,
                saved_items
            };
            //console.log(userObj);
            return updateDb(user_id, userObject)
                .catch(err => Promise.reject(err));
        }
    }
    //checked items update
const updateCheckedItems = async(userId, id, data) => {
    let query = {
        _id: userId
    };
    let { status } = data;
    let isChecked = status;
    //console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({
            message: 'No user available'
        });
    }
    if (user) {
        let prodQuery = {
            _id: id
        }
        let user_id = {
            _id: user._id
        }
        let {
            username,
            mobile,
            email,
            password,
        } = user;
        let userObj = {
            username,
            mobile,
            email,
            password,
        };
        let cart = user.cart;
        if (isChecked === "checked") {
            let checkedItem = cart.find(item => item._id == prodQuery._id);
            let item = {...checkedItem, status: "checked" };
            let index = cart.findIndex(item => item._id == prodQuery._id);
            cart.splice(index, 1, item);
            let userObj = { cart };
            return updateDb(user_id, userObj)
                .catch(err => Promise.reject(err));
        } else {
            let checkedItem = cart.find(item => item._id == prodQuery._id);
            let item = {...checkedItem, status: "unchecked" };
            let index = cart.findIndex(item => item._id == prodQuery._id);
            cart.splice(index, 1, item);
            let userObject = {...userObj, cart };
            return updateDb(user_id, userObject)
                .catch(err => Promise.reject(err));
        }
    }
}
const verifyAllItemsIsSelectedOrNot = async(userId, data) => {
    let query = {
        _id: userId
    };
    let {
        status
    } = data;
    let isChecked = status;
    //console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({
            message: 'No user available'
        });
    }
    if (user) {
        let user_id = {
            _id: user._id
        }
        let {
            username,
            mobile,
            email,
            password,
        } = user;
        let userObj = {
            username,
            mobile,
            email,
            password,
        };
        let cart = user.cart;
        if (isChecked === "checked") {
            cart.forEach(item => {
                item.status = "checked";
            });
            let userObject = {...userObj, cart };
            return updateDb(user_id, userObject)
                .catch(err => Promise.reject(err));
        }
        if (isChecked === "unchecked") {
            cart.forEach(item => {
                item.status = "unchecked";
            });
            let userObject = {...userObj, cart };
            return updateDb(user_id, userObject)
                .catch(err => Promise.reject(err));
        }
    }
}

module.exports = {
    getUserData,
    checkPswd,
    getCartObj,
    saveProductInCart,
    updateCartQty,
    deleteItem,
    saveProductInSavedItems,
    deleteSavedItem,
    saveProductToCartFromSavedItems,
    updateCheckedItems,
    verifyAllItemsIsSelectedOrNot
};