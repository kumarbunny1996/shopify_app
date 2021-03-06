const userStore = require('./userStore');

//loading method

const loaderDiv = () => {
    let loader = document.createElement('div');
    loader.className = 'loadOverlay';
    loader.id = 'loadOverlay';
    loader.innerHTML = `
          <div class="loader" id="loader"></div>    
    `;
    if (document.getElementById('loadOverlay')) {
        document.body.removeChild(document.getElementById('loadOverlay'));
    }
    document.body.appendChild(loader);
}

const loader = () => {
    let loader = document.createElement('div');
    loader.className = 'loader2';
    loader.id = 'loader2';
    if (document.getElementById('loader2')) {
        document.body.removeChild(document.getElementById('loader2'));
    }
    document.body.appendChild(loader);
}

const removeLoader = () => {
    if (document.getElementById('loader2')) {
        document.body.removeChild(document.getElementById('loader2'));
    }
}

const blurLoader = (el) => {
    let blurLoader = document.createElement('div');
    blurLoader.className = 'blurLoader';
    blurLoader.id = 'blurLoader';
    if (document.getElementById('blurLoader')) {
        el.removeChild(document.getElementById('blurLoader'));
    }
    el.appendChild(blurLoader);
}

const removeBlurLoader = (el) => {
        if (document.getElementById('blurLoader')) {
            el.removeChild(document.getElementById('blurLoader'));
        }
    }
    //creating model for messages

const msgDoc = (message, code, term) => {
    const msgModel = document.getElementById('info');
    msgModel.innerHTML = `
        <div class="msgCont" id="contOfMsg">
            <h4><span class="term">${code};</span> ${term}</h4>
            <p class="client-message" id="client-message">${message}</p>
        </div>
    `;
}

const modelDoc = (value) => {
    const model = document.getElementById('modal');
    model.setAttribute('data-id', 'modal');
    model.innerHTML = `
        <div class="model-content" id="model-content">
            <div class="model-close" id="model-close">
                <span class="close" id="close2">
                    &times
                </span>
            </div
            <div>
                ${value}
            </div>
        </div>
    `;
}

const popupDoc = (value) => {
    const popup = document.getElementById('popup');
    popup.setAttribute('data-id', 'popup');
    popup.innerHTML = `
        <div class="popup-content" id="popup-content">
            <div class="popup-close" id="popup-close">
                <span class="close" id="close-pop">
                    &times
                </span>
            </div
            <div>
                ${value}
            </div>
        </div>
    `;
}

//after user login


const displayUserProfile = () => {
    const account = document.getElementById('user-id');
    const link = document.getElementById('nav-user');
    const account2 = document.getElementById('user-div2');
    const link2 = document.getElementById('user-name');
    const link3 = document.getElementById('link3');
    const account3 = document.getElementById('user-login');
    const account4 = document.getElementById('user-div');
    const link4 = document.getElementById('link4');
    let username = userStore.getUsername();
    //console.log(username);

    account.style.display = 'block';
    account2.style.display = 'block';
    link4.style.display = 'block';
    account3.style.display = 'none';
    account4.style.display = 'none';
    link3.style.display = 'none';
    link.innerText = `hello, ${username}`;
    link2.innerText = `hello, ${username}`;
}

//ui after login for home page

const uiHomeAfterLogin = () => {
    const accountCard = document.getElementById('sp-account-card');
    const signCard = document.getElementById('signIn-card');
    const cardName = document.getElementById('card-username');
    let username = userStore.getUsername();

    accountCard.style.display = 'block';
    signCard.style.display = 'none';
    cardName.innerText = `Hi ${username}`;
}

// user after logout
const uiAfterLogout = () => {
    const account = document.getElementById('user-id');
    const account2 = document.getElementById('user-div2');
    const link3 = document.getElementById('link3');
    const account3 = document.getElementById('user-login');
    const account4 = document.getElementById('user-div');
    const link4 = document.getElementById('link4');

    account.style.display = 'none';
    account2.style.display = 'none';
    link4.style.display = 'none';
    account3.style.display = 'block';
    account4.style.display = 'block';
    link3.style.display = 'block';
}

const toolTipBox = () => {
    const account = document.getElementById('user-id');
    const toolTip = document.createElement('div');
    toolTip.className = "tool-tip-content";
    toolTip.id = "tool-tip-content";
    toolTip.innerHTML = `
        <ul class="tool-tip-list">
            <li><a href="#your-account">Your Account</a></li>
            <li><a href="#your-orders">Your Orders</a></li>
            <li><a href="#sell-on-shopify">Sell On Shopify</a></li>
            <li class=button id="logOut"><button class="btn">Sign out</button></li>
        </ul>
        
    `;
    if (document.getElementById('tool-tip-content')) {
        account.removeChild(document.getElementById('tool-tip-content'));
    }
    account.appendChild(toolTip);
}

const loginAreaAfterSuccess = () => {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="loginArea2" id="loginArea2" style="padding:150px 250px; width:100%;">
            <h2>Your account has been successfully Logged in!</h2>
        </div>
    `;
}

// delay  the events handler func

const debouncing = (fn, delay) => {
    let timeout;
    return function() {
        let context = this,
            args = arguments;
        let later = () => {
            timeout = null;
            fn.apply(context, args);
        }
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, delay || 500);
    }
}

module.exports = Object.freeze({
    loaderDiv,
    modelDoc,
    msgDoc,
    displayUserProfile,
    uiAfterLogout,
    toolTipBox,
    loginAreaAfterSuccess,
    debouncing,
    uiHomeAfterLogin,
    loader,
    removeLoader,
    blurLoader,
    removeBlurLoader,
    popupDoc,
});