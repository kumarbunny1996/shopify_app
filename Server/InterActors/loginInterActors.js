const { findUserByKeys } = require('../Utils/dbUtils');
const { comparePasswords } = require('../Dependencies/encrypt');
const { generateAuthToken } = require('../Dependencies/authToken');


const getUserLogin = async({ mobile = undefined, email = undefined, password }) => {
    let query = [{ mobile }, { email }];
    let user = await findUserByKeys(query);
    console.log(user);
    if (user == null) {
        return Promise.reject({ message: 'No User Found ' });
    }

    let correctPassword = comparePasswords(password, user.password);

    if (correctPassword === false) {
        return Promise.reject({ message: 'Incorrect Password' })
    } else {
        return userLogin(user);
    }
}

let userLogin = (userData) => {
    return getTokenOfUser(userData);
}

let getTokenOfUser = ({ _id, username, mobile, email }) => {
    let userPayload = {
        _id,
        username,
        mobile,
        email
    };
    return generateAuthToken(userPayload);

}


module.exports = Object.freeze({ getUserLogin });