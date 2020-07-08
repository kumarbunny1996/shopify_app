const makeRequestToServer = require('../ajax/ajax');
const userStore = require('../utils/userStore');
const { displayUserProfile, toolTipBox } = require('../utils/utils');
const { events, logOut, showMsg } = require('./uiHandler');



let init = () => {
    displayUserProfile();
    toolTipBox();
    events('#logOut', 'click', logOut);
    events('#link4', 'click', logOut);
}

let loginUserData = (requestObj = {}) => {
    makeRequestToServer(requestObj)
        .then(userObj => {
            //localStorage.setItem('username', JSON.stringify(userObj.user.username))
            userStore.setUsername(userObj.user.username);
            location.hash = "#home";
            window.scrollTo(0, 0);
        })
        .catch(err => {
            //console.log(err);
            let msgObject = {
                message: err.message,
                code: '&#9888',
                term: 'Warning',
                value1: 'info-style',
                value2: 'warning'
            }
            showMsg(msgObject);
        });
}

let getUserProfileReload = (requestObj = {}) => {
    makeRequestToServer(requestObj)
        .then(userObj => {
            userStore.setUsername(userObj.user.username);
            init();
        })
        .catch(err => {
            //console.log(err);
            let msgObject = {
                message: err.message,
                code: '&#9888',
                term: 'Warning',
                value1: 'info-style',
                value2: 'warning'
            }
            showMsg(msgObject);
        });
}


const showUserData = () => {
    let token = userStore.authToken();
    let requestObject = {
        method: 'GET',
        url: '/api/users/profile',
        name: 'Authorization',
        value: token,
        data: null
    }
    loginUserData(requestObject);
}

const showReloadData = () => {
    let token = userStore.authToken();
    let requestObject = {
        method: 'GET',
        url: '/api/users/profile',
        name: 'Authorization',
        value: token,
        data: null
    }
    getUserProfileReload(requestObject);
}




module.exports = { showUserData, showReloadData, init };