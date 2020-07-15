const ProductDb = require('../DB/itemsDB');

//insert one document
//product document
const saveProduct = (dataObj) => {
    return ProductDb.insertOne(dataObj)
        .then(product => {
            return product;
        })
        .catch(err => Promise.reject(err));
}

const getProduct = (query = {}, requirements = {}) => {
    return ProductDb.findOne(query, requirements)
        .then(product => product)
        .catch(err => Promise.reject(err));
}

module.exports = Object.freeze({
    saveProduct,
    getProduct
});