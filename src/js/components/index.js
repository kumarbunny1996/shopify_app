const { events, showNav, closeNav } = require('../app/uiHandler');
const userStore = require('../utils/userStore');
const { itemStorage } = require("../utils/userStore");
const makeRequestToServer = require("../ajax/ajax");
const { fetchProductData } = require('./product');

require('../../css/index.css');

function indexPage() {
    const indexContent = document.getElementById('content');
    document.title = "@Shopify_app";
    indexContent.innerHTML = `
            <section id="index-content">
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
                                <option id="option-selected" selected="selected" value="All">
                                            All 
                                </option>
                                <option value="Speakers">Speakers</option>
                                <option value="Mobiles">Mobiles</option>
                                <option value="Men">Men</option>
                                <option value="Laptops">Laptops</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Home-appliances">Home-appliances</option>
                                <option value="Women">Women</option>
                            </select>
                            <div class="nav-sort-icon">
                                <i class="fa fa-sort-desc" aria-hidden="true"></i>
                            </div>

                        </div>
                        <div class="nav-right autocomplete">
                            <input type="text" name="search-field" id="search-input" class="search-input" data-id=""/>
                            <span class="nav-search-icon" id="search-icon"><i  class="fa fa-search" aria-hidden="true"></i></span>
                        </div>
                    </div>
                    <div class="nav-account-wrapper" id="nav-account">
                        <div class="account-details" id="user-login">
                            <a href="#login" class="nav-line-1">Hello, sign in</a>
                            <div class="tool-tip-content">
                                <div class="button">
                                    <button class=btn id="log-btn">Sign in</button>
                                </div>
                                <h5 class="lead2">New customer<a href="#register">start here</a></h5>
                            </div>
                        </div>
                        <div class="account-details" id="user-id" style="display:none">
                            <a href="#your-account" class="nav-line-1" id="nav-user"></a>
                            
                        </div>
                    </div>

                    <div class="nav-order-details" id="nav-order" user-id="">
                        <a href="#your-orders" id="your-orders" data-value="orders">Return & orders</a>
                    </div>
                    <div class="nav-cart" id="nav-cart">
                        <a href="#shopify-cart" class="nav-icon"><i data-value="cart" id="cart-icon" class="fa fa-cart-plus" aria-hidden="true"></i></a>
                        <div class="cart-total" id="cart-total">0</div>
                    </div>

                    <div class="nav-items">
                        <ul>
                            <li><a href="#categories">All categories</a></li>
                            <li><a href="#speakers">Speakers</a></li>
                            <li><a href="#women">Women</a></li>
                            <li><a href="#mobiles">Mobiles</a></li>
                            <li><a href="#laptops">Laptops</a></li>
                            <li><a href="#men">Men</a></li>
                            <li><a href="#electronics">Electronics</a></li>
                            <li><a href="#home-appliances">Home-appliances</a></li>
                        </ul>
                    </div>
                </header>
                <div class="nav-overlay" id="nav-overlay" data-id="overlay">
                    <span class="nav-close" id="close-btn"><i class="fa fa-times" aria-hidden="true"></i></span>
                    <div id="navigationMenu" class="navigationMenu">
                        <div class="nav-menu">
                            <div class="user-div" id="user-div">
                                <a href="#login" class="user-name"><i class="fa fa-user-circle-o" aria-hidden="true"></i></a>
                                <h2>hello, sign in</h2>
                            </div>
                            <div class="user-div" id="user-div2" user-id="" style="display:none">
                                <a href="#your-account" class="user-name" id="your-account" data-value="account"><i class="fa fa-user-circle-o" aria-hidden="true"></i></a>
                                <h2 id=user-name></h2>
                            </div>
                        </div>
                        <div class="menu-items">
                                <ul class="items">
                                    <li><a href="#home">Home</a></li>
                                    <li><a href="#categories">Shop by categories</a></li>
                                    <li><a href="#your-orders" id="your-orders2" data-value="orders2">Your orders</a></li>
                                    <li class="border-item"></li>
                                    <li><a href="#your-account" id="your-account2" data-value="account2">Your account</a></li>
                                    <li><a href="#sell-on-shopify">Sell on shopify</a></li>
                                    <li class="border-item"></li>
                                    <li><a href="#">Customer service</a></li>
                                    <li id="link3"><a href="#login">Sign in</a></li>
                                    <li class="links" id="link4"style="display:none" > Sign out</></li>
                                </ul>
                        </div>
                    </div>
                </div>  
                <div id="main-content" class="main"></div> 
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
                                <li><a href="#your-account" id="your-account3" data-value="account3">your account</a></li>
                                <li><a href="#sell-on-shopify">sell on shopify</a></li>
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
                                    <li><a href="#sell-on-shopify">Sell on shopify</a></li>
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
            </section>     
    `;

    return;
}

