require("../../css/cart.css");

const itemsDom = (cart = []) => {
    const itemsBlock = document.getElementById("items-block");
    let result = "";
    cart.forEach(item => {
        result += `
            <div class="cart-item" data-id="${item._id}">
                <div class="input-check">
                    <input data-id="${item._id}" data-pointer="checkbox" type="checkbox" checked>
                </div> 
                <img src="${item.image}" data-id="${item._id}" data-category="${item.category}" data-image="image" alt="product-img">
                <div class="item-details">
                    <h3 data-id="${item._id}" data-category="${item.category}" data-item="name">${item.item_name}</h3>
                    <h4 data-id="${item._id}" data-category="${item.category}" data-brand="brand">${item.brand_name}</h4>
                    <h5>Shipping cost:<i>&#8377;</i>${item.shipping_cost}</h5>
                    <div class="qty">
                        <label for="quantity">Qty:</label>
                        <select id="quantity" data-id="${item._id}" data-opts="options"> 
                            <option value="1">1</option> 
                            <option value="2">2</option> 
                            <option value="3">3</option>
                            <option value="4">4</option> 
                            <option value="5">5</option>
                            <option value="6">6</option> 
                            <option value="7">7</option> 
                            <option value="8">8</option> 
                            <option value="9">9</option> 
                            <option value="10+">10+</option> 
                        </select>
                    </div> 
                    <span data-id="${item._id}" data-del="remove">Delete</span> 
                    <span data-id="${item._id}" data-save="save">Save for later</span> 
                    <span data-id="${item._id}" data-category="${item.category}" data-more="more">See more like this</span> 
                    <div class="price">
                        <h6><i>&#8377;</i>${item.price}</h6>
                    </div>
                </div>
            </div> 
            <div class="line"></div>   
        `;
    });
    itemsBlock.innerHTML = result;
}

const cartDom = () => {
    const cartCont = document.getElementById("main-content");
    let emptyBlock = document.querySelector('.cart-empty');
    document.title = "@shopify_cart";
    if (emptyBlock) {
        cartCont.removeChild(emptyBlock);
    }
    cartCont.innerHTML = `
        <section class="cart-block">
            <div class="buy-block">
                <h4 id="start"></h4>
                <div class="btn">
                    <button data-id="cart">Proceed to buy</button>
                </div>
                <div class="buy-cont">
                    <i>&#128737;</i>
                    <h4><span>100%</span> Purchase Protection</h4>
                    <h6>Original Products | Secure Payments</h6>
                </div>
            </div>
            <div class="top">
                <h2>Shopping cart</h2>
                <h6 id="deselect">Deselect all items</h6>
                <span id="select-span" style="display:none;color:#032f3e;font-size:13px;position:absolute;left:0px;">No items selected.</span>
                <h6 id="select" style="display:none;">Select all items</h6>
                <span id="price">Price</span>
            </div>
            <div class="items-block" id="items-block">
            </div>
            <div class="end">
                <span id="end"></span>
            </div>
        </section>
`;
}

const cartDomIfEmpty = () => {
    const cartCont = document.getElementById("main-content");
    let emptyBlock = document.querySelector('.empty-saved');
    let saveBlock = document.querySelector('.saved-items-section');
    document.title = "@shopify_cart";
    const div = document.createElement('div');
    div.className = "cart-empty";
    div.innerHTML = `
        <div class="empty-cart">
            <h2 style="margin-top:10px;">Shopping cart(0 items):</h2>
            <div class="empty-cart-block">
                <img src="/public/images/commonStore/loading-truck-warehouse_190619-9-min.png">
                <h3>Your shopping basket is empty</h3>
            </div>
        </div>
    `;
    if (saveBlock) {
        return cartCont.insertBefore(div, saveBlock);
    }
    if (emptyBlock) {
        return cartCont.insertBefore(div, emptyBlock);
    }
    if (saveBlock === null && emptyBlock === null) {
        cartCont.appendChild(div);
    }
}

const savedItemsIsEmpty = () => {
    const cartCont = document.getElementById("main-content");
    document.title = "@shopify_cart";
    const div = document.createElement('div');
    div.className = "empty-saved";
    div.innerHTML = `
        <div class="empty-saved-cart">
            <h2>Saved items(0 items):</h2>
            <div class="empty-saved-cart-block">
                <img src="/public/images/commonStore/6660132.png">
                <h3>There are no saved items yet</h3>
            </div>
        </div>
    `;
    cartCont.appendChild(div);
}

const saveForLaterDom = () => {
    const cartCont = document.getElementById("main-content");
    let emptyBlock = document.querySelector('.empty-saved');
    if (emptyBlock) {
        cartCont.removeChild(emptyBlock);
    }
    document.title = "@shopify_cart";
    const div = document.createElement('div');
    div.className = "saved-items-section";
    div.innerHTML = `
        <div class="saved-items">
            <h2 id="saved-items-head"></h2>
            <div class="saved-items-block" id="saved-items-block">
            </div>
        </div>
    `;
    cartCont.appendChild(div);
}

const savedItemsDom = (cart = []) => {
    const savedItemsBlock = document.getElementById("saved-items-block");
    let result = "";
    cart.forEach(item => {
        result += `
            <div class="saved-item" data-id="${item._id}">
                <img src="${item.image}" data-id="${item._id}" data-category="${item.category}" data-image="image" alt="product-img">
                <div class="item-details2">
                    <h3 data-id="${item._id}" data-category="${item.category}" data-item="name">${item.item_name}</h3>
                    <h4 data-id="${item._id}" data-category="${item.category}" data-brand="brand">${item.brand_name}</h4>
                    <h5>Price:<i>&#8377;</i>${item.price}</h5>
                    <span data-id="${item._id}" data-del="remove">Delete</span> 
                    <span data-id="${item._id}" data-add="add">Add to cart</span> 
                    <span data-id="${item._id}" data-category="${item.category}" data-more="more">See more like this</span> 
                </div>
            </div> 
            <div class="line"></div>   
        `;
    });
    savedItemsBlock.innerHTML = result;
}

module.exports = {
    cartDom,
    itemsDom,
    cartDomIfEmpty,
    savedItemsIsEmpty,
    saveForLaterDom,
    savedItemsDom
}