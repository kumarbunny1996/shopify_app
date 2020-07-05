const { modelDoc, msgDoc, uiAfterLogout } = require('../utils/utils');

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

//close the model 

const closeModel = () => {
    document.body.style.overflowY = "scroll";
    const modal = document.getElementById('modal');
    modal.removeChild(document.getElementById('model-content'));
    document.getElementById('modal').style.visibility = 'hidden'
}

const showModel = (message = undefined, element = null, value = undefined) => {
    console.log(message);
    modelDoc(message, element);
    document.body.style.overflowY = "hidden";
    document.getElementById('modal').classList.add(value);
    document.getElementById('modal').style.visibility = 'visible'
    events('#close2', 'click', closeModel);
    events('#modal', 'click', closeModel);

}

const showMsg = (object = {}) => {
    window.scrollTo(0, 0);
    //console.log(message);
    msgDoc(object.message, object.code, object.term);
    const msgCont = document.getElementById('info');
    const contOfMsg = document.getElementById('contOfMsg')
    contOfMsg.classList.add(object.value1, object.value2);
    setTimeout(() => {
        contOfMsg.classList.remove(object.value1, object.value2);
        msgCont.removeChild(contOfMsg);
        //window.scrollTo(0, 392);
    }, 3000);

}
const removeOverlayLoader = () => {
    if (document.getElementById('loadOverlay')) {
        document.body.removeChild(document.getElementById('loadOverlay'));
    }
}

//sign out 
const logOut = () => {
    localStorage.clear();
    uiAfterLogout();
    location.hash = "#home";
}
module.exports = Object.freeze({
    events,
    removeEvents,
    showNav,
    closeNav,
    showHide,
    hideValidateMsg,
    validateMsg,
    displayPng,
    notDisplayPng,
    showHidePass,
    showModel,
    showMsg,
    removeOverlayLoader,
    logOut
});