//search logic code
const selectedAll = () => {
    let select = document.getElementById("search-dropdownBox");
    let option = document.getElementById("option-selected");
    let value = select.value;
    let bool = option.selected;
    if (!bool) return;
    if (bool) return selectedValueReq(value);
}
const selectedValueReq = (value) => {
        let requestObject = {
            method: 'GET',
            url: `/api/shopify/search_selected/${value}`,
            name: 'Content-type',
            value: 'application/json',
            data: null
        };
        makeRequestToServer(requestObject)
            .then(resObj => {
                //console.log(resObj);
                let array = resObj.search_query;
                if (array.length === 0) return;
                if (itemStorage.getItem("search_query")) {
                    itemStorage.removeItem('search_query');
                }
                itemStorage.setItem('search_query', array);
            })
            .catch(err => console.error(err));
    }
    //user search product result
const searchProductRequest = (e) => {
    let searchInput = document.getElementById("search-input");
    let val = searchInput.value;
    let id = searchInput.dataset.id;
    if (val === "" || id === undefined) return;
    fetchProductData(id);
}

//create autocomplete divisions
const autocompleteDivisions = (e, searchValues, currentFocus) => {
        let div;
        let matchingDiv;
        let input = e.target;
        input.addEventListener("input", function(e) {
            let val = this.value;
            //close the lists of autocomplete values
            closeAllLists();
            if (!val) return false;
            currentFocus = -1;
            //create the div elements for array values
            div = document.createElement('div');
            div.id = `${this.id}autocomplete-list`;
            div.className = `autocomplete-items`;
            //append child to autocomplete container;
            this.parentElement.appendChild(div);
            searchValues.forEach(search => {
                let searchValue = `${search.item_name} ${search.brand_name}`;
                if (searchValue.substr(0, val.length).toLowerCase() === val.toLowerCase()) {
                    //create matching div for the search value
                    matchingDiv = document.createElement('div');
                    // matchingDiv.setAttribute('data-id', `${search._id}`);
                    matchingDiv.innerHTML = `<strong>${searchValue.substr(0, val.length)}</strong>`;
                    matchingDiv.innerHTML += searchValue.substr(val.length);
                    //insert a input field that will hold the current array item's value:
                    matchingDiv.innerHTML += `<input type="hidden" value="${searchValue}" data-id="${search._id}">`;
                    //execute a function when someone clicks on the item value (DIV element);
                    matchingDiv.addEventListener("click", function(e) {
                        input.value = this.getElementsByTagName('input')[0].value;
                        input.dataset.id = this.getElementsByTagName('input')[0].dataset.id;
                        //console.log(input.dataset.id);
                        //close the lists of autocomplete values
                        closeAllLists();
                    });
                    div.appendChild(matchingDiv);
                }
            });
        });

    }
    //when key down is pressed logic
const autocompleteKeyDownPressed = (e, currentFocus) => {
        let input = e.target;
        input.addEventListener("keydown", function(e) {
            let container = document.getElementById(`${input.id}autocomplete-list`);
            // console.log(container);
            if (!container) return false;
            container = container.getElementsByTagName('div');
            if (e.keyCode == 40) { //down
                //If the arrow DOWN key is pressed,increase the currentFocus variable
                currentFocus++;
                addActiveClass(container, currentFocus);
                addInputValueToField(e, container, currentFocus);
            } else if (e.keyCode == 38) { //up
                currentFocus--;
                addActiveClass(container, currentFocus);
                addInputValueToField(e, container, currentFocus);
            } else if (e.keyCode == 13) { //enter
                //If the ENTER key is pressed, prevent the form from being submitted
                e.preventDefault();
                if (currentFocus > -1) {
                    if (container) {
                        container[currentFocus].click();
                    };
                }
            }
        });
    }
    //add the value to the input field
