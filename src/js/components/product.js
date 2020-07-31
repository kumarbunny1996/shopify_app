const { removeLoader, loader } = require("../utils/utils");
const makeRequestToServer = require("../ajax/ajax");
const { itemStorage } = require("../utils/userStore");
const { banner } = require("./category");
const userStore = require("../utils/userStore");
const { events } = require("../app/uiHandler");
const { checksCartItems, totalCartValues, setCartValues, cartLogicEvents, setSavedItemsValues, saveCartLogicEvents } = require("../app/cartLogic");
const { itemsDom, cartDom, cartDomIfEmpty, savedItemsIsEmpty, savedItemsDom, saveForLaterDom } = require("./cart");
require('../../css/product.css');
const { sliderRun } = require("../components/home");

const productDom = (config = {}) => {
    let prodBanner = banner({ para: "Discount", img: "/public/images/commonStore/amazon-dhamaka-1-min.png" })
    const productCont = document.getElementById('main-content');
    document.title = `@Shopify_${config.product.category}_${config.product._id}`;
    productCont.innerHTML = `
        <div class="single-product-container">
             ${prodBanner}
            <div class="single-product">
                <div class="image_cover">
                    <img src="${config.product.image}" alt="product_image">
                </div>
                <div class="details">
                    <div class="item_details">
                        <h2><strong>${config.product.sellerObj.company_name}</strong> ${config.product.item_name}</h2>
                        <h3>${config.product.brand_name}</h3>
                        <h4>price: <span>$${config.product.price}<span></span></h4>
                        <div class="delivery_block"></div>
                    </div>
                    <div class="key_features">
                        <h5>Features: <em>${config.product.features}</em></h5>
                        <h5>Shipping_cost: <em>${config.product.shipping_cost}</em></h5>
                        <h5>Sold by <strong>${config.product.sellerObj.company_name}</strong></h5>
                    </div>
                    <div class="buttons-block" id="buttons-block">
                        <div class="share_icons">
                            <div class="icons"><i></i></div>
                            <div class="icons"><i></i></div>
                            <div class="icons"><i></i></div>
                        </div>
                        <button class="btn" data-value="cart" id="cart-btn" data-id="${config.product._id}">Add to Cart</button>
                        <button class="btn" data-buy="buy" id="buy-btn" data-id="${config.product._id}">Buy now</button>
                    </div>
                </div>
                <div class="third-block">
                    <div class="description">
                        <p><span>Product Description </span>${config.product.description}</p>
                    </div>
                    <div class="seller_info">
                        <h4>Seller information</h4>
                        <ul>
                            <li>${config.product.sellerObj.company_name}</li>
                            <li>${config.product.sellerObj.email}</li>
                            <li><span>Contact: </span>${config.product.sellerObj.contact}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    `;
}

//gets product data from server

const fetchProductData = (id) => {
    let requestObj = {
        method: 'GET',
        url: `/api/shopify/product/${id}`,
        name: 'Content-type',
        value: 'application/json',
        data: null
    }
    loader();
    makeRequestToServer(requestObj)
        .then(obj => {
            if (itemStorage.getItem("product")) {
                itemStorage.removeItem("product");
            }
            itemStorage.setItem("product", obj);
            let category = obj.product.category;
            let id = obj.product._id;
            location.hash = `#${category}_${id}`;
        })
        .catch(err => console.log(err))
        .finally(() => removeLoader());
}

const reloadProductData = (id) => {
    let token = userStore.authToken();
    let requestObj = {
        method: 'GET',
        url: `/api/shopify/product/${id}`,
        name: 'Content-type',
        value: 'application/json',
        data: null
    }
    loader();
    makeRequestToServer(requestObj)
        .then(product => {
            itemStorage.setItem("product", product);
            productDom(product);
            productEvents();
            if (token) {
                checksCartItems(id);
            }
        })
        .catch(err => err)
        .finally(() => removeLoader());
}

const saveProductToCart = (e, id) => {
    let token = userStore.authToken();
    if (!token) return location.hash = "#login";
    window.scrollTo(0, 0);
    let requestObj = {
        method: 'GET',
        url: `/api/users/cart/${id}`,
        name: 'Authorization',
        value: token,
        data: null
    }
    loader();
    makeRequestToServer(requestObj)
        .then(item => {
            let product = item.item;
            let isItem = item.isNotThere;
            if (itemStorage.getItem("cart")) {
                let cart = itemStorage.getItem("cart");
                let cartItems = cart["cart"];
                let index = cartItems.findIndex(item => item._id == id);
                if (index == -1) {
                    cartItems.unshift(product);
                }
            }
            if (isItem) {
                if (itemStorage.getItem("savedItems")) {
                    let savedCart = itemStorage.getItem("savedItems");
                    let saveLater = savedCart["savedItems"];
                    let index = saveLater.findIndex(item => item._id == id);
                    if (index != -1) {
                        saveLater.splice(index, 1);
                    }
                    console.log(saveLater);
                }
            }
            location.hash = "#shopify-cart";
        })
        .catch(err => console.log(err))
        .finally(() => removeLoader());
}

