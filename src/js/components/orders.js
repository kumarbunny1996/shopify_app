const { itemStorage } = require("../utils/userStore");
const { events, removeOverlayLoader } = require("../app/uiHandler");
const { loaderDiv } = require("../utils/utils");
const userStore = require("../utils/userStore");
const makeRequestToServer = require("../ajax/ajax");
require("../../css/orders.css");

const orderDom = () => {
    let orderCont = document.getElementById('main-content');
    document.title = '@shopify_Your_orders';
    orderCont.innerHTML = `
        <section class="order-main" id="order-main">
            <h2>Your orders</h2>
            <div class="order-main-block" id="order-main-block">
            </div>
        </section>
    `;
}

const orderDetailsDom = (orderObj = []) => {
        let main = document.getElementById('order-main-block');
        let result = "";
        orderObj.forEach(item => {
            let shipping = item.shipping_address;
            result += `
                <div class="order-block" data-id="${item.order_id}">
                    <div class="order-details-block">
                        <div class="order-placed">
                            <p class="para2">ORDER PLACED</p>
                            <p class="para"><em>${item.order_placed.toUpperCase()}</em></p>
                        </div>
                        <div class="order-shipping">
                            <p class="para2">SHIPPING TO</p>
                            <div class="tool-tip-wrap">
                                <p class="para2" id="shipping">${item.name.toUpperCase()}</p>
                                <div class="address-details" id="tool-tip-cont">
                                    <p class="para">${shipping.name.toUpperCase()}</p>
                                    <p class="para">${shipping.street.toUpperCase()}</p>
                                    <p class="para">${shipping.township.toUpperCase()}</p>
                                    <p class="para">${shipping.state.toUpperCase()}</p>
                                    <p class="para">${shipping.country.toUpperCase()}</p>
                                    <p class="para">${shipping.pin_code}</p>
                                    <p class="para">${item.email}</p>
                                    <p class="para">${item.contact}</p>
                                </div>
                            </div>
                        </div>
                        <div class="total-amt">
                            <p class="para2">TOTAL</p>
                            <p class="para"><em><i>&#8377;</i> ${item.amount / 100}</em></p>
                        </div>
                        <div class="oty-in">
                            <p class="para2">QTY: ${item.oty}</p>
                            <p class="para2" id="para2">SHIPPING:<em id="emm"><i>&#8377;</i> ${item.shippingCost/100}</em></p>
                        </div>
                        <div class="order-id">
                            <p class="para">ORDER ID:${item.order_id}</p>
                            <h4 class="order-details-btn"></h4>
                        </div>
                    </div>
                    <div class="order-item-block" id="order-item-block" data-id="${item.order_id}"></div>
                </div>
        `;
        });
        main.innerHTML = result;
    }
    //sets item

const orderedItemsDom = (orders = []) => {
    let itemBlock = document.querySelectorAll('.order-item-block');
    for (let i = 0; i < itemBlock.length; i++) {
        let output = "";
        let id = itemBlock[i].dataset.id;
        let order_item = orders.find(item => item.order_id == id);
        let product = order_item.product;
        product.forEach(item => {
            output += `
            <div class="item" data-id="${item._id}">
                <img src="${item.image}" alt="product_img">
                <div class="order-item-details">
                    <h3>${item.item_name}</h3>
                    <h4>${item.brand_name}</h4>
                    <h5>PRICE: <em><i>&#8377;</i> ${item.price}</em></h5>
                </div>
                <div class="btns">
                    <button id="archieve" data-archieve="archieve" data-id="${order_item.order_id}">Archieve Your Order</button>
                    <button id="cancel-btn" data-cancel="cancel" data-id="${order_item.order_id}">Cancel Your Order</button>
                </div>
            </div>
            <div class="line"></div>
        `;
        });
        itemBlock[i].innerHTML = output;
    }

}

//order is empty
const orderIsEmpty = () => {
    let orderCont = document.getElementById('main-content');
    let cancelCont = document.getElementById('cancel-block');
    let div = document.createElement('div');
    div.innerHTML = `
        <div class="empty-cart">
            <h2 style="margin-top:10px;">Your Orders:</h2>
            <div class="empty-cart-block">
                <img src="/public/images/commonStore/loading-truck-warehouse_190619-9-min.png">
                <h3>There is no orders has been placed yet</h3>
            </div>
        </div>
    `;
    if (cancelCont) {
        orderCont.insertBefore(div, cancelCont);
        return;
    } else {
        orderCont.appendChild(div);
    }

}

