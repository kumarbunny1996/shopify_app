const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middlewares/authenticate');
const getUserData = require('../InterActors/userInterActor');


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

router.get('/profile', authenticateToken, getProfile);
module.exports = router;