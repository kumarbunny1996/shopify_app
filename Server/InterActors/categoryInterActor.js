const { getDataList } = require("../Utils/productDbUtils");


const categoryInterActor = async(category) => {
    let query = { category };
    //console.log(query);
    let dataList = await getDataList(query);
    //console.log(dataList);
    if (!dataList) return Promise.reject({ msg: "cannot find data list" });
    if (dataList) {
        let categoryData = dataList.map(product => {
            let category;
            let { _id, item_name, price } = product;
            let image = product.image.toString();
            return category = {
                _id,
                item_name,
                price,
                image
            }
        });
        return categoryData;
    }
}


module.exports = {
    categoryInterActor
}