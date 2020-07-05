const makeRequestToServer = require('../ajax/ajax');
const userStore = require('../utils/userStore');
const { displayUserProfile, toolTipBox } = require('../utils/utils');
const { events, logOut } = require('./uiHandler');
const homePage = require('../components/home');

let init = () => {
    displayUserProfile();
    toolTipBox();
    homePage();
    events('#logOut', 'click', logOut);
    events('#link4', 'click', logOut);
}
let getUserProfile = (requestObj = {}) => {
    let username = "";
    if (JSON.parse(localStorage.getItem('username')) == undefined) {
        makeRequestToServer(requestObj)
            .then(userObj => {
                localStorage.setItem('username', JSON.stringify(userObj.user.username))
                userStore.setUsername(userObj.user.username);
                init();
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        username = JSON.parse(localStorage.getItem('username'));
        userStore.setUsername(username);
        init();
    }
}


const displayUserAccount = () => {
    let token = JSON.parse(localStorage.getItem('AccessToken'));
    let requestObject = {
        method: 'GET',
        url: '/api/users/profile',
        name: 'Authorization',
        value: token,
        data: null
    }
    getUserProfile(requestObject);
}


module.exports = displayUserAccount;