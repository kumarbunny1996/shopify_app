//gets event elements
let events = (element, event, eventHandler) => document.querySelector(element).addEventListener(event, eventHandler);
let removeEvents = (element, event, eventHandler) => document.querySelector(element).removeEventListener(event, eventHandler);

//show the nav menu

function showNav() {
    document.body.style.overflowY = "hidden";
    const navCart = document.querySelector('#navigationMenu');
    const navOverlay = document.querySelector('#nav-overlay');
    navCart.classList.add('show-nav');
    navOverlay.classList.add('transparentbcg');
}
//close the nav
function closeNav() {
    document.body.style.overflowY = "scroll";
    const navCart = document.querySelector('#navigationMenu');
    const navOverlay = document.querySelector('#nav-overlay');
    navCart.classList.remove('show-nav');
    navOverlay.classList.remove('transparentbcg');
}

// shows the eye-toggler png
const displayPng = () => {
    document.getElementById("eye-toggle2").style.display = "block";
}
const notDisplayPng = () => {
    //check the password input has the value
    var myInput = document.getElementById("confirm-password");
    if (myInput.value === "") {
        document.getElementById("eye-toggle2").style.display = "none";
    } else {
        document.getElementById("eye-toggle2").style.display = "block";
    }
}

//show hide logic for register

const showHidePass = (e) => {
    const toggle = e.target;
    const password = e.target.parentElement.firstElementChild;
    if (password.type === "password") {
        password.setAttribute('type', 'text');
        toggle.classList.add('hide');

    } else {
        password.setAttribute('type', 'password');
        toggle.classList.remove('hide');
    }
}

//show hide password for login 
const showHide = () => {
    const password = document.getElementById("password");
    if (password.type === "password") {
        password.setAttribute('type', 'text');
    } else {
        password.setAttribute('type', 'password');
    }
}

// display the messages
const validateMsg = () => {
        document.getElementById("messages").style.display = "block";
        document.getElementById("eye-toggle").style.display = "block";
    }
    //hide the msg
const hideValidateMsg = () => {

    document.getElementById("messages").style.display = "none";
    var myInput = document.getElementById("password");

    //checks when the input is valid
    if (myInput.value === "") {
        document.getElementById("eye-toggle").style.display = "none";
    } else {
        document.getElementById("eye-toggle").style.display = "block";
    }

}

module.exports = {
    events,
    removeEvents,
    showNav,
    closeNav,
    showHide,
    hideValidateMsg,
    validateMsg,
    displayPng,
    notDisplayPng,
    showHidePass
};