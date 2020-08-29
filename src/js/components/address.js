require('../../css/address.css');
const makeRequestToServer = require("../ajax/ajax");
const countriesData = require("../../../countries");
const { itemStorage } = require("../utils/userStore");
const { events, showModel, showPopup, closePopup, removeOverlayLoader } = require("../app/uiHandler");
const userStore = require("../utils/userStore");
const { loader, removeLoader, blurLoader, removeBlurLoader, loaderDiv } = require("../utils/utils");
const { editDeliveryAddressComponent, addressEditInputEvents, countriesOptionsEditUI, stateOptionsEditUI } = require('./edit');
const { removeModal } = require('../app/sellerLogic');
const deliveryAddressComponent = () => {
    const deliveryCont = document.getElementById("main-content");
    document.title = 'Select a delivery address';
    deliveryCont.innerHTML = `
        <div class="delivery-section" id="delivery-section">
            <h1><span>@</span>Shopify.in</h1>
            <h2 class="delivery-head">Select a delivery address</h2>
            <div class="saved-delivery-block" id="saved-delivery-block">
                <p id="no-address">There is no saved address</p>
            </div>
            <h2>Create a new address</h2>
            <div class="delivery-form">
                <h3>Delivery address:</h3>
                <div class="input-block" id="country-list">
                    <label for="select-country">Select country:</label>
                    <select class="crs" id="select-country" data-religion-id="abc">
                    </select>
                </div>
                <p class="err-content-add" id="one">Field is required</p>
                <div class="input-block" id="name-input">
                    <label for="name">Name:</label>
                    <input class="input" type="text" id="name" autocomplete="off">
                </div>
                <p class="err-content-add" id="two">Field is required</p>
                <div class="input-block" id="street-input">
                    <label for="street">Street:</label>
                    <input class="input" type="text" id="street" autocomplete="off">
                </div>
                <p class="err-content-add" id="three">Field is required</p>
                <div class="input-block" id="city-input">
                    <label for="city-town">Town/City:</label>
                    <input class="input" type="text" id="city-town" autocomplete="off">
                </div>
                <p class="err-content-add" id="four">Field is required</p>
                <div class="input-block">
                    <label for="state">Select state:</label>
                    <select class="crs" id="state" data-religion-id="abc"></select>
                </div>
                <p class="err-content-add" id="five">Field is required</p>
                <div class="input-block">
                    <label for="pin-code">Pin-code:</label>
                    <input class="input" type="text" id="pin-code" autocomplete="off">
                </div>
                 <p class="err-content-add" id="six">Field is required</p>
                <p id="qwerty">All fields are required</p>
                <div class="btn">
                    <button id="deliver-btn-add">Deliver this address</button>
                </div>
            </div>
        </div>
    `;
}

const savedAddressUI = (address = []) => {
        let parent = document.getElementById("saved-delivery-block");
        let result = "";
        address.forEach(address => {
            result += `
        <div class="address-block">
            <p>${address.name}</p>
            <p>${address.street}</p>
            <p>${address.township}</p>
            <p>${address.state} - <span>${address.pin_code}</span></p>
            <div class="btn">
                <button data-id="${address._id}" data-deliver="deliver">Deliver this address</button>
            </div>
            <div class="btns" id="btns">
                <button data-id="${address._id}" data-edit="edit">Edit</button>
                <button data-id="${address._id}" data-delete="delete">Delete</button>
            </div>    
        </div>
    `;
        });
        parent.innerHTML = result;

    }
    //sets the select dom for country option
const countriesOptionsUI = () => {
    //console.log(countriesData);
    let selectElement = document.getElementById("select-country");
    let result = "";
    countriesData.forEach(country => {
        result += `<option value="${country.countryName}">${country.countryName}</option>`;
    });
    selectElement.innerHTML = result;
}

//state option dom
const stateOptionsUI = (e) => {
        let stateSelect = document.getElementById("state");
        let selectElement = document.getElementById("select-country");
        let countryValue = selectElement.options[selectElement.selectedIndex].text;
        let country = countriesData.find(country => {
            return country.countryName === countryValue;
        });
        let regions = country.regions;
        let result = "";
        regions.forEach(region => {
            result += `<option value="${region.name}">${region.name}</option>`;
        });
        stateSelect.innerHTML = result;
    }
    //sets the default status
let isNameDisabled = false,
    isStreetDisabled = false,
    isCityDisabled = false,
    isPinCodeDisabled = false;
//checks the button status

const checkButtonStatus = (button) => {
    if (isNameDisabled === true || isStreetDisabled === true || isCityDisabled === true || isPinCodeDisabled === true) {
        document.getElementById(button).disabled = true;
    } else {
        document.getElementById(button).disabled = false;
    }
}


