const express = require('express');
const router = express.Router();
const {
    registerUser,
    checkIfUsernameExists,
    checkIfMobileNumberExists,
    checkIfEmailExists
} = require('../InterActors/registerInterActor');

const handleRegister = async(req, res) => {
    let data = req.body;
    registerUser(data)
        .then(() => {
            let successObj = {
                created: true,
                msg: 'Successfully created your @shopify account'
            }
            res.status('200').send(successObj);
        })
        .catch(err => {
            console.log(err);
            let errObj = err.message ? err : {
                code: 0,
                message: 'Unable to create account'
            }
            res.status(400).send(errObj);
        });
}

const handleUsername = async(req, res) => {
    let username = req.params.username;
    checkIfUsernameExists(username)
        .then(msgObj => {
            res.status(200).send(msgObj);
        })
        .catch(err => {
            console.log(err);
            let errObj = err.message ? err : {
                code: 0,
                message: 'Username not available'
            }
            res.status(400).send(errObj);
        });
}

const handleEmail = async(req, res) => {
    let email = req.params.email;
    checkIfEmailExists(email)
        .then(msgObj => {
            res.status(200).send(msgObj);
        })
        .catch(err => {
            console.log(err);
            let errObj = err.message ? err : {
                code: 0,
                message: 'Email exists'
            }
            res.status(400).send(errObj);
        });
}

const handleMobile = async(req, res) => {
    let mobile = req.params.mobile;
    checkIfMobileNumberExists(mobile)
        .then(msgObj => {
            res.status(200).send(msgObj);
        })
        .catch(err => {
            console.log(err);
            let errObj = err.message ? err : {
                code: 0,
                message: 'mobile number already exists'
            }
            res.status(400).send(errObj);
        });
}

router.post('/', handleRegister);
router.get('/username/:username', handleUsername);
router.get('/mobile/:mobile', handleMobile);
router.get('/email/:email', handleEmail);

module.exports = router;