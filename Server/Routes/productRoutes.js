const express = require("express");
const router = express.Router();
const { getProductObj } = require("../InterActors/productInterActors");

const fetchProduct = async(req, res) => {
    let id = req.params._id;
    getProductObj(id)
        .then(product => res.status(200).send({ product }))
        .catch(err => console.log(err));
}



router.get("/product/:_id", fetchProduct);
module.exports = router;