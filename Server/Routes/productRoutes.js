const express = require("express");
const router = express.Router();
const { getProductObj, getSearchQuery } = require("../InterActors/productInterActors");

const fetchProduct = async(req, res) => {
        let id = req.params._id;
        getProductObj(id)
            .then(product => res.status(200).send({ product }))
            .catch(err => console.log(err));
    }
    //gets the search selected product
const fetchSelectedProduct = async(req, res) => {
    let value = req.params.value;
    getSearchQuery(value)
        .then(obj => {
            if (obj === null) return;
            let search_query = obj.values;
            res.status(200).send({ search_query });
        })
        .catch(err => console.log(err));
}



router.get("/product/:_id", fetchProduct);
router.get("/search_selected/:value", fetchSelectedProduct);
module.exports = router;