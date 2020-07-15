const { verifyToken } = require('../Dependencies/authToken');

const authenticateSellerToken = ((req, res, next) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (accessToken == null) {
        return res.status(401).send({
            message: 'Access is denied for seller account'
        });
    }
    verifyToken(accessToken)
        .then(seller => {
            if (!seller._id) {
                console.log('Invalid seller');
            } else {
                req.sellerId = seller._id;
                next();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({
                message: 'verification failed'
            })
        });
});

module.exports = authenticateSellerToken;