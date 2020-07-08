let userStore = (() => {
    let username = "";
    let token = "";

    function setUsername(user_name) {
        username = user_name;
    }

    function getUsername() {
        return username;
    }

    function authToken() {
        token = JSON.parse(localStorage.getItem('AccessToken'));
        return token;
    }

    return {
        setUsername,
        getUsername,
        authToken
    }
})();



module.exports = userStore;