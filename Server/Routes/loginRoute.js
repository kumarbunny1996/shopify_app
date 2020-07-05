const express = require('express');
const router = express.Router();
const { getUserLogin } = require('../InterActors/loginInterActors');

const handleUsersLogin = async(req, res) => {
    let data = req.body;
    getUserLogin(data)
        .then(token => {
            if (!token) {
                res.status(400).send({ message: 'Invalid Token' });
            } else {
                res.status(200).send({
                    logged_in: true,
                    message: 'token is valid',
                    token
                });
            }
        })
        .catch(err => {
            console.log(err);
            let errObj = err.message ? err : {
                code: 0,
                message: 'Unable to find user'
            }
            res.status(400).send(errObj);
        });
};

router.post('/', handleUsersLogin);

module.exports = router;