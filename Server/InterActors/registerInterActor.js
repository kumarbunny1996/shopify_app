const { saveUser, findUserByKeys, getProfile } = require('../Utils/dbUtils');
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

const checkIfUsernameExists = async(username) => {
    let query = {
        username: username
    };
    console.log(query);
    let user = await getProfile(query);
    if (user) {
        return Promise.reject({
            message: 'Username is not available'
        });
    }
    let msgObj = {
        message: 'Username is available'
    }
    return msgObj;

}
const checkIfMobileNumberExists = async(mobile) => {
    let query = {
        mobile: mobile
    };
    console.log(query);
    let user = await getProfile(query);
    if (user) {
        return Promise.reject({
            message: `<strong>Mobile number already in use</strong><br><br> <em>you indicated new customer! but your account is already registered</em>`
        });
    }
    let msgObj = {
        message: 'Number is allowed'
    }
    return msgObj;

}

const checkIfEmailExists = async(email) => {
    let query = {
        email: email
    };
    console.log(query);
    let user = await getProfile(query);
    if (user) {
        return Promise.reject({
            message: `<strong>Email address already exists</strong><br><br> <em>you indicated new customer! but your account is already registered</em>`
        });
    }
    let msgObj = {
        message: 'new address'
    }
    return msgObj;

}

module.exports = Object.freeze({
    registerUser,
    checkIfUsernameExists,
    checkIfMobileNumberExists,
    checkIfEmailExists
});