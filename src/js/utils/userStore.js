let userStore = (() => {
    let username = "";
    let token = "";
    let dataValue = ""; //navigation purpose user click the btn from data-id attribute
    let dataObj; //data from seller details
    let productObj; //data from product details
    let storage = [];
    let itemStorage = {
        setItem: (key = "", value) => {
            let a = key;
            let obj = {
                [a]: value
            }
            storage.push(obj);
            //console.log(storage);
        },
        getItem: (key = "") => {
            let item = storage.find((obj) => {
                let value = obj[key];
                return value;
            });
            return item;
        },
        removeItem: (key = "") => {
            let index = storage.findIndex(obj => {
                return obj[key];
            });
            storage.splice(index, 1);
            //console.log(storage);
        },
        clear: () => {
            storage = [];
            //console.log(storage);
        }
    };

    function setUsername(user_name) {
        username = user_name;
    }

    function getUsername() {
        return username;
    }

    function setDataValue(value) {
        dataValue = value;
    }

    function getDataValue() {
        return dataValue;
    }

    function setSellerDataObj(data) {
        dataObj = data;
    }

    function getSellerDataObj() {
        return dataObj;
    }

    function setProductDataObj(data) {
        productObj = data;
    }

    function getProductDataObj() {
        return productObj;
    }

    function authToken() {
        token = JSON.parse(localStorage.getItem('AccessToken'));
        return token;
    }

    function authSellerToken() {
        token = JSON.parse(localStorage.getItem('sellerAccessToken'));
        return token;
    }


    return {
        setUsername,
        getUsername,
        authToken,
        authSellerToken,
        setDataValue,
        getDataValue,
        setSellerDataObj,
        getSellerDataObj,
        setProductDataObj,
        getProductDataObj,
        itemStorage
    }
})();



module.exports = userStore;