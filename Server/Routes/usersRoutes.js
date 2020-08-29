const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middlewares/authenticate');
const {
    getUserData,
    checkPswd,
    saveProductInCart,
    getCartObj,
    getAddressDetails,
    updateCartQty,
    deleteItem,
    saveProductInSavedItems,
    deleteSavedItem,
    saveProductToCartFromSavedItems,
    updateCheckedItems,
    verifyAllItemsIsSelectedOrNot,
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
} = require('../InterActors/userInterActor');


//gets the user profile
const getProfile = async(req, res) => {
    let { userId } = req;

    getUserData(userId)
        .then(user => {
            let userObj = {
                message: 'success',
                user
            };
            res.status(200).send(userObj);
        })
        .catch(err => {
            console.log(err);
            let errObj = err.message ? err : {
                code: 0,
                message: 'user is deleted'
            }
            res.status(400).send(errObj);
        });
}

//checks the user password to access selling
const checkPass = async(req, res) => {
        let { password } = req.body;
        let { userId } = req;
        checkPswd(userId, password)
            .then(() => res.status(200).send({ msg: 'you can access' }))
            .catch(err => {
                console.log(err);
                let errObj = err.message ? err : {
                    code: 0,
                    message: 'user is denied'
                }
                res.status(400).send(errObj);
            });

    }
    //gets single product when buy btn is clicked
const getBuyCart = async(req, res) => {
        let { userId } = req;
        let id = req.params.id;
        getBuyItemLogic(userId, id)
            .then(user => {
                if (!user) return;
                //console.log(user);
                let cart = user.cart;
                let item = cart.find(item => {
                    return item._id == id;
                });
                let savedCart = user.saved_items;
                let savedItemIndex = savedCart.findIndex(item => item._id == id);
                console.log(savedCart.length);
                if (savedItemIndex == -1) {
                    res.status(200).send({
                        item,
                        isNotThere: true
                    });
                } else {
                    res.status(200).send({
                        item
                    });
                }

            })
            .catch(err => console.log(err));
    }
    //gets cart items
const getCart = async(req, res) => {
        let { userId } = req;
        let id = req.params.id;
        saveProductInCart(userId, id)
            .then(user => {
                if (!user) return;
                //console.log(user);
                let cart = user.cart;
                let item = cart.find(item => {
                    return item._id == id;
                });
                let savedCart = user.saved_items;
                let savedItemIndex = savedCart.findIndex(item => item._id == id);
                console.log(savedCart.length);
                if (savedItemIndex == -1) {
                    res.status(200).send({ item, isNotThere: true });
                } else {
                    res.status(200).send({ item });
                }

            })
            .catch(err => console.log(err));
    }
    //gets users objects[cart,orders,savedItems,address,addObj,single-item] user object
const getCartItems = async(req, res) => {
    let { userId } = req;
    getCartObj(userId)
        .then(userObj => {
            if (!userObj) return;
            res.status(200).send(userObj);
            //console.log(cart);
        })
        .catch(err => console.log(err));
}

const updateQty = async(req, res) => {
    let { userId } = req;
    let { qty } = req.body;
    let id = req.params.id;
    updateCartQty(userId, qty, id)
        .then(user => {
            if (!user) return;
            let cart = user.cart;
            let item = cart.find(item => {
                    return item._id == id;
                })
                //console.log(item);
            res.status(200).send({
                item
            });
            //console.log(cart);
        })
        .catch(err => console.log(err));
}

const deleteCartItem = async(req, res) => {
    let { userId } = req;
    let id = req.params.id;
    deleteItem(userId, id)
        .then((user) => {
            if (!user) return;
            res.status(200).send({ isDeleted: true });
        })
        .catch(err => console.log(err));
}

const getSavedItem = async(req, res) => {
    let { userId } = req;
    let id = req.params.id;
    saveProductInSavedItems(userId, id)
        .then(user => {
            //console.log(user);
            if (!user) return;
            let saved_items = user.saved_items;
            let item = saved_items.find(item => {
                return item._id == id;
            })
            res.status(200).send({ item });
        })
        .catch(err => console.log(err));
}

const deleteItemInSaved = async(req, res) => {
        let { userId } = req;
        let id = req.params.id;
        deleteSavedItem(userId, id)
            .then((user) => {
                if (!user) return;
                res.status(200).send({ isDeleted: true });
            })
            .catch(err => console.log(err));
    }
    //adds item to cart from saved items
const addCartItem = async(req, res) => {
    let { userId } = req;
    let id = req.params.id;
    saveProductToCartFromSavedItems(userId, id)
        .then(user => {
            if (!user) return;
            let cart = user.cart;
            let item = cart.find(item => item._id == id);
            res.status(200).send({ item });
        })
        .catch(err => console.log(err));
}

const checkedItems = async(req, res) => {
    let { userId } = req;
    let id = req.params.id;
    let data = req.body;
    updateCheckedItems(userId, id, data)
        .then((user) => {
            if (!user) return;
            res.status(200).send({ isChecked: data.status });
        })
        .catch(err => console.log(err));
}

const checkSelectOrDeselect = async(req, res) => {
        let { userId } = req;
        let data = req.body;
        verifyAllItemsIsSelectedOrNot(userId, data)
            .then(user => {
                if (user) {
                    res.status(200).send({ status: data.status });
                }
            })
            .catch(err => console.log(err));

    }
    //gets the address

const getAddress = async(req, res) => {
    let { userId } = req;
    getAddressDetails(userId)
        .then(obj => {
            res.status(200).send(obj);
        })
        .catch(err => console.log(err));
}