const addInputValueToField = (e, elem, currentFocus) => {
    let input = e.target;
    let i;
    for (i = 0; i < elem.length; i++) {
        if (elem[i] == elem[currentFocus]) {
            let inputHidden = elem[i].lastElementChild;
            input.value = inputHidden.value;
            input.dataset.id = inputHidden.dataset.id;
            //console.log(input.dataset.id);
        }
    }
}

//add the active class style to classList 
const addActiveClass = (elem, currentFocus) => {
        if (!elem) return false;
        removeActiveClass(elem);
        if (currentFocus >= elem.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (elem.length - 1);
        /*add class "autocomplete-active":*/
        elem[currentFocus].classList.add("autocomplete-active");
    }
    //remove the active class
const removeActiveClass = (elem) => {
        for (var i = 0; i < elem.length; i++) {
            elem[i].classList.remove("autocomplete-active");
        }
    }
    //close the autocomplete list
const closeAllLists = (elmnt) => {
        let x = document.getElementsByClassName("autocomplete-items");
        let inp = document.getElementById("search-input");
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentElement.removeChild(x[i]);
            }
        }
    }
    //autocomplete custom creation
const autocompleteSearchInput = (e, searchValues) => {
        let currentFocus = 0;
        autocompleteDivisions(e, searchValues, currentFocus);
        autocompleteKeyDownPressed(e, currentFocus);
        document.addEventListener('click', (e) => closeAllLists(e.target));
    }
    //ui handler events
function UI_handlerEvents() {
    events('#navBar', 'click', showNav);
    events('#close-btn', 'click', closeNav);
    events("#search-dropdownBox", 'change', (e) => {
        let selectValue = e.target.value;
        // console.log(selectValue)
        if (!selectValue) return;
        selectedValueReq(selectValue);
    });
    events("#search-input", "focus", (e) => {
        if (itemStorage.getItem('search_query')) {
            let search_query = itemStorage.getItem('search_query');
            let searchValues = search_query['search_query'];
            autocompleteSearchInput(e, searchValues);
        }
    });
    events("#search-icon", 'click', (e) => {
        searchProductRequest(e);
    });
    events('#nav-overlay', 'click', (e) => {
        e.stopPropagation();
        let value = e.target.dataset.id;
        if (value === 'overlay') {
            closeNav();
        }
    });
    events('#user-div', 'click', () => location.hash = '#login');
    events('#log-btn', 'click', () => location.hash = '#login');
    events("#cart-icon", 'click', (e) => {
        let token = userStore.authToken();
        if (!token) {
            let value = e.target.dataset.value;
            itemStorage.setItem("value", value);
            location.hash = "#login";
            document.body.style.overflowY = "scroll";
            return;
        }
    });
    events("#your-orders", 'click', (e) => {
        let token = userStore.authToken();
        if (!token) {
            let value = e.target.dataset.value;
            itemStorage.setItem("orders", value);
            location.hash = "#login";
            document.body.style.overflowY = "scroll";
            return;
        }
    });
    events("#your-orders2", 'click', (e) => {
        let token = userStore.authToken();
        if (!token) {
            let value = e.target.dataset.value;
            itemStorage.setItem("orders_2", value);
            location.hash = "#login";
            document.body.style.overflowY = "scroll";
            return;
        }
    });
    events("#your-account2", 'click', (e) => {
        let token = userStore.authToken();
        if (!token) {
            let value = e.target.dataset.value;
            itemStorage.setItem("account", value);
            location.hash = "#login";
            document.body.style.overflowY = "scroll";
            return;
        }
    });
    events("#your-account3", 'click', (e) => {
        let token = userStore.authToken();
        if (!token) {
            let value = e.target.dataset.value;
            itemStorage.setItem("account_2", value);
            location.hash = "#login";
            return;
        }
    });
}

module.exports = {
    indexPage,
    selectedAll,
    UI_handlerEvents
};