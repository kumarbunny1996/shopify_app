let userStore = (() => {
    let username = "";
    let token = "";
    let dataValue = ""; //navigation purpose user click the btn from data-id attribute
    let dataObj; //data from seller details
    let productObj; //data from product details
    let sellerEmail = "";

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
        getProductDataObj
    }
})();



module.exports = userStore;