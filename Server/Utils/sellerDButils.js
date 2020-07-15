const SellerDb = require('../DB/sellerDB');

//insert one document
//seller document
const saveSeller = (dataObj) => {
    return SellerDb.insertOne(dataObj)
        .then(seller => {
            return seller;
        })
        .catch(err => Promise.reject(err));
}

const getSellerProfile = (query = {}, requirements = {}) => {
    return SellerDb.findOne(query, requirements)
        .then(seller => seller)
        .catch(err => Promise.reject(err));
}

module.exports = Object.freeze({
    saveSeller,
    getSellerProfile
});