const reloadCartItems = () => {
    let token = userStore.authToken();
    if (!token) return location.hash = "#login";
    return new Promise((resolve) => {
        let requestObj = {
            method: 'GET',
            url: '/api/users/cart_items',
            name: 'Authorization',
            value: token,
            data: null
        }
        loader();
        makeRequestToServer(requestObj)
            .then(cartObj => {
                //let cartItems = cart.cart;
                //let itemsObj = cart
                console.log(cartObj);
                resolve(cartObj);
            })
            .catch(err => console.log(err))
            .finally(() => removeLoader());
    });
}
const productEvents = () => {
        events("#cart-btn", 'click', (e) => {
            e.stopPropagation();
            let id = e.target.dataset.id;
            console.log(id);
            if (id === undefined) return;
            itemStorage.setItem("id", id);
            saveProductToCart(e, id);
        });
    }
    //reload the cart page data
const reloadCart = () => {
        reloadCartItems()
            .then(cartObj => {
                console.log(cartObj);
                let cartItems = cartObj.cart;
                let savedItems = cartObj.savedItems;
                itemStorage.setItem("cart", cartItems);
                itemStorage.setItem("savedItems", savedItems);
                totalCartValues(cartItems);
                if (location.hash === "#shopify-cart") {
                    setsCartPageDom();
                }
            });
    }
    //sets the cart values for other pages as if
const cartValues = () => {
        if (itemStorage.getItem("cart")) {
            let cart = itemStorage.getItem("cart");
            let cartItems = cart["cart"];
            totalCartValues(cartItems);
        } else {
            reloadCartItems()
                .then(cartObj => {
                    let cartItems = cartObj.cart;
                    let savedItems = cartObj.savedItems;
                    itemStorage.setItem("cart", cartItems);
                    itemStorage.setItem("savedItems", savedItems);
                    totalCartValues(cartItems);
                });
        }
    }
    //sets the cart page
const toCart = () => {
        if (itemStorage.getItem("cart")) {
            setsCartPageDom();

        } else {
            reloadCartItems()
                .then(cartObj => {
                    let cartItems = cartObj.cart;
                    let savedItems = cartObj.savedItems;
                    itemStorage.setItem("cart", cartItems);
                    itemStorage.setItem("savedItems", savedItems);
                    setsCartPageDom();
                });
        }
    }
    //sets the cart when cartBtn is clicked
const checkTheCartIfItemExists = (id) => {
    reloadCartItems()
        .then(cartObj => {
            let cartItems = cartObj.cart;
            let savedItems = cartObj.savedItems;
            itemStorage.setItem("cart", cartItems);
            itemStorage.setItem("savedItems", savedItems);
            let item = cartItems.find(item => {
                return item._id == id;
            });
            if (item) {
                location.hash = "#shopify-cart";
            } else {
                saveProductToCart(id);
            }

        });
}

//sets the cart page dom function

const setsCartPageDom = () => {
    let cart = itemStorage.getItem("cart");
    let savedCart = itemStorage.getItem("savedItems");
    let saveLater = savedCart["savedItems"];
    console.log(saveLater);
    let cartItem = cart["cart"];
    if (cartItem.length === 0) {
        cartDomIfEmpty();
    } else {
        cartDom();
        itemsDom(cartItem);
        setCartValues(cartItem);
        cartLogicEvents();
    }
    if (saveLater.length === 0) {
        savedItemsIsEmpty();
    } else {
        saveForLaterDom();
        savedItemsDom(saveLater);
        setSavedItemsValues(saveLater);
        saveCartLogicEvents();
    }
}

//sets the product page data
const productPage = () => {
    if (itemStorage.getItem("product") === null || itemStorage.getItem("product") === undefined) {
        let id = location.hash.split("_")[1];
        if (id === undefined) return;
        console.log(id);
        if (id) {
            sliderRun();
            reloadProductData(id);
        }

    }
}

module.exports = {
    toCart,
    cartValues,
    productDom,
    fetchProductData,
    reloadProductData,
    reloadCartItems,
    productEvents,
    saveProductToCart,
    checkTheCartIfItemExists,
    reloadCart,
    productPage
};