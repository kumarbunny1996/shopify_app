const userStore = require("../utils/userStore");
const makeRequestToServer = require('../ajax/ajax');
const { showModel, showMsg, events, showHidePass, displayPng, notDisplayPng, removeOverlayLoader, logOut } = require("./uiHandler");
const { loaderDiv } = require("../utils/utils");

const confirmAccount = () => {
    let username = userStore.getUsername();
    //console.log(username);

    return `
            <div class="user-div3" id="user-div3">
                <a href="#" class="user-name"><i class="fa fa-user-circle-o" aria-hidden="true"></i></a>
                <h2 id=user-ref>Hi, ${username}</h2>
            </div>
            <div class="tiny-form">
                <form class="input-container3">
                    <input type="password" class="input3" id="confirmPass" name="password" autocomplete="off" required>
                    <label for="confirmPass" class="label-content3"><span class="content-name3">Enter password *</span></label>
                    <div id="eye-toggle3" class="eye-toggle2"></div>
                </form>
                 <div class="error-pswd" id="error-pswd" style="margin-top:5px;display:none">
                    <p style="color:rgb(255, 96, 96);">Password is invalid</p>
                </div>
                <div class="confirmButton" id="confirmButton">
                    <button class="confirm-btn" id="confirm-btn" data-id="">Continue To Sell</button>
                </div>
            </div>
    `;
}

const sellerAccount = () => {
    let username = userStore.getUsername();
    //console.log(username);
    return `
            <div class="user-div4" id="user-div4">
                <a href="#" class="user-name2"><i class="fa fa-user-circle-o" aria-hidden="true"></i></a>
                <h2 id=user-ref2>Hi, ${username}</h2>
            </div>
            <div class="tiny-form2">
                <form class="input-container4">
                    <input type="email" class="input4" id="email2" name="email" autocomplete="off" required>
                    <label for="email2" class="label-content4"><span class="content-name4">Email *</span></label>
                </form>
                 <div class="error-email" id="error-email" style="margin-top:5px;display:none">
                    <p style="color:rgb(255, 96, 96);">Email is invalid</p>
                </div>
                <div class="sellingButton" id="sellingButton">
                    <button class="selling-btn" id="selling-btn" data-id="">Start Selling</button>
                </div>
            </div>
    `;
}



const sellerConfirmation = () => {
    let seller = document.getElementById("btn1").getAttribute('data-id');
    //console.log(seller);
    userStore.setDataValue(seller);
    let token = userStore.authToken();
    if (token === null) return location.hash = "#login";
    if (token) {
        let yourAccount = confirmAccount();
        showModel(yourAccount);
        events("#confirmPass", "keyup", checkPassword2)
        events("#confirmButton", "click", checkBeforeContinue);
        events('#confirmPass', 'focus', displayPng);
        events('#confirmPass', 'blur', notDisplayPng);
        events('#eye-toggle3', 'click', showHidePass);
    }
}
const checkPassword2 = () => {
    let passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,256}/;
    let myInput = document.getElementById("confirmPass");
    let password = myInput.value.match(passwordPattern);
    if (!password) {
        document.getElementById("error-pswd").style.display = "block";
        document.getElementById("confirm-btn").disabled = true;
    } else {
        document.getElementById("error-pswd").style.display = "none";
        document.getElementById("confirm-btn").disabled = false;
    }
    return password;
}

const checkPswdRequestToServer = (reqObj = {}) => {
    makeRequestToServer(reqObj)
        .then((msg) => {
            //console.log(msg);
            removeModal();
            location.hash = "#seller-central";

        })
        .catch(errObj => {
            //console.log(errObj);
            if (errObj) {
                let msgObject = {
                    message: errObj.message,
                    code: '&#10008',
                    term: 'Failure',
                    value1: 'info-style',
                    value2: 'failure'
                }
                showMsg(msgObject);
            }
        })
        .finally(() => {
            removeOverlayLoader();
        });
}

