const {
    events,
    hideValidateMsg,
    validateMsg,
    displayPng,
    notDisplayPng,
    showHidePass,
    showMsg,
    removeOverlayLoader,
    showUserNameMsg
} = require('./uiHandler');
const makeRequestToServer = require('../ajax/ajax');
const { loaderDiv, debouncing } = require('../utils/utils');


let isNameDisabled = false,
    isMobileDisabled = false,
    isEmailDisabled = false,
    isPassDisabled = false,
    isConfirm = false;
//checks the button status

const checkButtonStatus = () => {
    if (isNameDisabled === true || isMobileDisabled === true || isEmailDisabled === true || isPassDisabled === true || isConfirm === true) {
        document.getElementById('register-btn').disabled = true;
    } else {
        document.getElementById('register-btn').disabled = false;
    }
}
const checkName = () => {
    let namePattern = /^[a-zA-Z0-9_@\!\#\~\$\.\*\-\`\']{5,256}$/;
    let nameInput = document.getElementById('username');
    let name = nameInput.value.match(namePattern);
    if (!name) {
        let msgCont = document.getElementById('nameMsg');
        msgCont.style.display = 'none';
        document.getElementById('error-content').style.display = 'block';
        isNameDisabled = true;
        //console.log(isNameDisabled);
        checkButtonStatus();

    } else {
        document.getElementById('error-content').style.display = 'none';
        isNameDisabled = false;
        //console.log(isNameDisabled);
        checkButtonStatus();

    }
    //console.log(name);
    return name;
}
const checkMobileNo = () => {
    let mobilePattern = /^[0-9]{10}$/;
    let mobileInput = document.getElementById('number');
    let mobile = mobileInput.value.match(mobilePattern);
    if (mobile) {
        document.getElementById('error-content1').style.display = 'none';
        isMobileDisabled = false;
        //console.log(isMobileDisabled);
        checkButtonStatus();


    } else {
        document.getElementById('error-content1').style.display = 'block';
        isMobileDisabled = true;
        //console.log(isMobileDisabled);
        checkButtonStatus();

    }
    //console.log(mobile);
    return mobile;
}

const checkEmail = () => {
    let emailPattern = /^([a-zA-Z0-9_\-\.\$]+)@([a-zA-Z0-9_\-\.\$]+)\.([a-zA-Z]{2,5})$/;
    let emailInput = document.getElementById('email');
    let email = emailInput.value.match(emailPattern);
    if (email) {
        document.getElementById('error-content2').style.display = 'none';
        isEmailDisabled = false;
        //console.log(isEmailDisabled);
        checkButtonStatus();

    } else {
        document.getElementById('error-content2').style.display = 'block';
        isEmailDisabled = true;
        //console.log(isEmailDisabled);
        checkButtonStatus();

    }
    return email;
}

const checkPassword = () => {
    let passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,256}/;
    let myInput = document.getElementById("password");
    let password = myInput.value.match(passwordPattern);
    if (!password) {
        document.getElementById("correct-content2").style.display = "none";
        document.getElementById("error2").style.display = "block";
        isPassDisabled = true;
        // console.log(isPassDisabled);
        checkButtonStatus();


    } else {
        document.getElementById("error2").style.display = "none";
        document.getElementById("correct-content2").style.display = "block";
        isPassDisabled = false;
        //console.log(isPassDisabled);
        checkButtonStatus();

    }
    return password;
}

const confirmPassword = () => {
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm-password");
    let pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,256}/;
    let isConfirmPswd = password.value != confirmPassword.value;
    if (isConfirmPswd || confirmPassword.value === "" || !confirmPassword.value.match(pattern)) {
        document.getElementById("correct-content").style.display = "none";
        document.getElementById("error").style.display = "block";
        isConfirm = true;
        // console.log(isConfirm);
        checkButtonStatus();

    } else {
        document.getElementById("error").style.display = "none";
        document.getElementById("correct-content").style.display = "block";
        isConfirm = false;
        //console.log(isConfirm);
        checkButtonStatus();

    }
    return isConfirmPswd;
}

const inputElements = () => {
    //input elements
    let username = document.getElementById('username').value;
    let mobile = document.getElementById('number').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById("password").value;

    const data = {
        username,
        mobile,
        email,
        password
    }
    return data;

}

