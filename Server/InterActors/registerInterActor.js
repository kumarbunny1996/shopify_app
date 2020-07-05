const { saveUser, findUserByKeys } = require('../Utils/dbUtils');
const { hashPassword } = require('../Dependencies/encrypt');

const registerUser = async({ username, mobile, email, password }) => {
    let query = [{ username }, { mobile }, { email }];
    let user = await findUserByKeys(query);
    if (user) {
        return Promise.reject({ message: 'user exists' });
    }
    password = await hashPassword(password);
    let userObj = {
        username,
        mobile,
        email,
        password
    };
    return saveUser(userObj)
        .catch(err => Promise.reject(err));

}

module.exports = Object.freeze(registerUser);