const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middlewares/authenticate');
const { getUserData, checkPswd, saveProductInCart, getCartObj, updateCartQty, deleteItem, saveProductInSavedItems, deleteSavedItem, saveProductToCartFromSavedItems, updateCheckedItems, verifyAllItemsIsSelectedOrNot } = require('../InterActors/userInterActor');


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

const getCartItems = async(req, res) => {
    let { userId } = req;
    getCartObj(userId)
        .then(cartObj => {
            if (!cartObj) return;
            res.status(200).send(cartObj);
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

router.get('/profile', authenticateToken, getProfile);
router.post('/qwerty', authenticateToken, checkPass);
router.get('/cart/:id', authenticateToken, getCart);
router.get('/cart_items', authenticateToken, getCartItems);
router.get('/saved_items/:id', authenticateToken, getSavedItem);
router.get('/item_to_cart/:id', authenticateToken, addCartItem);
router.put('/quantity/:id', authenticateToken, updateQty);
router.put('/checked_items/:id', authenticateToken, checkedItems);
router.put('/select_action', authenticateToken, checkSelectOrDeselect);
router.delete('/delete/:id', authenticateToken, deleteCartItem);
router.delete('/delete/saved_item/:id', authenticateToken, deleteItemInSaved);
module.exports = router;