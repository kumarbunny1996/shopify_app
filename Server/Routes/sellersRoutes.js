const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middlewares/authenticate');
const authenticateSellerToken = require('../Middlewares/sellerAuthenticate');
const { verifyTheSeller, verifyTheSellerEmail_id, saveInterActor } = require('../InterActors/sellerInterActors');

//save the seller profile
const saveSellerInfo = async(req, res) => {
        let data = req.body;
        let {
            userId
        } = req;
        verifyTheSeller(data, userId)
            .then(() => {
                res.status(200).send({
                    msg: `Your seller account is successfully created<br> Now feel free to sell your products`,
                })
            })
            .catch(err => {
                console.log(err);
                let errObj = err.message ? err : {
                    code: 0,
                    message: 'seller is denied'
                }
                res.status(400).send(errObj);
            });
    }
    //checks the email of seller
const checkEmailOfSeller = async(req, res) => {
    let {
        email
    } = req.body;
    let {
        userId
    } = req;
    verifyTheSellerEmail_id(email, userId)
        .then(sellerToken => res.status(200).send({
            msg: "you can sell",
            sellerToken
        }))
        .catch(err => {
            console.log(err);
            let errObj = err.message ? err : {
                code: 0,
                message: 'seller is denied'
            }
            res.status(400).send(errObj);
        });
}

//save the product

const saveItem = async(req, res) => {
    let data = req.body;
    let {
        sellerId
    } = req;
    saveInterActor(data, sellerId)
        .then(item => {
            console.log(item);
            res.status(200).send({
                msg: "your product is saved "
            });
        })
        .catch(err => {
            console.log(err);
            let errObj = err.message ? err : {
                code: 0,
                message: 'seller is denied'
            }
            res.status(400).send(errObj);
        });
}

router.post('/seller', authenticateToken, saveSellerInfo);
router.post('/qwerty_email', authenticateToken, checkEmailOfSeller);
router.post('/product', authenticateSellerToken, saveItem);

module.exports = router;