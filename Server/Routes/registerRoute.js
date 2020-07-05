const express = require('express');
const router = express.Router();
const registerUser = require('../InterActors/registerInterActor');

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

router.post('/', handleRegister);

module.exports = router;