//check the name input
const checkNameInput = (e) => {
        let name = document.getElementById('name').value;
        let msg = document.getElementById('two');
        let button = "deliver-btn-add";
        let re = /^([a-zA-Z\s]){1,256}$/;
        if (!re.exec(name)) {
            name = "";
            msg.classList.add("err-style");
            msg.style.display = 'block';
            msg.innerText = 'Enter valid name';
            e.target.style.border = "3px solid rgb(255, 130, 130)";
            isNameDisabled = true;
            checkButtonStatus(button);
        } else {
            msg.style.display = "none";
            msg.classList.remove("err-style");
            e.target.style.border = "3px solid rgb(82, 175, 82)";
            isNameDisabled = false;
            checkButtonStatus(button)
        }
    }
    //check street address

const checkStreetInput = (e) => {
    let street = document.getElementById('street').value;
    let msg = document.getElementById('three');
    let re = /^([a-zA-Z0-9_\-\./\,\'\s]){1,1026}$/;
    let button = "deliver-btn-add";
    if (!re.exec(street)) {
        street = "";
        msg.classList.add("err-style");
        msg.style.display = 'block';
        msg.innerText = 'Enter valid address';
        e.target.style.border = "3px solid rgb(255, 130, 130)";
        isStreetDisabled = true;
        checkButtonStatus(button);
    } else {
        msg.style.display = "none";
        msg.classList.remove("err-style");
        e.target.style.border = "3px solid rgb(82, 175, 82)";
        isStreetDisabled = false;
        checkButtonStatus(button)
    }
}

//checks the city or town
const checkCityOrTownInput = (e) => {
    let cityOrTown = document.getElementById('city-town').value;
    let msg = document.getElementById('four');
    let button = "deliver-btn-add";
    let re = /^([a-zA-Z\s]){1,252}$/;
    if (!re.exec(cityOrTown)) {
        cityOrTown = "";
        msg.classList.add("err-style");
        msg.style.display = 'block';
        msg.innerText = 'Enter valid city/town';
        e.target.style.border = "3px solid rgb(255, 130, 130)";
        isCityDisabled = true;
        checkButtonStatus(button);
    } else {
        msg.style.display = "none";
        msg.classList.remove("err-style");
        e.target.style.border = "3px solid rgb(82, 175, 82)";
        isCityDisabled = false;
        checkButtonStatus(button)
    }
}

const checkPinCodeInput = (e) => {
    let pin_code = document.getElementById('pin-code').value;
    let msg = document.getElementById('six');
    let button = "deliver-btn-add";
    let regex = /^\d{3}\s?\d{3}$/;

    if (!pin_code.match(regex)) {
        pin_code = "";
        msg.classList.add("err-style");
        msg.style.display = 'block';
        msg.innerText = 'Enter valid postal code';
        e.target.style.border = "3px solid rgb(255, 130, 130)";
        isPinCodeDisabled = true;
        checkButtonStatus(button);
    } else {
        msg.style.display = "none";
        msg.classList.remove("err-style");
        e.target.style.border = "3px solid rgb(82, 175, 82)";
        isPinCodeDisabled = false;
        checkButtonStatus(button)
    }
}

//edit address dom
const editPage = (e, id) => {
    let editAddress = editDeliveryAddressComponent();
    showModel(editAddress);
    countriesOptionsEditUI();
    let address = itemStorage.getItem('address');
    let addressObj = address['address'];
    let item = addressObj.find(item => item._id == id);
    let name2 = document.getElementById('name2');
    let street2 = document.getElementById('street2');
    let township2 = document.getElementById('city-town2');
    let pin_code2 = document.getElementById('pin-code2');
    let stateSelect = document.getElementById("state2");
    let selectElement = document.getElementById("select-country2");
    let { name, street, township, pin_code, state, country } = item;
    name2.value = name;
    street2.value = street;
    township2.value = township;
    pin_code2.value = pin_code;
    //sets state and country value
    selectElement.value = country;
    stateOptionsEditUI();
    stateSelect.value = state;
    addressEditInputEvents(id);

}

//delete address
const deleteAddress = (e, id) => {
    let token = userStore.authToken();
    let parent = e.target.parentElement.parentElement;
    let saveBlock = e.target.parentElement.parentElement.parentElement;
    let requestObj = {
        method: 'DELETE',
        url: `/api/users/delete_address/${id}`,
        name: 'Authorization',
        value: token,
        data: null
    }
    blurLoader(parent);
    makeRequestToServer(requestObj)
        .then(obj => {
            let isDelete = obj.is_deleted;
            if (isDelete) {
                let address = itemStorage.getItem("address");
                let addressObj = address['address'];
                let index = addressObj.findIndex(item => item._id == id);
                addressObj.splice(index, 1);
                saveBlock.removeChild(parent);
            }
        })
        .catch(err => console.error(err))
        .finally(() => removeBlurLoader(parent));
}

//delivery option dom

const deliveryOptionsDom = () => {
        return `
        <div class="delivery-options">
            <h2><span>@</span>shopify.in</h2>
            <h2>Choose delivery option</h2>
            <div class="delivery" id="delivery-1">
                <input type="radio" id="one" name="shipping-cost" value="40.00">
                <label for="one">
                    One day delivery
                     <p>Shipping cost: <i>&#8377;</i>40.00</p>
                </label>
            </div>
            <div class="delivery" id="delivery-2">
                <input type="radio" id="two" name="shipping-cost" value="29.00">
                <label for="two">
                    Within 1-3 days delivery
                    <p>Shipping cost: <i>&#8377;</i>29.00</p>
                </label>
            </div>
             <div class="delivery" id="delivery-3">
                <input type="radio" id="three" name="shipping-cost" value="19.00">
                <label for="three">
                    Within 3-5 days deliver
                    <p>Shipping cost: <i>&#8377;</i> 19.00</p>
                </label>
                <p></p>
            </div>
             <div class="delivery" id="delivery-4">
                <input type="radio" id="four" name="shipping-cost" value="0.00" checked>
                <label for="four">
                     Free delivery
                    <p>Within 7 days</p>
                </label>
                <p></p>
            </div>
            <div class="btn">
                <button id="cont-btn">Continue</button>
            </div>
        </div>
    `;
    }
    //saving the address to server
const addDeliveryAddressToDb = (e) => {
    let token = userStore.authToken();
    let name = document.getElementById('name').value;
    let street = document.getElementById('street').value;
    let township = document.getElementById('city-town').value;
    let pin_code = document.getElementById('pin-code').value;
    let stateSelect = document.getElementById("state");
    let selectElement = document.getElementById("select-country");
    let country = selectElement.options[selectElement.selectedIndex].text;
    let state = stateSelect.options[stateSelect.selectedIndex].text;
    let data = {
        name,
        street,
        township,
        pin_code,
        state,
        country
    }
    let requestObj = {
        method: 'POST',
        url: `/api/users/add_delivery_address`,
        name: 'Authorization',
        value: token,
        data: data
    }
    loaderDiv();
    makeRequestToServer(requestObj)
        .then(obj => {
            let singleAddress = obj.address;
            let deliveryOptions = deliveryOptionsDom();
            if (itemStorage.getItem("addressObject")) {
                itemStorage.removeItem("addressObject");
                itemStorage.setItem("addressObject", singleAddress);
                showPopup(deliveryOptions);
                events("#cont-btn", 'click', (e) => {
                    deliveryOptionLogic(e);
                });
            } else {
                itemStorage.setItem("addressObject", singleAddress);
                showPopup(deliveryOptions);
                events("#cont-btn", 'click', (e) => {
                    deliveryOptionLogic(e);
                });
            }
        })
        .catch(err => console.log(err))
        .finally(() => removeOverlayLoader());
}

//show the delivery option dom when clicking the btn
const deliveryOptionsPage = (e, id) => {
    let token = userStore.authToken();
    let parent = e.target.parentElement.parentElement;
    let requestObj = {
        method: 'GET',
        url: `/api/users/get_delivery_address/${id}`,
        name: 'Authorization',
        value: token,
        data: null
    }
    blurLoader(parent);
    makeRequestToServer(requestObj)
        .then(obj => {
            let singleAddress = obj.address;
            let deliveryOptions = deliveryOptionsDom();
            if (itemStorage.getItem("addressObject")) {
                itemStorage.removeItem("addressObject");
                itemStorage.setItem("addressObject", singleAddress);
                showPopup(deliveryOptions);
                events("#cont-btn", 'click', (e) => {
                    deliveryOptionLogic(e);
                });
            } else {
                itemStorage.setItem("addressObject", singleAddress);
                showPopup(deliveryOptions);
                events("#cont-btn", 'click', (e) => {
                    deliveryOptionLogic(e);
                });
            }
        })
        .catch(err => console.log(err))
        .finally(() => removeBlurLoader(parent));
}

const deliveryOptionLogic = (e) => {
    let token = userStore.authToken();
    let button = e.target;
    let radioBtns = document.querySelectorAll("input[type='radio']");
    let value = "";
    for (let i = 0; i < radioBtns.length; i++) {
        let check = radioBtns[i].checked;
        if (check === true) {
            value = radioBtns[i].value;
            console.log(check);
        }
    }
    console.log(value);
    if (value) {
        button.disabled = false;
        let requestObj = {
            method: 'GET',
            url: `/api/users/get_shipping_cost/${value}`,
            name: 'Authorization',
            value: token,
            data: null
        }
        loaderDiv();
        makeRequestToServer(requestObj)
            .then(obj => {
                let addressObj = itemStorage.getItem("addressObject")
                let address = addressObj['addressObject'];
                address.shipping_cost = value;
                if (document.getElementById('popup-content')) {
                    const modal = document.getElementById('popup');
                    modal.style.visibility = "hidden";
                    document.body.style.overflowY = "scroll";
                    modal.removeChild(document.getElementById('popup-content'));
                }
                location.hash = "#payment-gateway";
            })
            .catch(err => console.log(err))
            .finally(() => removeOverlayLoader());
    }

}

//validating form after click the btn
const validateDeliverForm = (button, e) => {
    let name = document.getElementById('name').value;
    let street = document.getElementById('street').value;
    let cityOrTown = document.getElementById('city-town').value;
    let pin_code = document.getElementById('pin-code').value;
    if (name === "" || street === "" || cityOrTown === "" || pin_code === "") {
        button.disabled = true;
        return;
    } else {
        button.disabled = false;
        window.scrollTo(0, 0);
        addDeliveryAddressToDb(e);
    }

}
const addressInputEvents = () => {
    events("#select-country", 'change', (e) => {
        stateOptionsUI(e);
    });

    events("#name", 'keyup', (e) => {
        checkNameInput(e);
    });
    events("#name", 'blur', (e) => {
        let msg = document.getElementById('two');
        let value = e.target.value;
        let button = "deliver-btn-add"
        if (value === "") {
            msg.classList.add("err-style");
            msg.style.display = 'block';
            msg.innerText = 'Field is required';
            e.target.style.border = "3px solid rgb(255, 130, 130)";
            isPinCodeDisabled = true;
            checkButtonStatus(button);
        }

    });
    events("#street", 'keyup', (e) => {
        checkStreetInput(e);
    });
    events("#street", 'blur', (e) => {
        let msg = document.getElementById('three');
        let value = e.target.value;
        let button = "deliver-btn-add"
        if (value === "") {
            msg.classList.add("err-style");
            msg.style.display = 'block';
            msg.innerText = 'Field is required';
            e.target.style.border = "3px solid rgb(255, 130, 130)";
            isPinCodeDisabled = true;
            checkButtonStatus(button);
        }
    });
    events("#city-town", 'keyup', (e) => {
        checkCityOrTownInput(e);
    });
    events("#city-town", 'blur', (e) => {
        let msg = document.getElementById('four');
        let value = e.target.value;
        let button = "deliver-btn-add"
        if (value === "") {
            msg.classList.add("err-style");
            msg.style.display = 'block';
            msg.innerText = 'Field is required';
            e.target.style.border = "3px solid rgb(255, 130, 130)";
            isPinCodeDisabled = true;
            checkButtonStatus(button);
        }
    });
    events("#pin-code", 'keyup', (e) => {
        checkPinCodeInput(e);
    });
    events("#pin-code", 'blur', (e) => {
        let msg = document.getElementById('six');
        let value = e.target.value;
        let button = "deliver-btn-add"
        if (value === "") {
            msg.classList.add("err-style");
            msg.innerText = 'Field is required';
            msg.style.display = 'block';
            e.target.style.border = "3px solid rgb(255, 130, 130)";
            isPinCodeDisabled = true;
            checkButtonStatus(button);
        }
    });
    events("#deliver-btn-add", 'click', (e) => {
        let button = e.target;
        validateDeliverForm(button, e);
    });
    events("#saved-delivery-block", 'click', (e) => {
        e.stopPropagation();
        let id = e.target.dataset.id;
        //console.log(id);
        if (id === undefined) return;
        if (id) {
            let edit = e.target.dataset.edit;
            let del = e.target.dataset.delete;
            let delivery = e.target.dataset.deliver;
            if (edit === "edit") return editPage(e, id);
            if (del === "delete") return deleteAddress(e, id);
            if (delivery = "deliver") return deliveryOptionsPage(e, id);
        }
    });
}

//check the user address exits or not;
const addressUI = () => {
    let address = itemStorage.getItem("address");
    let delivery_address = address["address"];
    if (delivery_address.length === 0) {
        deliveryAddressComponent();
        countriesOptionsUI();
        stateOptionsUI();
        addressInputEvents();
    } else {
        deliveryAddressComponent();
        countriesOptionsUI();
        stateOptionsUI();
        document.getElementById('no-address').style.display = "none";
        savedAddressUI(delivery_address);
        addressInputEvents();
    }
}


module.exports = {
    addressUI,
    countriesOptionsUI,
    stateOptionsUI,
    addressInputEvents,
    savedAddressUI,
}