const checkBeforeContinue = () => {
    let pswd = checkPassword2;
    let token = userStore.authToken();
    let password = document.getElementById("confirmPass").value;
    if (password === "") return;
    if (pswd === null) return;
    let data = {
        password
    }
    let requestObj = {
        method: 'POST',
        url: '/api/users/qwerty',
        name: 'Authorization',
        value: token,
        data: data
    }
    loaderDiv();
    checkPswdRequestToServer(requestObj);

}



//check the seller form data
const checkCompanyName = () => {
    let el = document.getElementById('company-name').value;
    let inputPattern = /^[a-zA-Z0-9_@\!\#\~\$\.\*\-\`\'\,\s]{1,256}$/;
    let value = el.match(inputPattern);
    return value;
}

const checkBusiness = () => {
    let el = document.getElementById('business-type').value;
    let inputPattern = /^[a-zA-Z0-9_@\!\#\~\$\.\*\-\`\'\,\s]{1,256}$/;
    let value = el.match(inputPattern);
    return value;
}

const checkAccount = () => {
    let el = document.getElementById('account-type').value;
    let inputPattern = /^[a-zA-Z0-9_@\!\#\~\$\.\*\-\`\'\,\s]{1,256}$/;
    let value = el.match(inputPattern);
    return value;
}

const checkContact = () => {
    let el = document.getElementById('contact').value;
    let inputPattern = /^[a-zA-Z0-9_@\!\#\~\$\.\*\-\`\'\,\s]{1,256}$/;
    let value = el.match(inputPattern);
    return value;
}
const checkEmail = () => {
    let el = document.getElementById('email').value;
    //console.log(el);
    let emailPattern = /^([a-zA-Z0-9_\-\.\$]+)@([a-zA-Z0-9_\-\.\$]+)\.([a-zA-Z]{2,5})$/;
    let value = el.match(emailPattern);
    if (!value) {
        document.getElementById('email-err-msg').innerText = "Enter valid email address";
        document.getElementById('email-err-msg').style.color = "red";
    } else {
        document.getElementById('email-err-msg').innerText = "Email is valid";
        document.getElementById('email-err-msg').style.color = "green";
    }
    return value;
}

const validateDataOfSeller = () => {
    let company_name = document.getElementById('company-name').value;
    let email = document.getElementById('email').value;
    let business_type = document.getElementById('business-type').value;
    let account_type = document.getElementById('account-type').value;
    let contact = document.getElementById('contact').value;
    let data = {
        company_name,
        email,
        business_type,
        account_type,
        contact
    };

    getSellerDataInput();
    let companyVal = checkCompanyName();
    let emailVal = checkEmail();
    let businessVal = checkBusiness();
    let accountVal = checkAccount();
    let contactVal = checkContact();

    if (company_name === "" || email === "" || business_type === "" || account_type === "" || contact === "") return;
    if (companyVal === null || emailVal === null || businessVal === null || accountVal === null || contactVal === null) return;

    return data;

}

//make request to server

const apiRequestOfSeller = () => {
    let checkedData = validateDataOfSeller()
    if (checkedData == null) return;
    let token = userStore.authToken();
    let requestObject = {
        method: 'POST',
        url: '/api/sellers/seller',
        name: 'Authorization',
        value: token,
        data: checkedData
    }
    loaderDiv();
    makeRequestToServer(requestObject)
        .then((msgObj) => {
            if (JSON.parse(localStorage.getItem("sellerAccessToken"))) {
                localStorage.removeItem("sellerAccessToken");
            }
            location.hash = "#seller-product";
            if (msgObj) {
                let msgObject = {
                    message: msgObj.msg,
                    code: '&#10004',
                    term: 'Success',
                    value1: 'info-style',
                    value2: 'success'
                }
                showMsg(msgObject);
            }

        })
        .catch(errObj => {
            //console.log(errObj);
            if (errObj) {
                let msgObject = {
                    message: errObj.message,
                    code: '&#10008',
                    term: 'Failure',
                    value1: 'info-style',
                    value2: 'failure'
                }
                showMsg(msgObject);
            }
        })
        .finally(() => {
            removeOverlayLoader();
        });

}


//if seller registered 

const checkEmailRequestToServer = (requestObj = {}) => {
    makeRequestToServer(requestObj)
        .then((msgObj) => {
            let sellerToken = msgObj.sellerToken;
            localStorage.setItem("sellerAccessToken", JSON.stringify(sellerToken));
            let sellerAccessToken = JSON.parse(localStorage.getItem("sellerAccessToken"));
            userStore.authSellerToken(sellerAccessToken);
            if (sellerToken) return removeModal();
        })
        .catch(errObj => {
            //console.log(errObj);
            if (errObj) {
                let msgObject = {
                    message: errObj.message,
                    code: '&#10008',
                    term: 'Failure',
                    value1: 'info-style',
                    value2: 'failure'
                }
                showMsg(msgObject);
            }
        })
        .finally(() => {
            removeOverlayLoader();
        });
}

const checksTheSellerEmail = () => {
    let token = userStore.authToken();
    let email = document.getElementById("email2").value;
    if (email === "") return alert('Email is invalid');
    let emailPattern = /^([a-zA-Z0-9_\-\.\$]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/;
    let value = email.match(emailPattern);
    if (value === null) return alert('Email is invalid');
    let data = {
        email
    }
    let requestObj = {
        method: 'POST',
        url: '/api/sellers/qwerty_email',
        name: 'Authorization',
        value: token,
        data: data
    }
    loaderDiv();
    checkEmailRequestToServer(requestObj);
}
const removeModal = () => {
    if (document.getElementById('model-content')) {
        const modal = document.getElementById('modal');
        modal.style.visibility = "hidden";
        document.body.style.overflowY = "scroll";
        modal.removeChild(document.getElementById('model-content'));
        return;
    }
}


//used when navigate to product page

const productModalShow = () => {
    let askSellerEmail = sellerAccount();
    showModel(askSellerEmail);
    document.getElementById("close2").style.display = 'none';
    events("#selling-btn", "click", checksTheSellerEmail)
}

//check the product data

const inputElementsOfProduct = () => {
    let selectElement = document.getElementById("dropdownBox2");
    let category = selectElement.options[selectElement.selectedIndex].text;
    return {
        item: document.getElementById('item-name'),
        brand: document.getElementById('brand-name'),
        category: category,
        price: document.getElementById('sell-price'),
        quantity: document.getElementById('quantity'),
        maximum: document.getElementById('max-quantity'),
        shipping: document.getElementById('shipping-cost'),
        features: document.getElementById('product-features'),
        description: document.getElementById('textarea'),
        product_img: document.querySelector("input[type='file']")
    }
}

const checkProdData = () => {
    let inputPattern = /^[a-zA-Z0-9_@\!\#\~\$\.\*\-\`\'\,\s]{1,256}$/;
    let numPattern = /^[0-9\,\.]{1,9}$/;
    let inputObj = inputElementsOfProduct();
    let { item, brand, category, price, quantity, maximum, shipping, features, description, product_img } = inputObj;

    let item2 = item.value.match(inputPattern);
    console.log(item2);
    let brand2 = brand.value.match(inputPattern);
    let price2 = price.value.match(numPattern);
    let quantity2 = quantity.value.match(numPattern);
    let maximum2 = maximum.value.match(numPattern);
    let shipping2 = shipping.value.match(numPattern);
    let features2 = features.value.match(inputPattern);
    let description2 = description.value.match(inputPattern);

    if (item.value === "" || brand.value === "" || category === "" || price.value === "" || quantity.value === "" || maximum.value == "" || shipping.value === "'" || features.value === "" || description.value === "" || product_img.value === "") return false;

    if (item2 === null || brand2 === null || price2 === null || quantity2 === null || maximum2 === null || shipping2 === null || features2 === null || description2 === null) return false;
}

//api request to server for products

const apiRequestForProducts = () => {
    let sellerToken = userStore.authSellerToken();
    if (!sellerToken) return;
    let product_obj = inputElementsOfProduct();
    let { item, brand, category, price, quantity, maximum, shipping, features, description } = product_obj;
    let imageValue = document.querySelector(".image-preview").getAttribute('src');

    let data = {
        item_name: item.value,
        brand_name: brand.value,
        category: category,
        price: price.value,
        quantity: quantity.value,
        max_quantity: maximum.value,
        shipping_cost: shipping.value,
        features: features.value,
        description: description.value,
        image: imageValue

    }
    let requestObj = {
        method: 'POST',
        url: '/api/sellers/product',
        name: 'Authorization',
        value: sellerToken,
        data: data
    }
    loaderDiv();
    //console.log(data);

    makeRequestToServer(requestObj)
        .then(() => {
            //location.hash = "#sell-on-shopify";
            alert("Your product is successfully saved");
        })
        .catch(errObj => {
            //console.log(errObj);
            if (errObj) {
                let msgObject = {
                    message: errObj.message,
                    code: '&#10008',
                    term: 'Failure',
                    value1: 'info-style',
                    value2: 'failure'
                }
                showMsg(msgObject);
            }
        })
        .finally(() => {
            removeOverlayLoader();
        });
}

const validateProductForm = () => {
    let check = checkProdData();
    getProductData();
    if (check === false) return;
    apiRequestForProducts();
}

//gets the data from user store 

const getSellerDataInput = () => {
    let company = document.getElementById('company-name').value;
    let email = document.getElementById('email').value;
    let business = document.getElementById('business-type').value;
    let account = document.getElementById('account-type').value;
    let contact = document.getElementById('contact').value;

    let data = {
        company,
        email,
        business,
        account,
        contact,
    }

    userStore.setSellerDataObj(data);
}
const keepDataOnInput = () => {
    let company = document.getElementById('company-name');
    let email = document.getElementById('email');
    let business = document.getElementById('business-type');
    let account = document.getElementById('account-type');
    let contact = document.getElementById('contact');


    let dataObj = userStore.getSellerDataObj();
    //console.log(dataObj);
    if (dataObj === undefined) return;

    //sets the user entered data on inputs
    company.value = dataObj.company;
    email.value = dataObj.email;
    business.value = dataObj.business;
    account.value = dataObj.account;
    contact.value = dataObj.contact;

}

//gets product data from user store

const getProductData = () => {
    let inputObj = inputElementsOfProduct();
    let { item, brand, price, quantity, maximum, shipping, features } = inputObj;
    let data = {
        item: item.value,
        brand: brand.value,
        price: price.value,
        quantity: quantity.value,
        maximum: maximum.value,
        shipping: shipping.value,
        features: features.value
    }
    userStore.setProductDataObj(data);
}
const setsProductData = () => {
    let inputEls = inputElementsOfProduct();
    let { item, brand, price, quantity, maximum, shipping, features } = inputEls;

    let dataObj = userStore.getProductDataObj();
    //console.log(dataObj);
    if (dataObj === undefined) return;

    item.value = dataObj.item;
    brand.value = dataObj.brand;
    price.value = dataObj.price;
    quantity.value = dataObj.quantity;
    maximum.value = dataObj.maximum;
    shipping.value = dataObj.shipping;
    features.value = dataObj.features;
}


const sellerCentralEvents = () => {
    events("#email", "keyup", checkEmail);
    events('#sellButton', "click", () => {
        apiRequestOfSeller();
    });
    events("#click-to-sell", 'click', () => {
        location.hash = "#seller-product";
    });
    events("#seller-log-out", "click", () => {
        logOut();
    });
}
const productPageEvents = () => {
    events("#save-btn", "click", validateProductForm);
    events("#seller-log-out", "click", () => {
        logOut();
    });
}



module.exports = { sellerConfirmation, sellerCentralEvents, keepDataOnInput, setsProductData, validateProductForm, productModalShow, removeModal, productPageEvents };