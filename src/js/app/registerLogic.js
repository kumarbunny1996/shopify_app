const {
    events,
    hideValidateMsg,
    validateMsg,
    displayPng,
    notDisplayPng,
    showHidePass
} = require('./uiHandler');
const makeRequestToServer = require('../ajax/ajax');



const checkName = () => {
    let namePattern = /^[a-zA-Z0-9_@\!\#\%\~\$\.\&\*\-\^\%\`\']{2,15}$/;
    let nameInput = document.getElementById('username');
    let name = nameInput.value.match(namePattern);
    if (!name) {
        document.getElementById('error-content').style.display = 'block';
    } else {
        document.getElementById('error-content').style.display = 'none';
        document.getElementById('register-btn').disabled = false;
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
        document.getElementById('register-btn').disabled = false;
    } else {
        document.getElementById('error-content1').style.display = 'block';
    }
    //console.log(mobile);
    return mobile
}

const checkEmail = () => {
    let emailPattern = /^([a-zA-Z0-9_\-\.\$]+)@([a-zA-Z0-9_\-\.\$]+)\.([a-zA-Z]{2,5})$/;
    let emailInput = document.getElementById('email');
    let email = emailInput.value.match(emailPattern);
    if (email) {
        document.getElementById('error-content2').style.display = 'none';
        document.getElementById('register-btn').disabled = false;

    } else {
        document.getElementById('error-content2').style.display = 'block';

    }
    return email;
}
const checkPassword = () => {
    let passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    let myInput = document.getElementById("password");
    let password = myInput.value.match(passwordPattern);
    if (!password) {
        document.getElementById("correct-content2").style.display = "none";
        document.getElementById("error2").style.display = "block";

    } else {
        document.getElementById("error2").style.display = "none";
        document.getElementById("correct-content2").style.display = "block";
        document.getElementById('register-btn').disabled = false;

    }
    return password;
}

const confirmPassword = () => {
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm-password");
    let pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    let confirmPswd = password.value != confirmPassword.value;
    if (confirmPswd || confirmPassword.value === "" || !confirmPassword.value.match(pattern)) {
        document.getElementById("correct-content").style.display = "none";
        document.getElementById("error").style.display = "block";

    } else {
        document.getElementById("error").style.display = "none";
        document.getElementById("correct-content").style.display = "block";
        document.getElementById('register-btn').disabled = false;

    }
    console.log(confirmPswd);
    return confirmPswd;
}

const inputElements = () => {
    //input elements
    let nameInput = document.getElementById('username').value;
    let mobileInput = document.getElementById('number').value;
    let emailInput = document.getElementById('email').value;
    let myInput = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    const data = {
        nameInput,
        mobileInput,
        emailInput,
        myInput,
        confirmPassword
    }
    return data;

}

//validate method for input data
const formValidation = () => {
    let name = checkName();
    let mobile = checkMobileNo();
    let email = checkEmail();
    let password = checkPassword();
    let confirmPass = confirmPassword();

    if (name === null || mobile === null || email === null || password === null || confirmPass === true) {
        document.getElementById('register-btn').disabled = true;
    } else {
        document.getElementById('register-btn').disabled = false;
        const data = inputElements();
        makeRequestToServer('POST', '/api/register', data)
            .then(data => location.hash = "#login")
            .catch(err => console.log(err))
            .finally(() => console.log('finished'));
    }


}

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
}
module.exports = { passwordEvents, registerEvents };