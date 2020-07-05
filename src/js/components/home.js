const userStore = require("../utils/userStore");

const homePage = () => {
    let username = userStore.getUsername();
    const homeCont = document.getElementById('main-content');
    homeCont.innerHTML = `
        <div class="home-cont" id="home-cont">
            <h1> Hi ${username},<br>Welcome To Shopify</h1>
        </div>
    `;
}

module.exports = homePage;