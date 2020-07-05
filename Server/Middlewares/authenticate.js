const { verifyToken } = require('../Dependencies/authToken');

const authenticateToken = ((req, res, next) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (accessToken == null) {
        return res.status(401).send({ message: 'Token is not generated' });
    }
    verifyToken(accessToken)
        .then(user => {
            if (!user._id) {
                console.log('Invalid user');
            } else {
                req.userId = user._id;
                next();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ message: 'verification failed' })
        });
});

module.exports = authenticateToken;