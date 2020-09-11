const { events, removeOverlayLoader } = require("../app/uiHandler");
const { itemStorage } = require("../utils/userStore");
const userStore = require("../utils/userStore");
const { loaderDiv, debouncing } = require("../utils/utils");
const makeRequestToServer = require("../ajax/ajax");
require("../../css/account.css");

const accountDom = () => {
    let content = document.getElementById('main-content');
    content.innerHTML = `
        <section class="your-account" id="your-account">
            <h2>Your account</h2>
            <div class="account-main-block">
                <div class="account-block" id="orders-page">
                    <img src="/public/images/commonStore/order.svg">
                    <div class="details-block">
                        <h3>Your orders</h3>
                        <p>Track, return or buy things again</p>
                    </div>
                </div>
                 <div class="account-block" id="your-address">
                    <img src="/public/images/commonStore/address.svg">
                    <div class="details-block">
                        <h3>Your address</h3>
                        <p>Edit your address details</p>
                    </div>
                </div>
                 <div class="account-block" id="edit-account">
                    <img src="/public/images/commonStore/padlock.svg">
                    <div class="details-block">
                        <h3>Login& security</h3>
                        <p>Edit login, name, mobile and email</p>
                    </div>
                </div>
                 <div class="account-block" id="your-payment">
                    <img src="/public/images/commonStore/shopify.svg">
                    <div class="details-block">
                        <h3>Your payment options</h3>
                        <p>Edit and set new payment methods</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

const editAccountForm = (e) => {
    let content = document.getElementById('main-content');
    content.innerHTML = `
        <section class="edit-account-section">
            <div class="links-edit">
                <a href="#your-account" id="style-account">Your account</a>
                <span id="icon-style">&#10139;</span>
                <span id="style-login">Login & Security</span>
            </div>
            <div id="msg-block"></div>
            <h2>Edit your account</h2>
            <div class="edit-account-block" id="edit-account-block">    
            </div>
        </section>
    `;
}
const editFormCont = (config = {}) => {
    let content = document.getElementById('edit-account-block');
    content.innerHTML = `
        <div class="edit-input">
            <div class="head-block">
                <h4>Name</h4>
                <p>${config.username}</p>
            </div>
            <div class="edit-btn">
                <button data-button="edit-btn-name">Edit</button>
            </div>
        </div>
        <div class="line"></div>
        <div class="edit-input">
            <div class="head-block">
                <h4>Email</h4>
                <p>${config.email}</p>
            </div>
            <div class="edit-btn">
                <button data-button="edit-btn-email">Edit</button>
            </div>
        </div>
        <div class="line"></div>
        <div class="edit-input">
            <div class="head-block">
                <h4>Mobile</h4>
                <p>${config.mobile}</p>
            </div>
            <div class="edit-btn">
                <button data-button="edit-btn-mobile">Edit</button>
            </div>
        </div>
        <div class="line"></div>
        <div class="edit-input">
            <div class="head-block">
                <h4>Password</h4>
                <p>********</p>
            </div>
            <div class="edit-btn">
                <button data-button="edit-btn-password">Edit</button>
            </div>
        </div>
        <div class="line"></div>
        <div class="done-btn">
            <button data-button="done-btn" id="done-btn">Done</button>
        </div>
    `;
}
const editName = (e, user) => {
    let content = document.getElementById('main-content');
    content.innerHTML = `
        <section class="edit-name-section">
            <div class="links-name">
                <a href="#your-account" id="style-account">Your account</a>
                <span class="icon-style" id="icon-style">&#10139;</span>
                <a href="#edit-account" id="style-login">Login & Security</a>
                <span class="icon-style">&#10139;</span>
                <span id="style-name">Change userName</span>
            </div>
            <div id="msg-block"></div>
            <h2>Change your username</h2>
            <div class="edit-name-block" id="edit-name-block">  
                <h4>Old username:</h4>
                <p>${user.username}</p>
                <label for="name">Enter new username:</label>
                <input id="name" type="text">
                <p id="err-name"></p>
                <div class="btn-name">
                    <button id="save-changes-name">Save changes</button>
                </div>
            </div>
        </section>
    `;
}
const editEmail = (e, user) => {
    let content = document.getElementById('main-content');
    content.innerHTML = `
        <section class="edit-email-section">
            <div class="links-email">
                <a href="#your-account" id="style-account">Your account</a>
                <span class="icon-style" id="icon-style">&#10139;</span>
                <a href="#edit-account" id="style-login">Login & Security</a>
                <span class="icon-style">&#10139;</span>
                <span id="style-email">Change email</span>
            </div>
            <div id="msg-block"></div>
            <h2>Change your email</h2>
            <div class="edit-email-block" id="edit-email-block">  
                <h4>Old email:</h4>
                <p>${user.email}</p>
                <label for="email">Enter new email:</label>
                <input id="email" type="text">
                <p id="err-email"></p>
                <div class="btn-email">
                    <button id="save-changes-email">Save changes</button>
                </div>
            </div>
        </section>
    `;
}

const editMobile = (e, user) => {
    let content = document.getElementById('main-content');
    content.innerHTML = `
        <section class="edit-mobile-section">
            <div class="links-mobile">
                <a href="#your-account" id="style-account">Your account</a>
                <span class="icon-style" id="icon-style">&#10139;</span>
                <a href="#edit-account" id="style-login">Login & Security</a>
                <span class="icon-style">&#10139;</span>
                <span id="style-mobile">Change mobile number</span>
            </div>
            <div id="msg-block"></div>
            <h2>Change your mobile number</h2>
            <div class="edit-mobile-block" id="edit-mobile-block">  
                <h4>Old mobile number:</h4>
                <p>${user.mobile}</p>
                <label for="mobile">Enter new mobile number:</label>
                <input id="mobile" type="text">
                <p id="err-mob"></p>
                <div class="btn-mobile">
                    <button id="save-changes-mobile">Save changes</button>
                </div>
            </div>
        </section>
    `;
}
const editPswd = (e, user) => {
    let content = document.getElementById('main-content');
    content.innerHTML = `
        <section class="edit-password-section">
            <div class="links-pswd">
                <a href="#your-account" id="style-account">Your account</a>
                <span class="icon-style" id="icon-style">&#10139;</span>
                <a href="#edit-account" id="style-login">Login & Security</a>
                <span class="icon-style">&#10139;</span>
                <span id="style-pswd">Change user password</span>
            </div>
            <div id="msg-block"></div>
            <h2>Change your user password</h2>
            <div class="edit-password-block" id="edit-password-block">  
                <label for="old-password">Enter current user password:</label>
                <input id="old-password" type="text">
                <p id="err-old"></p>
                <label for="new-password">Enter new user password:</label>
                <input id="new-password" type="text">
                <p id="err-new"></p>
                <div id="messages-edit" style="display:none;">
                    <h4>Password should be</h4>
                    <p id="letter">A <b>lowercase</b> letter</p>
                    <p id="capital">A <b>capital (uppercase)</b> letter</p>
                    <p id="number">A <b>number</b></p>
                    <p id="length">Minimum <b>8 characters</b></p>
                </div>
                <label for="confirm-password">Confirm user password:</label>
                <input id="confirm-password" type="text">
                <p id="err-confirm"></p>
                <div class="btn-pswd">
                    <button id="save-changes-pswd">Save changes</button>
                </div>
            </div>
        </section>
    `;
}
const checkEditNameInput = (e) => {
    let namePattern = /^[a-zA-Z0-9_@\!\#\~\$\.\*\-\`\'\s]{5,256}$/;
    let nameInput = document.getElementById('name');
    let name = nameInput.value.match(namePattern);
    let msgCont = document.getElementById('err-name');
    if (!name) {
        //nameInput.value = "";
        msgCont.innerText = "Invalid username";
        msgCont.style.display = "block";
        msgCont.style.color = "red";
    } else {
        msgCont.innerText = "Valid username";
        msgCont.style.display = "block";
        msgCont.style.color = "green";
    }
    return name;
}
const checkEditEmailInput = (e) => {
    let emailPattern = /^([a-zA-Z0-9_\-\.\$]+)@([a-zA-Z0-9_\-\.\$]+)\.([a-zA-Z]{2,5})$/;
    let emailInput = document.getElementById('email');
    let email = emailInput.value.match(emailPattern);
    let msgCont = document.getElementById('err-email');
    if (!email) {
        //emailInput.value = "";
        msgCont.innerText = "Invalid email address";
        msgCont.style.display = "block";
        msgCont.style.color = "red";
    } else {
        msgCont.innerText = "Valid email address";
        msgCont.style.display = "block";
        msgCont.style.color = "green";
    }
    return email;
}
const checkEditMobInput = (e) => {
    let mobilePattern = /^[0-9]{10}$/;
    let mobileInput = document.getElementById('mobile');
    let mobile = mobileInput.value.match(mobilePattern);
    let msgCont = document.getElementById('err-mob');
    if (!mobile) {
        //mobileInput.value = "";
        msgCont.innerText = "Invalid mobile number";
        msgCont.style.display = "block";
        msgCont.style.color = "red";
    } else {
        msgCont.innerText = "Valid mobile number";
        msgCont.style.display = "block";
        msgCont.style.color = "green";
    }
    return mobile;
}
const checkEditPswdInput = (e) => {
    let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){8,256}$/;
    let myInput = document.getElementById("old-password");
    let password = myInput.value.match(passwordPattern);
    let msgCont = document.getElementById('err-old');
    if (!password) {
        //myInput.value = "";
        msgCont.innerText = "Invalid user password";
        msgCont.style.display = "block";
        msgCont.style.color = "red";
    } else {
        msgCont.innerText = "Valid user password";
        msgCont.style.display = "block";
        msgCont.style.color = "green";
    }
    return password;
}
const checkEditNewPswdInput = (e) => {
    let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){8,256}$/;
    let myInput = document.getElementById("new-password");
    let password = myInput.value.match(passwordPattern);
    let msgCont = document.getElementById('err-new');
    if (!password) {
        //myInput.value = "";
        msgCont.innerText = "Invalid user password";
        msgCont.style.display = "block";
        msgCont.style.color = "red";
    } else {
        msgCont.innerText = "Valid user password";
        msgCont.style.display = "block";
        msgCont.style.color = "green";
    }
    return password;
}
const checkEditConfirmPswdInput = (e) => {
    let password = document.getElementById("new-password");
    let confirmPassword = document.getElementById("confirm-password");
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){8,256}$/;
    let isConfirmPswd = password.value != confirmPassword.value;
    let msgCont = document.getElementById('err-confirm');
    if (isConfirmPswd || !pattern.exec(password.value)) {
        //confirmPassword.value = "";
        msgCont.innerText = "Mismatching password";
        msgCont.style.display = "block";
        msgCont.style.color = "red";
    } else {
        msgCont.innerText = "Password is matching";
        msgCont.style.display = "block";
        msgCont.style.color = "green";
    }
    return isConfirmPswd;

}

const editRequestToServer = (btn, value) => {
        let token = userStore.authToken();
        let data = {
            btn,
            value
        }
        let requestObject = {
            method: 'POST',
            url: `/api/users/account/${value}`,
            name: 'Authorization',
            value: token,
            data: data,
        }
        loaderDiv();
        makeRequestToServer(requestObject)
            .then(resObj => {
                let userObj = itemStorage.getItem('user');
                let user = userObj['user'];
                if (resObj.value === "name") {
                    userStore.setUsername(resObj.username);
                    user.username = resObj.username;
                    location.hash = "#edit-account";
                    return;
                }
                if (resObj.value === "email") {
                    user.email = resObj.email;
                    location.hash = "#edit-account";
                    return;
                }
                if (resObj.value === "mobile") {
                    user.mobile = resObj.mobile;
                    location.hash = "#edit-account";
                    return;
                }
                if (resObj.isUpdated === true) {
                    location.hash = "#edit-account";
                    return;
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => removeOverlayLoader());

    }
    //edit request to server
const editRequest = (e) => {
    let editNameBtn = e.target.id;
    console.log(editNameBtn);
    let editEmailBtn = e.target.id;
    let editMobileBtn = e.target.id;
    let editPswdBtn = e.target.id;
    if (editNameBtn === "save-changes-name") {
        let nameObj = checkEditNameInput();
        let name = document.getElementById('name').value;
        if (name === "" || nameObj === null) return;
        return editRequestToServer(editNameBtn, name);
    }
    if (editEmailBtn === "save-changes-email") {
        let emailObj = checkEditEmailInput();
        let email = document.getElementById('email').value;
        if (email === "" || emailObj === null) return;
        return editRequestToServer(editEmailBtn, email);
    }
    if (editMobileBtn === "save-changes-mobile") {
        let mobObj = checkEditMobInput();
        let mobile = document.getElementById('mobile').value;
        if (mobile === "" || mobObj === null) return;
        return editRequestToServer(editMobileBtn, mobile);

    }
    if (editPswdBtn === "save-changes-pswd") {
        let newObj = checkEditNewPswdInput();
        let oldObj = checkEditPswdInput();
        let confirmBool = checkEditConfirmPswdInput();
        let pswdOld = document.getElementById('old-password').value;
        let pswdNew = document.getElementById('new-password').value;
        let pswdConfirm = document.getElementById('confirm-password').value;
        if (pswdOld === "" || pswdNew === "" || pswdConfirm === "") return;
        if (newObj === null || oldObj === null || confirmBool === true) return;
        return editRequestToServer(editPswdBtn, pswdNew);

    }
}
const checkUsernameForAvailInEdit = debouncing((e) => {
    let value = e.target.value;
    let btn = document.getElementById("save-changes-name");
    //console.log(value);
    let name = checkEditNameInput();
    let msgCont = document.getElementById('err-name');
    if (name === null) return;
    let requestObject = {
        method: 'GET',
        url: `/api/users/register/username/${value}`,
        name: 'Content-type',
        value: 'application/json',
        data: null
    };
    makeRequestToServer(requestObject)
        .then((msg) => {
            //console.log(msg);
            if (msg) {
                btn.disabled = false;
                msgCont.innerText = "Username is available";
                msgCont.style.display = "block";
                msgCont.style.color = "green";
            }
        })
        .catch(err => {
            //console.log(err);
            if (err) {
                btn.disabled = true;
                msgCont.innerText = "Username not available";
                msgCont.style.display = "block";
                msgCont.style.color = "red";
            }
        });
}, 300)
const checkMobileNumberForAvailInEdit = debouncing((e) => {
    let value = e.target.value;
    let btn = document.getElementById("save-changes-mobile");
    let msgCont = document.getElementById('err-mob');
    //console.log(value);
    let mobile = checkEditMobInput();
    if (mobile === null) return;
    let requestObject = {
        method: 'GET',
        url: `/api/users/register/mobile/${value}`,
        name: 'Content-type',
        value: 'application/json',
        data: null
    };
    makeRequestToServer(requestObject)
        .then((msg) => {
            //console.log(msg);
            if (msg) {
                btn.disabled = false;
                msgCont.innerText = "Mobile number is avail";
                msgCont.style.display = "block";
                msgCont.style.color = "green";
            }
        })
        .catch(err => {
            if (err) {
                btn.disabled = true;
                msgCont.innerText = "Mobile number already exists";
                msgCont.style.display = "block";
                msgCont.style.color = "red";
            }

        });
}, 300);
const checkEmailForAvailInEdit = debouncing((e) => {
    let value = e.target.value;
    let btn = document.getElementById("save-changes-email");
    let msgCont = document.getElementById('err-email');
    //console.log(value);
    let email = checkEditEmailInput();
    if (email === null) return;
    let requestObject = {
        method: 'GET',
        url: `/api/users/register/email/${value}`,
        name: 'Content-type',
        value: 'application/json',
        data: null
    };
    makeRequestToServer(requestObject)
        .then((msg) => {
            //console.log(msg);
            if (msg) {
                btn.disabled = false;
                msgCont.innerText = "Email address is available";
                msgCont.style.display = "block";
                msgCont.style.color = "green";
            }
        })
        .catch(err => {
            if (err) {
                btn.disabled = true;
                msgCont.innerText = "Email address already exists";
                msgCont.style.display = "block";
                msgCont.style.color = "red";
            }
        });
}, 300);

const accountEvents = () => {
    events("#your-address", 'click', (e) => {
        e.stopPropagation();
        location.hash = "#delivery-address"
    });
    events("#orders-page", 'click', (e) => {
        e.stopPropagation();
        location.hash = "#your-orders"
    });
    events("#edit-account", 'click', (e) => {
        e.stopPropagation();
        location.hash = "#edit-account";
        editAccountUI(e);
    });
    events("#your-payment", 'click', (e) => {
        //e.stopPropagation();
        alert('there is no payment options');
    });
}

//security events 
const loginAndSecurityEvents = () => {
    events("#edit-account-block", 'click', (e) => {
        e.stopPropagation();
        let name = e.target.dataset.button;
        let email = e.target.dataset.button;
        let mobile = e.target.dataset.button;
        let pswd = e.target.dataset.button;
        let done = e.target.dataset.button;
        let userObj = itemStorage.getItem('user');
        let user = userObj['user'];
        if (name === 'edit-btn-name') {
            location.hash = "#edit-name";
            editName(e, user);
            events('#name', 'keyup', (e) => {
                checkEditNameInput(e)
            });
            events('#name', 'keypress', checkUsernameForAvailInEdit);
            events('#save-changes-name', 'click', (e) => {
                editRequest(e);
            });
            return;
        }
        if (email === 'edit-btn-email') {
            location.hash = "#edit-email";
            editEmail(e, user);
            events('#email', 'keyup', (e) => {
                checkEditEmailInput(e)
            });
            events('#email', 'keypress', checkEmailForAvailInEdit);
            events('#save-changes-email', 'click', (e) => {
                editRequest(e);
            });
            return;
        }
        if (mobile === 'edit-btn-mobile') {
            location.hash = "#edit-mobile";
            editMobile(e, user);
            events('#mobile', 'keyup', (e) => {
                checkEditMobInput(e)
            });
            events('#mobile', 'keypress', checkMobileNumberForAvailInEdit);
            events('#save-changes-mobile', 'click', (e) => {
                editRequest(e);
            });
            return;
        }
        if (pswd === 'edit-btn-password') {
            location.hash = "#edit-password";
            editPswd(e, user);
            events('#old-password', 'keyup', (e) => {
                checkEditPswdInput(e)
            });
            events('#new-password', 'keyup', (e) => {
                checkEditNewPswdInput(e)
            });
            events('#new-password', 'focus', (e) => {
                const msg = document.getElementById('messages-edit');
                msg.style.display = "block";
            });
            events('#new-password', 'blur', (e) => {
                const msg = document.getElementById('messages-edit');
                msg.style.display = "none";
            });
            events('#confirm-password', 'keyup', (e) => {
                checkEditConfirmPswdInput(e)
            });
            events('#save-changes-pswd', 'click', (e) => {
                editRequest(e);
            });
            return;
        }
        if (done === 'done-btn') return editDone(e);
    });
}

//edit ui

const editAccountUI = (e) => {
    editAccountForm(e);
    let userObj = itemStorage.getItem('user');
    let user = userObj['user'];
    editFormCont(user);
    loginAndSecurityEvents();
}


const accountUI = () => {
    accountDom();
    accountEvents();
}

module.exports = {
    accountUI,
    editAccountUI,
}