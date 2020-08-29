const { getProfile, saveUser, updateDb } = require('../Utils/dbUtils.js');
const { comparePasswords, hashPassword } = require('../Dependencies/encrypt');
const { getProduct } = require("../Utils/productDbUtils");
const { saveCounter, updateCounterDb } = require('../Utils/counterDbUtils.js');
const { orders } = require('../Dependencies/razorpay.js');


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

//gets the collections [cart],[saved_items] user object
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
        return {
            user
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

//get address array
const getAddressDetails = async(userId) => {
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
        let address = user.delivery_address;
        return {
            address
        };
    }
}

//save address

const saveAddressDetails = async(userId, data) => {
    let query = {
        _id: userId
    };
    console.log(query);
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
            //create the id to address obj using counters /auto inc
        let userCounterObj = {
            id: 'userId',
            sequence_value: 0,
        }
        saveCounter(userCounterObj)
            .catch(err => Promise.reject(err));
        let countQuery = {
            id: 'userId',
        }
        let updateObj = {
            $inc: {
                sequence_value: 1
            }
        };

        let sequenceDoc = await updateCounterDb(countQuery, updateObj);
        let counterValue = sequenceDoc.sequence_value;
        let _id = counterValue;
        //address obj to save in array
        let {
            name,
            street,
            township,
            pin_code,
            state,
            country
        } = data;
        let addressObj = {
                _id,
                name,
                street,
                township,
                pin_code,
                state,
                country
            }
            //add address object to user
        let address = {
            name,
            street,
            township,
            state,
            country,
            pin_code,
        }
        let delivery_address = user.delivery_address;
        if (delivery_address.length < 4) {
            delivery_address.unshift(addressObj);
        } else {
            delivery_address.pop();
            delivery_address.unshift(addressObj);
        }

        return updateDb(user_id, {
                delivery_address,
                address
            })
            .catch(err => Promise.reject(err));
    }
}

//update the address details
const editAddressDetails = async(userId, data, id) => {
    let query = {
        _id: userId
    };
    console.log(query);
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
            name,
            street,
            township,
            pin_code,
            state,
            country
        } = data;
        let delivery_address = user.delivery_address;
        let address = delivery_address.find(address => address._id == id);
        address.name = name;
        address.street = street;
        address.township = township;
        address.pin_code = pin_code;
        address.state = state;
        address.country = country;
        let index = delivery_address.findIndex(address => address._id == id);
        delivery_address.splice(index, 1, address);

        return updateDb(user_id, {
                delivery_address,
            })
            .catch(err => Promise.reject(err));
    }
}

//delete address 
const deleteAddressDetails = async(userId, id) => {
    let query = {
        _id: userId
    };
    console.log(query);
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
        let delivery_address = user.delivery_address;
        let index = delivery_address.findIndex(address => address._id == id);
        delivery_address.splice(index, 1);

        return updateDb(user_id, {
                delivery_address,
            })
            .catch(err => Promise.reject(err));
    }
}

//gets single address
const getSingleAddressDetails = async(userId, id) => {
    let query = {
        _id: userId
    };
    console.log(query);
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
        let delivery_address = user.delivery_address;
        let address_one = delivery_address.find(address => address._id == id);
        let {
            name,
            street,
            township,
            pin_code,
            state,
            country
        } = address_one;
        let address = {
            name,
            street,
            township,
            pin_code,
            state,
            country
        };
        return updateDb(user_id, {
                address,
            })
            .catch(err => Promise.reject(err));
    }
}

//add shippingCost to address
const addShippingCost = async(userId, shippingCost) => {
    let query = {
        _id: userId
    };
    console.log(query);
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
        let userAddress = user.address;
        let address = {...userAddress, shipping_cost: shippingCost };
        return updateDb(user_id, {
                address,
            })
            .catch(err => Promise.reject(err));

    }
}

//get response object from orders in razorpay;
const getResponseOfOrder = async(userId, data) => {
    let query = {
        _id: userId
    };
    console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({
            message: 'No user available'
        });
    }
    let response = await orders(data);
    return response;
}

