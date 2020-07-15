const { generateAuthToken } = require("../Dependencies/authToken");
const { getProfile } = require('../Utils/dbUtils.js');
const { getSellerProfile, saveSeller } = require('../Utils/sellerDButils.js');
const { saveProduct } = require('../Utils/productDbUtils');



const verifyTheSeller = async(data, userId) => {
    let query = {
        _id: userId
    };
    console.log(query);
    let user = await getProfile(query);
    if (user == null) {
        return Promise.reject({
            message: 'You do not have an user account to access'
        });
    }
    let {
        company_name,
        email,
        category,
        business_type,
        account_type,
        contact
    } = data;

    let query2 = { email };
    let user2 = await getProfile(query2);
    if (user2) {
        return Promise.reject({
            message: `<strong>${email}</strong><br>This email has been already registered with your user account<br>Add new email address for seller account `
        });
    }
    let queryForSeller = { email };
    let seller = await getSellerProfile(queryForSeller);
    if (seller) {
        return Promise.reject({
            message: `<strong>${email}</strong><br>This email has been already in use<br> if your already shopify seller click start to sell<br> or create an account with new email address`
        });
    }
    let sellerObj = {
        company_name,
        email,
        category,
        business_type,
        account_type,
        contact
    }
    return saveSeller(sellerObj)
        .catch(err => Promise.reject(err));

}

const verifyTheSellerEmail_id = async(email, userId) => {
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
    let queryForSeller = { email: email };
    let seller = await getSellerProfile(queryForSeller);
    console.log(seller);
    if (seller == null) {
        return Promise.reject({
            message: `You do not have a seller account <br> please create an account`
        });
    } else {
        return sellerLogin(seller);
    }
}


const saveInterActor = async(data, sellerId) => {
    let query = {
        _id: sellerId
    };
    console.log(query);
    let seller = await getSellerProfile(query);
    if (seller == null) {
        return Promise.reject({
            message: 'No seller available'
        });
    }
    let seller_email = seller.email;
    let {
        item_name,
        brand_name,
        category,
        price,
        quantity,
        max_quantity,
        shipping_cost,
        features,
        description,
        image
    } = data;
    let item = {
        seller_email,
        item_name,
        brand_name,
        category,
        price,
        quantity,
        max_quantity,
        shipping_cost,
        features,
        description,
        image
    };

    return saveProduct(item)
        .catch(err => Promise.reject(err));

}

let sellerLogin = (seller) => {
    return getTokenOfSeller(seller);
}
let getTokenOfSeller = ({ _id, email }) => {
    let userPayload = {
        _id,
        email
    };
    return generateAuthToken(userPayload);

}

module.exports = {
    verifyTheSeller,
    verifyTheSellerEmail_id,
    saveInterActor,
}