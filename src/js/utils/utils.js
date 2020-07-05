//loading method
const userStore = require('./userStore');

const loaderDiv = () => {
    let loader = document.createElement('div');
    loader.className = 'loadOverlay';
    loader.id = 'loadOverlay';
    loader.innerHTML = `
          <div class="loader" id="loader"></div>    
    `;
    document.body.appendChild(loader);
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

const modelDoc = (message, element) => {

    const model = document.getElementById('modal');
    model.innerHTML = `
        <div class="model-content" id="model-content">
            <div class="model-close" id="model-close">
                <span class="close" id="close2">
                    &times
                </span>
            </div>
            <p class="model-message">${message} ${element}</p>
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
    console.log(username);

    account.style.display = 'block';
    account2.style.display = 'block';
    link4.style.display = 'block';
    account3.style.display = 'none';
    account4.style.display = 'none';
    link3.style.display = 'none';
    link.innerText = `hello, ${username}`;
    link2.innerText = `hello, ${username}`;
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
            <li><a href="#">Your Account</a></li>
            <li><a href="#">Your Orders</a></li>
            <li><a href="#">Sell On Shopify</a></li>
            <li class=button><button class="btn" id="logOut">Sign out</button></li>
        </ul>
        
    `;
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

module.exports = Object.freeze({
    loaderDiv,
    modelDoc,
    msgDoc,
    displayUserProfile,
    uiAfterLogout,
    toolTipBox,
    loginAreaAfterSuccess
});