//get single product func
const getBuyItemLogic = async(userId, id) => {
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
            password
        } = user;
        let userObj = {
            username,
            mobile,
            email,
            password
        };
        let product = await getProduct(prodQuery);
        if (product) {
            let {
                _id,
                item_name,
                brand_name,
                category,
                price,
                shipping_cost
            } = product;
            let image = product.image.toString();

            let item = {
                _id,
                item_name,
                brand_name,
                category,
                price,
                shipping_cost,
                image
            };
            let cartItem = {
                ...item,
                amount: "1",
                status: "checked"
            };
            //save items to cart
            let cart = user.cart;
            cart.forEach(item => {
                item.status = "unchecked";
            });
            let index = cart.findIndex(item => item._id == prodQuery._id);
            if (index == -1) {
                cart.unshift(cartItem);
            } else {
                let buyItem = cart.find(item => item._id == prodQuery._id);
                buyItem.status = "checked";
                cart.splice(index, 1, buyItem);
            }
            //checks the saved cart if any same item exists
            let saved_items = user.saved_items;
            let savedIndex = saved_items.findIndex(item => item._id == prodQuery._id);
            if (savedIndex != -1) {
                saved_items.splice(savedIndex, 1);
            }
            let userObject = {
                ...userObj,
                cart
            };
            let userFinalObject = {
                ...userObject,
                saved_items
            };
            return updateDb(user_id, userFinalObject)
                .catch(err => Promise.reject(err));
        }
    }
}

const cancellationOfOrders = async(userId, order_id) => {
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
        let user_id = {
            _id: user._id
        }
        let orders = user.orders;
        let cancelledOrder = user.cancelledOrders
        let item = orders.find(item => item.order_id == order_id);
        let index = orders.findIndex(item => item.order_id == order_id);
        let product = item.product;
        let cancelledOrders = product.concat(cancelledOrder);
        orders.splice(index, 1);
        return updateDb(user_id, {
                orders,
                cancelledOrders
            })
            .catch(err => Promise.reject(err));
    }
}

const deleteItemsOfOrders = async(userId, id) => {
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
    let user_id = {
        _id: user._id
    }
    let cancelledOrders = user.cancelledOrders
    let index = cancelledOrders.findIndex(item => item._id == id);
    cancelledOrders.splice(index, 1);
    return updateDb(user_id, {
            cancelledOrders,
        })
        .catch(err => Promise.reject(err));
}

const archiveOfOrders = async(userId, order_id) => {
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
    let user_id = {
        _id: user._id
    }
    let orders = user.orders
    let index = orders.findIndex(item => item.order_id == order_id);
    orders.splice(index, 1);
    return updateDb(user_id, {
            orders,
        })
        .catch(err => Promise.reject(err));
}

const editUserObj = async(userId, value, data) => {
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
    let user_id = {
        _id: user._id
    }
    let btn = data.btn;
    if (btn === "save-changes-name") {
        let username = user.username;
        username = value;
        return updateDb(user_id, {
                username,
            })
            .catch(err => Promise.reject({ msg: "Sorry,username cannot update please try again" }));
    }
    if (btn === "save-changes-email") {
        let email = user.email;
        email = value;
        return updateDb(user_id, {
                email,
            })
            .catch(err => Promise.reject({ msg: "Sorry,email cannot update please try again" }));
    }
    if (btn === "save-changes-mobile") {
        let mobile = user.mobile;
        mobile = value;
        return updateDb(user_id, {
                mobile,
            })
            .catch(err => Promise.reject({ msg: "Sorry,mobile cannot update please try again" }));
    }
    if (btn === "save-changes-pswd") {
        let password = user.password;
        password = await hashPassword(value);
        return updateDb(user_id, {
                password,
            })
            .catch(err => Promise.reject({ msg: "Sorry,password cannot update please try again" }));
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
    verifyAllItemsIsSelectedOrNot,
    getAddressDetails,
    saveAddressDetails,
    editAddressDetails,
    deleteAddressDetails,
    getSingleAddressDetails,
    addShippingCost,
    getResponseOfOrder,
    getBuyItemLogic,
    cancellationOfOrders,
    deleteItemsOfOrders,
    archiveOfOrders,
    editUserObj,
};