const { itemStorage } = require('../utils/userStore');
const userStore = require('../utils/userStore');
const { modelDoc, popupDoc, msgDoc, uiAfterLogout } = require('../utils/utils');

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
const displayPng = (e) => {
    const toggle = e.target.parentElement.lastElementChild;
    toggle.style.display = "block";
}
const notDisplayPng = (e) => {
    const password = e.target;
    const toggle = e.target.parentElement.lastElementChild;
    //check the password input has the value
    //var myInput = document.getElementById("confirm-password");
    if (password.value === "") {
        toggle.style.display = "none";
    } else {
        toggle.style.display = "block";
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

const closeModel = (e) => {
    document.body.style.overflowY = "scroll";
    const modal = document.getElementById('modal');
    const cont = document.getElementById('model-content');
    modal.removeChild(cont);
    modal.style.visibility = 'hidden'
}



const showModel = (domValue) => {
        modelDoc(domValue);
        document.body.style.overflowY = "hidden";
        //document.getElementById('modal').classList.add();
        document.getElementById('modal').style.visibility = 'visible'
        events('#close2', 'click', (e) => {
            closeModel(e);

        });
        events('#modal', 'click', (e) => {
            e.stopPropagation();
            let el = e.target.dataset.id;
            if (el === 'modal') {
                closeModel(e);
            }
        });

    }
    //popup model

const closePopup = (e) => {
    document.body.style.overflowY = "scroll";
    const popup = document.getElementById('popup');
    const cont = document.getElementById('popup-content');
    popup.removeChild(cont);
    popup.style.visibility = 'hidden'
}
const showPopup = (domValue) => {
    popupDoc(domValue);
    document.body.style.overflowY = "hidden";
    //document.getElementById('modal').classList.add();
    document.getElementById('popup').style.visibility = 'visible'
    events('#close-pop', 'click', (e) => {
        closePopup(e);

    });
    events('#popup', 'click', (e) => {
        e.stopPropagation();
        let el = e.target.dataset.id;
        if (el === 'popup') {
            closePopup(e);
        }
    });

}

const showMsg = (object = {}, timer = 4000) => {
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
    }, timer);

}
const removeOverlayLoader = () => {
    if (document.getElementById('loadOverlay')) {
        document.body.removeChild(document.getElementById('loadOverlay'));
    }
}

const showUserNameMsg = (object = {}) => {
    let { value, value2, message } = object;
    document.getElementById('register-btn').disabled = value;
    let msgCont = document.getElementById('nameMsg')
    msgCont.style.display = "block";
    while (msgCont.firstChild) {
        msgCont.removeChild(msgCont.firstChild)
    }
    msgCont.classList.add(value2);
    let p = document.createElement('p');
    //p.id = 'msg-to-client';
    p.innerText = message;
    msgCont.appendChild(p)

}

//remove Overlay nav
const removeOverlayNav = () => {
    let navMenu = document.getElementById('navigationMenu');
    let overlay = document.getElementById('nav-overlay');
    if (navMenu.classList.contains('show-nav')) {
        navMenu.classList.remove('show-nav');
    }
    if (overlay.classList.contains('transparentbcg')) {
        overlay.classList.remove('transparentbcg');
    }
}


//sign out 
const logOut = () => {
    localStorage.clear();
    itemStorage.clear();
    location.hash = "#login";
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
    logOut,
    showUserNameMsg,
    showPopup,
    closePopup,
    removeOverlayNav,
});