//save user to server by request
const saveUserProfile = () => {
    const data = inputElements();
    let requestObject = {
        method: 'POST',
        url: '/api/users/register',
        name: undefined,
        value: undefined,
        data: data
    };
    makeRequestToServer(requestObject)
        .then(successObj => {
            if (successObj.created) {
                let msgObject = {
                    message: successObj.msg,
                    code: '&#10004',
                    term: 'Success',
                    value1: 'info-style',
                    value2: 'success'
                }
                showMsg(msgObject);
                location.hash = "#login";
            }

        })
        .catch(errObj => {
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

//validate method for input data
const formValidation = () => {
    let name = checkName();
    let mobile = checkMobileNo();
    let email = checkEmail();
    let password = checkPassword();
    let confirmPass = confirmPassword();
    //input elements
    let usernameInput = document.getElementById('username').value;
    let mobileInput = document.getElementById('number').value;
    let emailInput = document.getElementById('email').value;
    let passwordInput = document.getElementById("password").value;

    if (usernameInput = "" || mobileInput === "" || emailInput === "" || passwordInput === "") return;

    if (name === null || mobile === null || email === null || password === null || confirmPass === true) {
        document.getElementById('register-btn').disabled = true;
    } else {
        document.getElementById('register-btn').disabled = false;
        loaderDiv();
        saveUserProfile();
    }


}

//check the username avail || not

const checkUsernameForAvail = debouncing((e) => {
    let value = e.target.value;
    //console.log(value);
    let name = checkName();
    let msgCont = document.getElementById('nameMsg');
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
            console.log(msg);
            if (msg) {
                let msgObj = {
                    value: false,
                    value2: 'valid',
                    message: msg.message
                }
                isNameDisabled = false;
                checkButtonStatus();
                while (msgCont.classList.contains('invalid')) {
                    msgCont.classList.remove('invalid');
                }
                showUserNameMsg(msgObj);

            }
        })
        .catch(err => {
            //console.log(err);

            let msgObj = {
                value: true,
                value2: 'invalid',
                message: err.message
            }
            isNameDisabled = true;
            checkButtonStatus();
            while (msgCont.classList.contains('valid')) {
                msgCont.classList.remove('valid');
            }
            showUserNameMsg(msgObj);
        });
}, 300)


//check the mobile no exists

const checkMobileNumberForAvail = debouncing((e) => {
    let value = e.target.value;
    //console.log(value);
    let mobile = checkMobileNo();
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
                isMobileDisabled = false;
                checkButtonStatus();
            }
        })
        .catch(err => {
            //console.log(err);
            isMobileDisabled = true;
            checkButtonStatus();
            let msgObject = {
                message: err.message,
                code: '&#9888',
                term: 'Warning',
                value1: 'info-style',
                value2: 'warning'
            }
            showMsg(msgObject, 7000);
        });
}, 300);

const checkEmailForAvail = debouncing((e) => {
    let value = e.target.value;
    //console.log(value);
    let email = checkEmail();
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
                isEmailDisabled = false;
                checkButtonStatus();
            }
        })
        .catch(err => {
            //console.log(err);
            isEmailDisabled = true;
            checkButtonStatus();
            let msgObject = {
                message: err.message,
                code: '&#9888',
                term: 'Warning',
                value1: 'info-style',
                value2: 'warning'
            }
            showMsg(msgObject, 7000);
        });
}, 300);

//input password events

const passwordEvents = () => {
    events('#password', 'focus', validateMsg);
    events('#password', 'blur', hideValidateMsg);
    events('#confirm-password', 'focus', displayPng);
    events('#confirm-password', 'blur', notDisplayPng);
    events('#eye-toggle', 'click', showHidePass);
    events('#eye-toggle2', 'click', showHidePass);
}

const registerEvents = () => {
    events('#password', 'keyup', checkPassword);
    events('#confirm-password', 'keyup', confirmPassword);
    events('#username', 'keyup', checkName);
    events('#number', 'keyup', checkMobileNo);
    events('#email', 'keyup', checkEmail);
    events('#register-btn', 'click', formValidation);
    events('#username', 'keypress', checkUsernameForAvail);
    events('#number', 'keypress', checkMobileNumberForAvail);
    events('#email', 'keypress', checkEmailForAvail);

}
module.exports = { passwordEvents, registerEvents };