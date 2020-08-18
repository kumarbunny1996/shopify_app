const Products = require("../Models/productModel");
const { getProduct, getDataList } = require("../Utils/productDbUtils");
const { getSellerProfile } = require("../Utils/sellerDButils");

const getProductObj = async(id) => {
    let query = { _id: id };
    //console.log(query);
    let product = await getProduct(query);
    if (!product) return Promise.reject({ msg: "cannot find product" });
    if (product) {
        let email = product.seller_email;
        let seller_query = {
            email
        }
        let seller = await getSellerProfile(seller_query);
        if (seller) {
            let { company_name, email, contact } = seller;
            let sellerObj = { company_name, email, contact };
            let { _id, item_name, brand_name, category, price, shipping_cost, features, description } = product;
            let image = product.image.toString();

            let item = { _id, item_name, brand_name, category, price, shipping_cost, features, description, image };
            let productObj = {...item, sellerObj };
            return productObj;
        }
    }
}

//gets the search values based on categories
const getSearchQuery = async(value) => {
    let productList = [];
    if (value === "All") {
        productList = await getDataList();
    } else {
        let query = {
            category: value
        };
        productList = await getDataList(query);
    }
    let values = productList.map(product => {
        return {
            _id: product._id,
            item_name: product.item_name,
            brand_name: product.brand_name,
            category: product.category,
        };
    });
    return {
        values,
    };

}

const mergedCollection = () => {
    return Products.aggregate([{
            $lookup: {
                from: "sellers",
                localField: "seller_email",
                foreignField: "email",
                as: "seller_docs"
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$seller_docs", 0] }, "$$ROOT"] } }
        },
        {
            $project: { seller_docs: 0 }
        }
    ], (err, docs) => {
        if (err) return Promise.reject(err);
        return docs;
    });
}

module.exports = { getProductObj, getSearchQuery };