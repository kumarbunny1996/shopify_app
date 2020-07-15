const { getProfile } = require('../Utils/dbUtils.js');
const { comparePasswords } = require('../Dependencies/encrypt');


const getUserData = async(user_id) => {
    let query = { _id: user_id };
    console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({ message: 'No user available' })
    } else {
        return userData(user);

    }
}

let userData = (user) => {
    return getUserInfo(user);
}
let getUserInfo = ({ username, email }) => {
    let userInfo = {
        username,
        email
    }
    return userInfo;
}

const checkPswd = async(userId, password) => {
    let query = {
        _id: userId
    };
    console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({
            message: 'No user available'
        });
    }
    let correctPassword = comparePasswords(password, user.password);

    if (correctPassword === false) {
        return Promise.reject({
            message: 'Incorrect Password'
        })
    }
}


module.exports = {
    getUserData,
    checkPswd,
};