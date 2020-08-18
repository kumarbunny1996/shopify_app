const makeRequestToServer = require("../ajax/ajax");
const countriesData = require("../../../countries");
const { itemStorage } = require("../utils/userStore");
const { events } = require("../app/uiHandler");
const userStore = require("../utils/userStore");
//const { savedAddressUI } = require("./address");
const { removeModal } = require("../app/sellerLogic");
const { loader, removeLoader } = require("../utils/utils");

const editDeliveryAddressComponent = () => {

    return `
        <div class="delivery-edit-section" id="delivery-edit-section">
            <h3><span>@</span>Shopify.in</h3>
            <h3>Edit delivery address</h3>
            <div class="delivery-edit-form">
                <div class="input-block" id="country-list2">
                    <label for="select-country2">Select country:</label>
                    <select class="crs" id="select-country2" data-religion-id="abc">
                    </select>
                </div>
                <p class="err-content-add" id="one-edit">Field is required</p>
                <div class="input-block" id="name-input2">
                    <label for="name2">Name:</label>
                    <input class="input" type="text" id="name2" autocomplete="off">
                </div>
                <p class="err-content-add" id="two-edit">Field is required</p>
                <div class="input-block" id="street-input2">
                    <label for="street2">Street:</label>
                    <input class="input" type="text" id="street2" autocomplete="off">
                </div>
                <p class="err-content-add" id="three-edit">Field is required</p>
                <div class="input-block" id="city-input">
                    <label for="city-town2">Town/City:</label>
                    <input class="input" type="text" id="city-town2" autocomplete="off">
                </div>
                <p class="err-content-add" id="four-edit">Field is required</p>
                <div class="input-block">
                    <label for="state2">Select state:</label>
                    <select class="crs" id="state2" data-religion-id="abc"></select>
                </div>
                <p class="err-content-add" id="five-edit">Field is required</p>
                <div class="input-block">
                    <label for="pin-code2">Pin-code:</label>
                    <input class="input" type="text" id="pin-code2" autocomplete="off">
                </div>
                 <p class="err-content-add" id="six-edit">Field is required</p>
                <p id="qwerty2">All fields are required</p>
                <div class="btn">
                    <button id="save-btn-add">Save changes</button>
                </div>
            </div>
        </div>
    `;
}
const savedEditAddressUI = (address = []) => {
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
const countriesOptionsEditUI = () => {
    //console.log(countriesData);
    let selectElement = document.getElementById("select-country2");
    let result = "";
    countriesData.forEach(country => {
        result += `<option value="${country.countryName}">${country.countryName}</option>`;
    });
    selectElement.innerHTML = result;
}

//state option dom
const stateOptionsEditUI = (e) => {
    let stateSelect = document.getElementById("state2");
    let selectElement = document.getElementById("select-country2");
    //let countryValue = selectElement.options[selectElement.selectedIndex].text;
    let countryValue = selectElement.value;
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

const checkEditButtonStatus = (button) => {
        if (isNameDisabled === true || isStreetDisabled === true || isCityDisabled === true || isPinCodeDisabled === true) {
            document.getElementById(button).disabled = true;
        } else {
            document.getElementById(button).disabled = false;
        }
    }
    //check the name input
const checkEditNameInput = (e) => {
        let name = document.getElementById('name2').value;
        let msg = document.getElementById('two-edit');
        let button = "save-btn-add";
        let re = /^([a-zA-Z\s]){1,256}$/;
        if (!re.exec(name)) {
            name = "";
            msg.classList.add("err-style");
            msg.style.display = 'block';
            msg.innerText = 'Enter valid name';
            e.target.style.border = "3px solid rgb(255, 130, 130)";
            isNameDisabled = true;
            checkEditButtonStatus(button);
        } else {
            msg.style.display = "none";
            msg.classList.remove("err-style");
            e.target.style.border = "3px solid rgb(82, 175, 82)";
            isNameDisabled = false;
            checkEditButtonStatus(button)
        }
    }
    //check street address

const checkEditStreetInput = (e) => {
    let street = document.getElementById('street2').value;
    let msg = document.getElementById('three-edit');
    let re = /^([a-zA-Z0-9_\-\./\,\'\s]){1,1026}$/;
    let button = "save-btn-add";
    if (!re.exec(street)) {
        street = "";
        msg.classList.add("err-style");
        msg.style.display = 'block';
        msg.innerText = 'Enter valid address';
        e.target.style.border = "3px solid rgb(255, 130, 130)";
        isStreetDisabled = true;
        checkEditButtonStatus(button);
    } else {
        msg.style.display = "none";
        msg.classList.remove("err-style");
        e.target.style.border = "3px solid rgb(82, 175, 82)";
        isStreetDisabled = false;
        checkEditButtonStatus(button)
    }
}

//checks the city or town
const checkEditCityOrTownInput = (e) => {
    let cityOrTown = document.getElementById('city-town2').value;
    let msg = document.getElementById('four-edit');
    let button = "save-btn-add";
    let re = /^([a-zA-Z\s]){1,252}$/;
    if (!re.exec(cityOrTown)) {
        cityOrTown = "";
        msg.classList.add("err-style");
        msg.style.display = 'block';
        msg.innerText = 'Enter valid city/town';
        e.target.style.border = "3px solid rgb(255, 130, 130)";
        isCityDisabled = true;
        checkEditButtonStatus(button);
    } else {
        msg.style.display = "none";
        msg.classList.remove("err-style");
        e.target.style.border = "3px solid rgb(82, 175, 82)";
        isCityDisabled = false;
        checkEditButtonStatus(button)
    }
}

const checkEditPinCodeInput = (e) => {
    let pin_code = document.getElementById('pin-code2').value;
    let msg = document.getElementById('six-edit');
    let button = "save-btn-add";
    let regex = /^\d{3}\s?\d{3}$/;

    if (!pin_code.match(regex)) {
        pin_code = "";
        msg.classList.add("err-style");
        msg.style.display = 'block';
        msg.innerText = 'Enter valid postal code';
        e.target.style.border = "3px solid rgb(255, 130, 130)";
        isPinCodeDisabled = true;
        checkEditButtonStatus(button);
    } else {
        msg.style.display = "none";
        msg.classList.remove("err-style");
        e.target.style.border = "3px solid rgb(82, 175, 82)";
        isPinCodeDisabled = false;
        checkEditButtonStatus(button)
    }
}

const editDeliveryAddressToDb = (id) => {
    let token = userStore.authToken();
    let name = document.getElementById('name2').value;
    let street = document.getElementById('street2').value;
    let township = document.getElementById('city-town2').value;
    let pin_code = document.getElementById('pin-code2').value;
    2
    let stateSelect = document.getElementById("state2");
    let selectElement = document.getElementById("select-country2");
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
        method: 'PUT',
        url: `/api/users/edit_delivery_address/${id}`,
        name: 'Authorization',
        value: token,
        data: data
    }
    loader();
    makeRequestToServer(requestObj)
        .then(obj => {
            let isUpdated = obj.is_updated;
            if (isUpdated) {
                let address = itemStorage.getItem("address");
                let addressObj = address['address'];
                let index = addressObj.findIndex(item => item._id == id);
                let item = addressObj.find(item => item._id == id);
                item.name = name;
                item.street = street;
                item.township = township;
                item.pin_code = pin_code;
                item.state = state;
                item.country = country;
                addressObj.splice(index, 1, item);
                savedEditAddressUI(addressObj);
                removeModal();
            }
        })
        .catch(err => console.log(err))
        .finally(() => removeLoader());
}
const validateEditDeliverForm = (button, id) => {
    let name = document.getElementById('name2').value;
    let street = document.getElementById('street2').value;
    let cityOrTown = document.getElementById('city-town2').value;
    let pin_code = document.getElementById('pin-code2').value;
    if (name === "" || street === "" || cityOrTown === "" || pin_code === "") {
        button.disabled = true;
        return;
    } else {
        button.disabled = false;
        window.scrollTo(0, 0);
        editDeliveryAddressToDb(id);
    }

}
const addressEditInputEvents = (id) => {
    events("#select-country2", 'change', (e) => {
        stateOptionsEditUI(e);
    });

    events("#name2", 'keyup', (e) => {
        checkEditNameInput(e);
    });
    events("#name2", 'blur', (e) => {
        let msg = document.getElementById('two-edit');
        let value = e.target.value;
        let button = "save-btn-add"
        if (value === "") {
            msg.classList.add("err-style");
            msg.style.display = 'block';
            msg.innerText = 'Field is required';
            e.target.style.border = "3px solid rgb(255, 130, 130)";
            isPinCodeDisabled = true;
            checkEditButtonStatus(button);
        }

    });
    events("#street2", 'keyup', (e) => {
        checkEditStreetInput(e);
    });
    events("#street2", 'blur', (e) => {
        let msg = document.getElementById('three-edit');
        let value = e.target.value;
        let button = "save-btn-add"
        if (value === "") {
            msg.classList.add("err-style");
            msg.style.display = 'block';
            msg.innerText = 'Field is required';
            e.target.style.border = "3px solid rgb(255, 130, 130)";
            isPinCodeDisabled = true;
            checkEditButtonStatus(button);
        }
    });
    events("#city-town2", 'keyup', (e) => {
        checkEditCityOrTownInput(e);
    });
    events("#city-town2", 'blur', (e) => {
        let msg = document.getElementById('four-edit');
        let value = e.target.value;
        let button = "save-btn-add"
        if (value === "") {
            msg.classList.add("err-style");
            msg.style.display = 'block';
            msg.innerText = 'Field is required';
            e.target.style.border = "3px solid rgb(255, 130, 130)";
            isPinCodeDisabled = true;
            checkEditButtonStatus(button);
        }
    });
    events("#pin-code2", 'keyup', (e) => {
        checkEditPinCodeInput(e);
    });
    events("#pin-code2", 'blur', (e) => {
        let msg = document.getElementById('six-edit');
        let value = e.target.value;
        let button = "save-btn-add"
        if (value === "") {
            msg.classList.add("err-style");
            msg.innerText = 'Field is required';
            msg.style.display = 'block';
            e.target.style.border = "3px solid rgb(255, 130, 130)";
            isPinCodeDisabled = true;
            checkEditButtonStatus(button);
        }
    });
    events("#save-btn-add", 'click', (e) => {
        let button = e.target;
        validateEditDeliverForm(button, id);
    });
}

module.exports = {
    editDeliveryAddressComponent,
    addressEditInputEvents,
    stateOptionsEditUI,
    countriesOptionsEditUI,
}