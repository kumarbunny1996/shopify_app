const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middlewares/authenticate');
const { getUserData, checkPswd } = require('../InterActors/userInterActor');


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


router.get('/profile', authenticateToken, getProfile);
router.post('/qwerty', authenticateToken, checkPass);
module.exports = router;