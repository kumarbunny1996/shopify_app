const makeRequestToServer = require("../ajax/ajax");
const { fetchProductData } = require("../components/product");
const userStore = require("../utils/userStore");
const { loader, removeLoader } = require("../utils/utils");
const { events } = require("./uiHandler");

const categoryDom = (categoryData = [], key = "") => {
    let element = document.getElementById(key);
    let result = "";
    categoryData.forEach(category => {
        result += `
            <div class="product" data-id="${category._id}">
                <div class="img-container">
                    <img alt="product-img" src="${category.image}">
                </div>
                <div class="product-details">
                    <h4>${category.item_name}</h4>
                    <h5><span>$</span> ${category.price}</h5>
                </div>
            </div>
        `;
    });
    element.innerHTML = result;
}

const getsCategoryDataList = (category = "", key = "") => {
    let categoryDataList = [];
    let requestObj = {
        method: 'GET',
        url: `/api/shopify/category/${category}`,
        name: 'Content-type',
        value: 'application/json',
        data: null
    }
    if (userStore.itemStorage.getItem(key) === null || userStore.itemStorage.getItem(key) === undefined || userStore.itemStorage.getItem(key) === []) {
        loader();
        makeRequestToServer(requestObj)
            .then(categoryList => {
                categoryDataList = categoryList;
                userStore.itemStorage.setItem(key, categoryDataList);
                categoryDom(categoryDataList, key);
            })
            .catch((err) => {
                //console.log(err)
            })
            .finally(() => {
                removeLoader();
            });
    } else {
        categoryDataList = userStore.itemStorage.getItem(key);
        //console.log(categoryDataList[key]);
        let categoryData = categoryDataList[key];
        categoryDom(categoryData, key);
    }
}
const eventForShowingProduct = (value = "") => {
    events(value, 'click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.parentElement.dataset.id;
        //console.log(id);
        if (id === undefined) return;
        if (id) {
            window.scrollTo(0, 0);
            fetchProductData(id);
        }
    });
}


module.exports = { getsCategoryDataList, eventForShowingProduct };