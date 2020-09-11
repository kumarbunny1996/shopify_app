const { events } = require("../app/uiHandler");
const { sellerConfirmation } = require("../app/sellerLogic");

require("../../css/seller.css");
const sellerDom = () => {
    const content = document.getElementById('main-content');
    document.title = '@shopify-Seller Central'
    content.innerHTML = `
        <div class="seller-section" id="seller-section">
            <div class="seller-top" id="seller-top">
                <blockquote>
                    "Since last year, my business<br>
                    on @shopify has grown more than 9 times."
                </blockquote>
                <em>@shopify seller</em>
                <div class="btn" id="btn1" data-id="seller">
                    <button id="seller-btn">Start selling</button>
                </div>
            </div>
            <h1 class="seller-head">Why sell on @shopify?</h1>
            <div class="seller-middle" id="seller-middle">
                <div class="seller-middle-content">
                    <img src="/public/images/commonStore/live-chat.svg">
                    <h2>E-Commerce: Your next big sales channel</h2>
                    <p>Start selling on @shopify - without building a website. Register now to start selling on @shopify.com</p>
                </div>
                <div class="seller-middle-content">
                    <img src="/public/images/commonStore/globe.svg">
                    <h2>Reach crores of customers</h2>
                    <p>Sell to crores of engaged customer visiting @shopify.com on desktop</p>
                </div>
                <div class="seller-middle-content">
                    <img src="/public/images/commonStore/pay-min.png">
                    <h2>Receive timely payments</h2>
                    <p>Shopify ensures your payments are deposited directly in your bank account within 14 days.</p>
                </div>
            </div>
            <div class="seller-img"></div>
            <div class="seller-bot" id="seller-bot">
                <div class=btn>
                    <button id="seller-btn2">Start selling</button>
                </div>
                <em>No fixed subscription fee | Pay only when your product is ordered</em>
                <div class=btn>
                    <button id="learn-btn">Learn more on selling</button>
                </div>
            </div>
        </div>
    `;
}
const sellerEvents = () => {
    events("#seller-btn", "click", sellerConfirmation);
    events("#seller-btn2", "click", sellerConfirmation);
}

module.exports = { sellerDom, sellerEvents };