//cancelled orders

const cancelledOrdersDom = () => {
    let orderCont = document.getElementById('main-content');
    let section = document.createElement('section');
    section.className = 'cancel-block';
    section.id = 'cancel-block';
    section.innerHTML = `
        <h2>Cancelled orders</h2>
        <div class="cancel-orders-block" id="cancel-orders-block">
        </div>
    `;
    orderCont.appendChild(section);
}
const cancelOrderItemsDom = (product) => {
    let cancelBlock = document.getElementById('cancel-orders-block');
    let output = "";
    product.forEach(item => {
        output += `
            <div class="cancel-item" data-id="${item._id}">
                <img src="${item.image}" alt="product_img">
                <div class="order-item-details">
                    <h3>${item.item_name}</h3>
                    <h4>${item.brand_name}</h4>
                    <h5>PRICE: <em><i>&#8377;</i> ${item.price}</em></h5>
                </div>
                <div class="btns">
                    <button data-buy="buy-again" id="buy-again" data-id="${item._id}">Buy again</button>
                    <button data-del="del" id="order-del" data-id="${item._id}">Delete</button>
                </div>
            </div>
            <div class="line" id="item-line"></div>
        `;
    });
    cancelBlock.innerHTML = output;
}

//order logic event handler func
const buyAgainAction = (id) => {
    let token = userStore.authToken();
    //window.scrollTo(0, 0);
    let requestObj = {
        method: 'GET',
        url: `/api/users/buy_cart/${id}`,
        name: 'Authorization',
        value: token,
        data: null
    }
    loaderDiv();
    makeRequestToServer(requestObj)
        .then(item => {
            let product = item.item;
            let isItem = item.isNotThere;
            if (itemStorage.getItem("cart")) {
                let cartItems = itemStorage.getItem("cart");
                let cart = cartItems["cart"];
                cart.forEach(item => {
                    item.status = "unchecked";
                });
                let index = cart.findIndex(item => item._id == id);
                if (index == -1) {
                    cart.unshift(product);
                } else {
                    let buyItem = cart.find(item => item._id == id);
                    buyItem.status = "checked";
                    cart.splice(index, 1, buyItem);
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
            location.hash = "#delivery-address";
        })
        .catch(err => console.log(err))
        .finally(() => removeOverlayLoader());
}
const cancelOrderRequest = (e, id) => {
        let token = userStore.authToken();
        let mainBlock = document.getElementById('order-main-block');
        let content = document.getElementById('main-content');
        let orderBlock = document.getElementById('order-main');
        let cancelBlock = document.getElementById('cancel-block');
        let parentEl = e.target.parentElement.parentElement.parentElement.parentElement;
        let requestObj = {
            method: 'GET',
            url: `/api/users/cancel_order/${id}`,
            name: 'Authorization',
            value: token,
            data: null,
        }
        loaderDiv();
        makeRequestToServer(requestObj)
            .then(obj => {
                console.log(obj);

                //delete the block in orders
                if (itemStorage.getItem("orders")) {
                    let orderColl = itemStorage.getItem('orders');
                    let orders = orderColl['orders'];
                    let index = orders.findIndex(item => item.order_id == id);
                    //save the cancelled items
                    if (itemStorage.getItem('cancel_orders')) {
                        let cancelledOrder = itemStorage.getItem('cancel_orders');
                        let cancelledItems = cancelledOrder['cancel_orders'];
                        let item = orders.find(item => item.order_id == id);
                        let product = item.product;
                        let products = product.concat(cancelledItems);
                        orders.splice(index, 1);
                        mainBlock.removeChild(parentEl);
                        if (orders.length === 0) {
                            content.removeChild(orderBlock);
                            //orderDom();
                            orderIsEmpty();
                        }
                        if (cancelBlock) {
                            cancelOrderItemsDom(products);
                            cancelOrderEvents();
                        } else {
                            cancelledOrdersDom();
                            cancelOrderItemsDom(products);
                            cancelOrderEvents();
                        }
                    }

                }

            })
            .catch(err => console.log(err))
            .finally(() => removeOverlayLoader());
    }
    //archieve the order
const archieveOrder = (e, id) => {
    let token = userStore.authToken();
    let mainBlock = document.getElementById('order-main-block');
    let content = document.getElementById('main-content');
    let orderBlock = document.getElementById('order-main');
    let parentEl = e.target.parentElement.parentElement.parentElement.parentElement;
    let requestObj = {
        method: 'GET',
        url: `/api/users/archieve_order/${id}`,
        name: 'Authorization',
        value: token,
        data: null,
    }
    loaderDiv();
    makeRequestToServer(requestObj)
        .then(obj => {
            let is_archived = obj.is_archived;
            if (is_archived) {
                if (itemStorage.getItem("orders")) {
                    let orderColl = itemStorage.getItem('orders');
                    let orders = orderColl['orders'];
                    let index = orders.findIndex(item => item.order_id == id);
                    orders.splice(index, 1);
                    mainBlock.removeChild(parentEl);
                    if (orders.length === 0) {
                        content.removeChild(orderBlock);
                        orderIsEmpty();
                    }
                }
            }
        })
        .catch(err => console.log(err))
        .finally(() => removeOverlayLoader());
}

const deleteOrderItems = (e, id) => {
    let token = userStore.authToken();
    let parentBlock = document.getElementById("cancel-orders-block");
    let content = document.getElementById('main-content');
    let cancelBlock = document.getElementById('cancel-block');
    let itemDiv = e.target.parentElement.parentElement;
    let line = e.target.parentElement.parentElement.nextElementSibling;
    let requestObj = {
        method: 'GET',
        url: `/api/users/delete_order/${id}`,
        name: 'Authorization',
        value: token,
        data: null,
    }
    loaderDiv();
    makeRequestToServer(requestObj)
        .then(obj => {
            let isDeleted = obj.is_deleted;
            if (isDeleted) {
                if (itemStorage.getItem('cancel_orders')) {
                    let cancelledOrder = itemStorage.getItem('cancel_orders');
                    let cancelledItems = cancelledOrder['cancel_orders'];
                    let index = cancelledItems.findIndex(item => item._id == id);
                    cancelledItems.splice(index, 1);
                    parentBlock.removeChild(itemDiv);
                    parentBlock.removeChild(line);
                    if (cancelledItems.length === 0) {
                        content.removeChild(cancelBlock);
                    }
                }
            }
        })
        .catch(err => console.log(err))
        .finally(() => removeOverlayLoader());
}

const orderEvents = () => {
    events("#order-main-block", 'click', (e) => {
        e.stopPropagation();
        let id = e.target.dataset.id;
        console.log(id);
        if (id === undefined) return;
        let value = e.target.dataset.cancel;
        if (value === "cancel") {
            cancelOrderRequest(e, id);
        }
    });
    events("#order-main-block", 'click', (e) => {
        e.stopPropagation();
        let id = e.target.dataset.id;
        console.log(id);
        if (id === undefined) return;
        let value = e.target.dataset.archieve;
        if (value === "archieve") {
            archieveOrder(e, id);
        }
    });

}
const cancelOrderEvents = () => {
    events("#cancel-orders-block", 'click', (e) => {
        e.stopPropagation();
        let id = e.target.dataset.id;
        console.log(id);
        if (id === undefined) return;
        let value = e.target.dataset.del;
        if (value === "del") {
            deleteOrderItems(e, id);
        }
    });
    events("#cancel-orders-block", 'click', (e) => {
        e.stopPropagation();
        let id = e.target.dataset.id;
        console.log(id);
        if (id === undefined) return;
        let value = e.target.dataset.buy;
        if (value === "buy-again") {
            buyAgainAction(id);
        }
    });
}


const orderPageUI = () => {
    let orderColl = itemStorage.getItem('orders');
    let orders = orderColl['orders'];
    if (orders.length === 0) {
        orderDom();
        orderIsEmpty();
        return;
    }
    orderDom();
    orderDetailsDom(orders);
    orderedItemsDom(orders);
    orderEvents();
}
const cancelOrdersPageUI = () => {
    let cancelOrderColl = itemStorage.getItem('cancel_orders');
    let cancelOrders = cancelOrderColl['cancel_orders'];
    if (cancelOrders.length === 0) return;
    cancelledOrdersDom();
    cancelOrderItemsDom(cancelOrders);
    cancelOrderEvents();
}

module.exports = {
    orderPageUI,
    cancelOrdersPageUI,
}