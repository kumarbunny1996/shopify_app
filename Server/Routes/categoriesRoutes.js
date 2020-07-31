const express = require('express');
const { categoryInterActor } = require('../InterActors/categoryInterActor');
const router = express.Router();

const getsDataOfCategory = async(req, res) => {
    let category = req.params.category;
    //console.log(category);
    categoryInterActor(category)
        .then(dataList => {
            res.status(200).send(dataList);
        })
        .catch(err => console.log(err));
}

router.get('/category/:category', getsDataOfCategory);

module.exports = router;