const saveAddress = async(req, res) => {
    let { userId } = req;
    let data = req.body;
    saveAddressDetails(userId, data)
        .then(obj => {
            //let addressObj = obj.delivery_address;
            let address = obj.address;
            res.status(200).send({ address });
        })
        .catch(err => console.log(err));
}

//edit address
const editAddress = async(req, res) => {
    let { userId } = req;
    let data = req.body;
    let id = req.params.id;
    editAddressDetails(userId, data, id)
        .then(user => {
            if (user) {
                res.status(200).send({ is_updated: true });
            }
        })
        .catch(err => console.log(err));
}

// delete address
const deleteAddress = async(req, res) => {
    let {
        userId
    } = req;
    let id = req.params.id;
    deleteAddressDetails(userId, id)
        .then(user => {
            if (user) {
                res.status(200).send({
                    is_deleted: true
                });
            }
        })
        .catch(err => console.log(err));
}

//get address 
const getSingleAddress = async(req, res) => {
    let {
        userId
    } = req;
    let id = req.params.id;
    getSingleAddressDetails(userId, id)
        .then(obj => {
            //let addressObj = obj.delivery_address;
            let address = obj.address;
            res.status(200).send({
                address
            });
        })
        .catch(err => console.log(err));
}

const getShippingCost = async(req, res) => {
    let {
        userId
    } = req;
    let shippingCost = req.params.value;
    addShippingCost(userId, shippingCost)
        .then(obj => {
            //let addressObj = obj.delivery_address;
            let address = obj.address.shipping_cost;
            res.status(200).send({
                address
            });
        })
        .catch(err => console.log(err));
}

//creates the order
const createOrder = async(req, res) => {
    let { userId } = req;
    let data = req.body;
    getResponseOfOrder(userId, data)
        .then(resObj => {
            res.status(200).send({
                id: resObj.id,
                currency: resObj.currency,
                amount: resObj.amount,
                notes: resObj.notes,
                created_at: resObj.created_at,
            });
        })
        .catch(err => {
            console.log(err);
            let errObj = err.message ? err : {
                code: 0,
                message: 'There is problem in creating your orders, pleaseTry again',
            }
            res.status(400).send(errObj);
        });
}

//cancellation of orders
const cancelOrder = async(req, res) => {
        let { userId } = req;
        let order_id = req.params.id
        cancellationOfOrders(userId, order_id)
            .then(user => {
                if (user) {
                    res.status(200).send({ is_cancelled: true });
                }
            })
            .catch(err => res.status(400).send({ err }));
    }
    //delete the item in cancel items array
const deleteOrder = async(req, res) => {
        let {
            userId
        } = req;
        let id = req.params.id
        deleteItemsOfOrders(userId, id)
            .then(user => {
                if (user) {
                    res.status(200).send({
                        is_deleted: true
                    });
                }
            })
            .catch(err => res.status(400).send({
                err
            }));
    }
    //archieve the order
const archieveOrder = async(req, res) => {
    let {
        userId
    } = req;
    let order_id = req.params.id
    archiveOfOrders(userId, order_id)
        .then(user => {
            if (user) {
                res.status(200).send({
                    is_archived: true
                });
            }
        })
        .catch(err => res.status(400).send({
            err
        }));
}

//edit the user Obj
const updateUserObj = async(req, res) => {
    let {
        userId
    } = req;
    let value = req.params.value;
    let data = req.body;
    editUserObj(userId, value, data)
        .then(user => {
            if (!user) return;
            if (data.btn === "save-changes-name") {
                let username = user.username;
                let value = 'name';
                res.status(200).send({
                    username,
                    value,
                });
                return;
            }
            if (data.btn === "save-changes-email") {
                let email = user.email;
                let value = 'email';
                res.status(200).send({
                    email,
                    value,
                });
                return;
            }
            if (data.btn === "save-changes-mobile") {
                let mobile = user.mobile;
                let value = 'mobile';
                res.status(200).send({
                    mobile,
                    value,
                });
                return;
            }
            if (data.btn === "save-changes-pswd") {
                res.status(200).send({
                    isUpdated: true,
                });
                return;
            }
        })
        .catch(err => res.status(400).send({
            err
        }));
}

router.get('/profile', authenticateToken, getProfile);
router.post('/qwerty', authenticateToken, checkPass);
router.get('/cart/:id', authenticateToken, getCart);
router.get('/buy_cart/:id', authenticateToken, getBuyCart);
router.get('/cart_items', authenticateToken, getCartItems);
router.get('/saved_items/:id', authenticateToken, getSavedItem);
router.get('/item_to_cart/:id', authenticateToken, addCartItem);
router.put('/quantity/:id', authenticateToken, updateQty);
router.put('/checked_items/:id', authenticateToken, checkedItems);
router.put('/select_action', authenticateToken, checkSelectOrDeselect);
router.delete('/delete/:id', authenticateToken, deleteCartItem);
router.delete('/delete/saved_item/:id', authenticateToken, deleteItemInSaved);
router.get('/check_user', authenticateToken, getAddress);
router.post('/add_delivery_address', authenticateToken, saveAddress);
router.put('/edit_delivery_address/:id', authenticateToken, editAddress);
router.delete('/delete_address/:id', authenticateToken, deleteAddress);
router.get('/get_delivery_address/:id', authenticateToken, getSingleAddress);
router.get('/get_shipping_cost/:value', authenticateToken, getShippingCost);
router.post('/order', authenticateToken, createOrder);
router.get('/cancel_order/:id', authenticateToken, cancelOrder);
router.get('/delete_order/:id', authenticateToken, deleteOrder);
router.get('/archieve_order/:id', authenticateToken, archieveOrder);
router.post('/account/:value', authenticateToken, updateUserObj);
module.exports = router;