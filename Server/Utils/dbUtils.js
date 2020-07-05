const UserDb = require('../DB/userDb');

//insert one document

const saveUser = (dataObj) => {
    return UserDb.insertOne(dataObj)
        .then(user => {
            return user;
        })
        .catch(err => Promise.reject(err));
}

//find the docs if any matching the query

const findUserByKeys = (query = [], requirements = {}) => {
    return UserDb.findByKeys(query, requirements)
        .then(user => user)
        .catch(err => Promise.reject(err));
}

const getProfile = (query = {}, requirements = {}) => {
    return UserDb.findOne(query, requirements)
        .then(user => user)
        .catch(err => Promise.reject(err));
}

module.exports = Object.freeze({
    saveUser,
    findUserByKeys,
    getProfile
});