const { events, showNav, closeNav } = require('../app/uiHandler');
require('../../css/index.css');

function indexPage() {
    document.body.innerHTML = `
            <header>
                <div class="nav-bar" id="navBar">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </div>      
                <div class="logo" id="logo">
                    <a href="#home"><span class="logo-title">@</span>shopify</a>
                </div>
                <div class="wrapper" id="search-wrapper">
                    <div class="nav-left" style="width:auto">

                        <select class="nav-search-dropdown" id="search-dropdownBox">
                            <option selected="selected" value="search-alias=all">
                                        All 
                            </option>
                            <option value="search-alias=shopify-pantry">Pantry</option>
                            <option value="search-alias=mobiles">Mobiles</option>
                            <option value="search-alias=books">Books</option>
                            <option value="search-alias=laptops">Laptops</option>
                        </select>
                        <div class="nav-sort-icon">
                            <i class="fa fa-sort-desc" aria-hidden="true"></i>
                        </div>

                    </div>
                    <div class="nav-right">
                        <input type="text" name="search-field" id="search-input" class="search-input" data-search-value="" />
                        <span class="nav-search-icon" id="search-icon"><i  class="fa fa-search" aria-hidden="true"></i></span>
                    </div>
                </div>
                <div class="nav-account-wrapper" id="nav-account">
                    <div class="account-details">
                        <a href="#login" class="nav-line-1">Hello, sign in</a>
                    </div>
                </div>
                <div class="account-details2" user-id="" style="display:none">
                    <a href="#login" class="nav-line-3">Hello, sign in</a>
                </div>

                <div class="nav-order-details" id="nav-order" user-id="">
                    <a href="#">Return & orders</a>
                </div>
                <div class="nav-cart" id="nav-cart">
                    <a href="#" class="nav-icon"><i class="fa fa-cart-plus" aria-hidden="true"></i></a>
                    <div class="cart-item">0</div>
                </div>

                <div class="nav-items">
                    <ul>
                        <li><a href="#">All categories</a></li>
                        <li><a href="#">Watch</a></li>
                        <li><a href="#">Pantry</a></li>
                        <li><a href="#">Mobiles</a></li>
                        <li><a href="#">Laptops</a></li>
                    </ul>
                </div>
            </header>
            <div class="nav-overlay" id="nav-overlay">
                <span class="nav-close" id="close-btn"><i class="fa fa-times" aria-hidden="true"></i></span>
                <div id="navigationMenu" class="navigationMenu">
                    <div class="nav-menu">
                        <div class="user-div">
                            <a href="#login" class="user-name"><i class="fa fa-user-circle-o" aria-hidden="true"></i></a>
                            <h2>hello, sign in</h2>
                        </div>
                        <div class="user-div" id="user-div" user-id="" style="display:none">
                            <a href="#login" class="user-name"><i class="fa fa-user-circle-o" aria-hidden="true"></i></a>
                            <h2>hello, sign in</h2>
                        </div>
                    </div>
                    <div class="menu-items">
                            <ul class="items">
                                <li><a href="#home">Home</a></li>
                                <li><a href="#">Shop by categories</a></li>
                                <li><a href="#">Your orders</a></li>
                                <li class="border-item"></li>
                                <li><a href="#">Your account</a></li>
                                <li><a href="#">Sell on shopify</a></li>
                                <li class="border-item"></li>
                                <li><a href="#">Customer service</a></li>
                                <li><a href="#">Sign in</a></li>
                                <li style="display:none"><a href="#">Sign out</a></li>
                            </ul>
                    </div>
                </div>
            </div>  
            <section id="main-content" class="main"></section> 
            <footer>  
                <a href="#" id="top">
                    <div class="nav-to-top" id="to-top">
                        <span class="top-btn">Back To Top</span>
                    </div>
                </a>
                <div class="wrapper2" id="footer-wrapper">
                    <div class="foot-list">
                        <ul>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">your orders</a></li>
                            <li><a href="#">sell on shopify</a></li>
                            <li><a href="#">facebook</a></li>
                        </ul>
                            <ul class="right-div">
                            <li><a href="#">twitter</a></li>
                            <li><a href="#">instagram</a></li>
                            <li><a href="#">customer service</a></li>
                            <li><a href="#">help</a></li>
                        </ul>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="footer-content" id="footer-content">
                        <div class="content">
                            <div class="footer-col-head">Get to know us</div>
                            <ul class="content-1-list">
                                <li><a href="#">About us</a></li>
                            </ul>
                        </div>
                        <div class="content">
                            <div class="footer-col-head">Connect with us</div>
                            <ul class="content-1-list">
                                <li><a href="#">facebook</a></li>
                                <li><a href="#">twitter</a></li>
                                <li><a href="#">instagram</a></li>
                            </ul>
                        </div>
                        <div class="content">
                            <div class="footer-col-head">Make money with us</div>
                            <ul class="content-1-list">
                                <li><a href="#">Sell on shopify</a></li>
                            </ul>
                        </div>
                        <div class="content">
                            <div class="footer-col-head">Let us help you</div>
                            <ul class="content-1-list">
                                <li><a href="#">help</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="footer-line"></div>
                <div class="footer-logo">
                    <a href="#home"><span class="footer-icon">@</span>shopify</a>
                </div>
                <div class="footer-line"></div>
                <div class="footer-dead">
                    <ul class="footer-items">
                        <li><a href="#">condition of use & sales</a></li>
                        <li><a href="#">privacy&terms</a></li>
                        <li><a href="#">interest based-ads</a></li>
                        <li><span class="footer-rights"><i class="fa fa-copyright" aria-hidden="true"></i>2020, @shopify.com, Inc. or its affiliates</span></li>
                    </ul>
                </div>  
            </footer>       
    `;

    return;
}
//ui handler events
function UI_handlerEvents() {
    events('#navBar', 'click', showNav);
    events('#close-btn', 'click', closeNav);
    events('#nav-overlay', 'click', closeNav);

}

module.exports = {
    indexPage,
    UI_handlerEvents
};