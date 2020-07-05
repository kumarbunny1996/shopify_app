let userStore = (() => {
    let username = "";

    function setUsername(user_name) {
        username = user_name;
    }

    function getUsername() {
        return username;
    }

    return {
        setUsername,
        getUsername
    }
})();

module.exports = userStore;