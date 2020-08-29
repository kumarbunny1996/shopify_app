const userStore = require("../utils/userStore");
const { itemStorage } = require("../utils/userStore");
const { events } = require("./uiHandler");
const makeRequestToServer = require("../ajax/ajax");
const { saveForLaterDom, savedItemsDom, cartDomIfEmpty, savedItemsIsEmpty, cartDom, itemsDom } = require("../components/cart");
const { removeBlurLoader, blurLoader } = require("../utils/utils");

const checksCartItems = (id) => {
    if (itemStorage.getItem("cart") === undefined || itemStorage.getItem("cart") === null) return;
    let cart = itemStorage.getItem("cart");
    let cartItems = cart["cart"];
    let item = cartItems.find(item => {
        return item._id == id;
    });
    let cartBtn = document.getElementById("cart-btn");
    if (item) {
        cartBtn.innerText = "In cart";
        cartBtn.disabled = true;
    } else {
        cartBtn.innerText = "Add to cart";
        cartBtn.disabled = false;
    }

}

const setCartValues = (cart = []) => {
    let totalPrice = 0;
    let totalItem = 0;
    cart.map(item => {
        let price = item.price.replace(/,/g, "");
        if (item.status === "checked") {
            totalPrice += Number(price * item.amount);
            totalItem += Number(item.amount);
        } else if (item.status === "unchecked") {
            totalPrice += 0;
            totalItem += 0;
        } else {
            totalPrice += Number(price * item.amount);
            totalItem += Number(item.amount);
        }
    });
    //sets qty values
    setQtyValues(cart);
    setsTheStatusOfCheckBox(cart);
    totalCartValues(cart);
    //console.log(totalPrice);
    let price = moneyFormatter(totalPrice);
    //console.log(price);
    let start = document.getElementById('start');
    let end = document.getElementById('end');
    if (price == 0 || totalItem === 0) {
        start.innerHTML = `Subtotal(${totalItem} items):<span>&#8377;</span>${price}`;
        end.innerHTML = `Subtotal(${totalItem} items):<i>&#8377;</i>${price}`;
    }
    if (totalItem === 1) {
        start.innerHTML = `Subtotal(${totalItem} item):<span>&#8377;</span>${price}`;
        end.innerHTML = `Subtotal(${totalItem} item):<i>&#8377;</i>${price}`;
    }
    if (totalItem > 1) {
        start.innerHTML = `Subtotal(${totalItem} items):<span>&#8377;</span>${price}`;
        end.innerHTML = `Subtotal(${totalItem} items):<i>&#8377;</i>${price}`;
    }
}

//sets the values when select/deselect is clicked

const setsValuesOfSelectIsClicked = (obj) => {
    let cart = itemStorage.getItem("cart");
    let cartItems = cart["cart"];
    let status = obj.status;
    //sets the status of checked items
    cartItems.forEach(item => {
        item.status = status;
    });
    let totalPrice = 0;
    let totalItem = 0;
    cartItems.map(item => {
        let price = item.price.replace(/,/g, "");
        totalPrice += Number(price * item.amount);
        totalItem += Number(item.amount);
    });
    let price = moneyFormatter(totalPrice);
    let start = document.getElementById('start');
    let end = document.getElementById('end');
    if (price == 0 || totalItem === 0) {
        start.innerHTML = `Subtotal(${totalItem} items):<span>&#8377;</span>${price}`;
        end.innerHTML = `Subtotal(${totalItem} items):<i>&#8377;</i>${price}`;
    }
    if (totalItem === 1) {
        start.innerHTML = `Subtotal(${totalItem} item):<span>&#8377;</span>${price}`;
        end.innerHTML = `Subtotal(${totalItem} item):<i>&#8377;</i>${price}`;
    }
    if (totalItem > 1) {
        start.innerHTML = `Subtotal(${totalItem} items):<span>&#8377;</span>${price}`;
        end.innerHTML = `Subtotal(${totalItem} items):<i>&#8377;</i>${price}`;
    }
}

const setsValuesOfDeselectIsClicked = (obj) => {
    let cart = itemStorage.getItem("cart");
    let cartItems = cart["cart"];
    let status = obj.status;
    //sets the status of unchecked items
    cartItems.forEach(item => {
        item.status = status;
    });
    let totalPrice = 0;
    let totalItem = 0;
    let price = moneyFormatter(totalPrice);
    let start = document.getElementById('start');
    let end = document.getElementById('end');
    if (price == 0 || totalItem === 0) {
        start.innerHTML = `Subtotal(${totalItem} items):<span>&#8377;</span>${price}`;
        end.innerHTML = `Subtotal(${totalItem} items):<i>&#8377;</i>${price}`;
    }
}


//sets the checkBox checked || unchecked
const setsTheStatusOfCheckBox = (cart = []) => {
    let checkbox = document.querySelectorAll("input[type='checkbox']");
    let deselect = document.getElementById("deselect");
    let select = document.getElementById("select");
    let span = document.getElementById("select-span");
    //console.log(checkbox);
    //sets the status of checkBox in page
    let checkedItems = cart.filter(item => item.status === "checked");
    //console.log({ checked: checkedItems });
    let unCheckedItems = cart.filter(item => item.status === "unchecked");
    //console.log({ unchecked: unCheckedItems });
    if (checkedItems.length === 0 && unCheckedItems.length === 0) {
        deselect.style.display = 'block';
        deselect.style.left = '0px';
        select.style.display = 'none';
        span.style.display = 'none';
    } else if (checkedItems.length !== 0 && unCheckedItems.length !== 0) {
        deselect.style.display = 'none';
        select.style.display = 'block';
        select.style.left = '0px';
        span.style.display = 'none';
    } else if (checkedItems.length === 1) {
        deselect.style.display = 'block';
        deselect.style.left = '0px';
        select.style.display = 'none';
        span.style.display = 'none';
    } else if (unCheckedItems.length === 1) {
        deselect.style.display = 'none';
        select.style.display = 'block';
        select.style.left = '106px';
        span.style.display = 'block';
    } else if (checkedItems.length === 0) {
        deselect.style.display = 'none';
        select.style.display = 'block';
        select.style.left = '106px';
        span.style.display = 'block';
    } else {
        deselect.style.display = 'block';
        deselect.style.left = '0px';
        select.style.display = 'none';
        span.style.display = 'none';
    }
    //sets the html element  to check/unCheck
    for (let i = 0; i < checkbox.length; i++) {
        let id = checkbox[i].dataset.id;
        let item = cart.find(item => item._id == id);
        let isChecked = item.status;
        if (isChecked === "checked") {
            checkbox[i].checked = true;
        } else if (isChecked === "unchecked") {
            checkbox[i].checked = false;
        } else {
            checkbox[i].checked = true;
        }
    }
}

const setQtyValues = (cart = []) => {
    let selectElement = document.querySelectorAll("select[data-opts='options']");
    //console.log(selectElement);
    for (let i = 0; i < selectElement.length; i++) {
        let id = selectElement[i].dataset.id;
        let item = cart.find(item => item._id == id);
        let qty = Number(item.amount);
        if (qty < 10) {
            selectElement[i].value = qty;
        } else {
            let opt = document.createElement('option');
            opt.value = qty;
            opt.innerText = qty;
            selectElement[i].appendChild(opt);
            selectElement[i].value = qty;
        }
    }
}
const setSavedItemsValues = (cart = []) => {
    let totalItem = 0;
    let heading = document.getElementById("saved-items-head");
    cart.map(item => {
        totalItem += Number(item.amount);
    });
    if (totalItem === 1) {
        heading.innerText = `Saved item(${totalItem} item):`;
    } else {
        heading.innerText = `Saved items(${totalItem} items):`;
    }
}

const totalCartValues = (cart = []) => {
    let cartTotal = document.getElementById("cart-total");
    let totalItem = 0;
    cart.map(item => {
        totalItem += Number(item.amount);
    });
    cartTotal.innerText = totalItem;
}

const moneyFormatter = (number) => {
    const formatter = new Intl.NumberFormat('en-IN', {
        //style: 'currency',
        //currency: 'INR',
        minimumFractionDigits: 2
    });
    let price = formatter.format(number);
    return price;
}

const qty10 = (selectEl, qty, id) => {
    if (qty === undefined || qty !== "10+") return;
    if (qty === "10+") {
        let parentDiv = selectEl.parentElement;
        selectEl.style.display = "none";
        selectEl.previousElementSibling.style.display = "none";
        let div = document.createElement('div');
        div.className = "qty-10";
        div.id = "qty-10";
        div.innerHTML = `
            <label for="qty-input">Qty:</label>
            <input type="text" id="qty-input" data-input="input" class="qty-input">
            <div class="btn">
                <button id="update-btn" data-update="update" data-id="${id}">update</button>
            </div>
        `;
        parentDiv.appendChild(div);
    }
}

const updateQuantity = (id, e) => {
    let token = userStore.authToken();
    let input = e.target.parentElement.previousElementSibling.value;
    let inputEl = e.target.parentElement.previousElementSibling;
    //console.log(input);
    if (input === "" || input === undefined || input === "0") return;
    if (input) {
        inputEl.nextElementSibling.firstElementChild.disabled = false;
        let qty = input;
        let data = {
            qty
        };
        let requestObj = {
            method: 'PUT',
            url: `/api/users/quantity/${id}`,
            name: 'Authorization',
            value: token,
            data: data
        }
        let parentDiv = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        //console.log(parentDiv);
        blurLoader(parentDiv)
        makeRequestToServer(requestObj)
            .then(item => {
                let product = item.item;
                //console.log(item);
                if (itemStorage.getItem("cart")) {
                    let cartItems = itemStorage.getItem("cart");
                    let cart = cartItems["cart"];
                    let index = cart.findIndex(item => {
                        return item._id == id;
                    });
                    cart.splice(index, 1, product);
                    setCartValues(cart);
                }
            })
            .catch(err => console.log(err))
            .finally(() => {
                //let parentDiv = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
                removeBlurLoader(parentDiv);
            });
    }
}

const selectQuantity = (e, id) => {
    let token = userStore.authToken();
    let selectEl = e.target;
    let value = selectEl.dataset.opts;
    //console.log(selectEl);
    //console.log(value);
    if (selectEl === null || selectEl === undefined) return;
    if (value === undefined) return;
    if (value === selectEl.dataset.opts) {
        let qty = selectEl.options[selectEl.selectedIndex].text;
        //console.log(qty);
        if (!qty) return;
        if (qty === "10+") return qty10(selectEl, qty, id);
        if (qty) {
            let data = {
                qty
            };
            let requestObj = {
                method: 'PUT',
                url: `/api/users/quantity/${id}`,
                name: 'Authorization',
                value: token,
                data: data
            }
            let parentDiv = selectEl.parentElement.parentElement.parentElement;
            //console.log(parentDiv);
            blurLoader(parentDiv)
            makeRequestToServer(requestObj)
                .then(item => {
                    let product = item.item;
                    // console.log(item);
                    if (itemStorage.getItem("cart")) {
                        let cartItems = itemStorage.getItem("cart");
                        let cart = cartItems["cart"];
                        let index = cart.findIndex(item => {
                            return item._id == id;
                        });
                        cart.splice(index, 1, product);
                        setCartValues(cart);
                    }
                })
                .catch(err => console.log(err))
                .finally(() => {
                    //let parentDiv = selectEl.parentElement.parentElement.parentElement;
                    removeBlurLoader(parentDiv);
                });
        }
    }
}

const deleteCartItem = (e, id) => {
    let token = userStore.authToken();
    let content = document.getElementById("main-content");
    let cartBlock = document.querySelector(".cart-block");
    let itemsBlock = document.getElementById("items-block");
    //let saveBlock = document.querySelector(".saved-items-section");
    let itemDiv = e.target.parentElement.parentElement;
    let line = itemDiv.nextElementSibling;
    //console.log(itemDiv);
    let requestObj = {
        method: 'DELETE',
        url: `/api/users/delete/${id}`,
        name: 'Authorization',
        value: token,
        data: null
    }
    blurLoader(itemDiv)
    makeRequestToServer(requestObj)
        .then(obj => {
            if (obj.isDeleted != true) return;
            if (itemStorage.getItem("cart")) {
                let cartItems = itemStorage.getItem("cart");
                let cart = cartItems["cart"];
                let index = cart.findIndex(item => {
                    return item._id == id;
                });
                cart.splice(index, 1);
                itemsBlock.removeChild(itemDiv);
                itemsBlock.removeChild(line);
                setCartValues(cart);
                if (cart.length === 0) {
                    content.removeChild(cartBlock);
                    cartDomIfEmpty();
                }
            }
        })
        .catch(err => console.log(err))
        .finally(() => {
            removeBlurLoader(itemDiv);
        });
}

const saveForLater = (e, id) => {
    let token = userStore.authToken();
    let content = document.getElementById("main-content");
    let cartBlock = document.querySelector(".cart-block");
    let itemsBlock = document.getElementById("items-block");
    let itemDiv = e.target.parentElement.parentElement;
    let line = itemDiv.nextElementSibling;
    let saveSection = document.querySelector(".saved-items-section");
    //console.log(itemDiv);
    let requestObj = {
        method: 'GET',
        url: `/api/users/saved_items/${id}`,
        name: 'Authorization',
        value: token,
        data: null
    }

    blurLoader(itemDiv);
    makeRequestToServer(requestObj)
        .then(obj => {
            // deleteCartItem(e, id)
            let savedItem = obj.item;
            if (itemStorage.getItem("savedItems")) {
                let item = itemStorage.getItem("savedItems");
                let saveItems = item["savedItems"];
                let index = saveItems.findIndex(item => item._id == id);
                if (index == -1) {
                    saveItems.unshift(savedItem);
                    if (saveSection) {
                        savedItemsDom(saveItems);
                        setSavedItemsValues(saveItems);
                        saveCartLogicEvents();
                    } else {
                        saveForLaterDom();
                        savedItemsDom(saveItems);
                        setSavedItemsValues(saveItems);
                        saveCartLogicEvents();
                    }
                }
            }
            if (itemStorage.getItem("cart")) {
                let cartItems = itemStorage.getItem("cart");
                let cart = cartItems["cart"];
                let index = cart.findIndex(item => {
                    return item._id == id;
                });
                if (index != -1) {
                    cart.splice(index, 1);
                    itemsBlock.removeChild(itemDiv);
                    itemsBlock.removeChild(line);
                    setCartValues(cart);
                    if (cart.length === 0) {
                        content.removeChild(cartBlock);
                        cartDomIfEmpty();
                    }
                }
            }

        })
        .catch(err => console.log(err))
        .finally(() => removeBlurLoader(itemDiv));
}

const seeMoreLikeItems = (e, id) => {
    let category = e.target.dataset.category;
    //console.log(category);
    if (category === undefined) return;
    window.scrollTo(0, 0);
    if (category) return location.hash = `#${category.toLowerCase()}`;
}

const showProductByImage = (e, id) => {
    let category = e.target.dataset.category;
    if (category === undefined) return;
    if (itemStorage.getItem('product')) {
        let product = itemStorage.getItem("product");
        let item = product["product"];
        //let category = item.product.category;
        let item_id = item.product._id;
        if (id != item_id) {
            itemStorage.removeItem("product");
        }
    }
    window.scrollTo(0, 0);
    if (category) return location.hash = `#${category}_${id}`;
}

const showProductByBrandName = (e, id) => {
    let category = e.target.dataset.category;
    if (category === undefined) return;
    if (itemStorage.getItem('product')) {
        let product = itemStorage.getItem("product");
        let item = product["product"];
        //let category = item.product.category;
        let item_id = item.product._id;
        if (id != item_id) {
            itemStorage.removeItem("product");
        }
    }
    window.scrollTo(0, 0);
    if (category) return location.hash = `#${category}_${id}`;
}

const showProductByItemName = (e, id) => {
    let category = e.target.dataset.category;
    if (category === undefined) return;
    if (itemStorage.getItem('product')) {
        let product = itemStorage.getItem("product");
        let item = product["product"];
        //let category = item.product.category;
        let item_id = item.product._id;
        if (id != item_id) {
            itemStorage.removeItem("product");
        }
    }
    window.scrollTo(0, 0);
    if (category) return location.hash = `#${category}_${id}`;
}

const deleteSavedCartItem = (e, id) => {
    return new Promise(resolve => {
        let token = userStore.authToken();
        let itemDiv = e.target.parentElement.parentElement;
        //console.log(itemDiv);
        let requestObj = {
            method: 'DELETE',
            url: `/api/users/delete/saved_item/${id}`,
            name: 'Authorization',
            value: token,
            data: null
        }
        blurLoader(itemDiv);
        makeRequestToServer(requestObj)
            .then(obj => resolve(obj))
            .catch(err => console.log(err))
            .finally(() => removeBlurLoader(itemDiv));
    });
}
const deleteSavedItem = (e, id) => {
    let content = document.getElementById("main-content");
    let cartBlockSaved = document.querySelector(".saved-items-section");
    let itemsBlockSaved = document.getElementById("saved-items-block");
    let itemDiv = e.target.parentElement.parentElement;
    let line = itemDiv.nextElementSibling;
    deleteSavedCartItem(e, id)
        .then(obj => {
            if (obj.isDeleted != true) return;
            if (itemStorage.getItem("savedItems")) {
                let savedItems = itemStorage.getItem("savedItems");
                let savedCart = savedItems["savedItems"];
                let index = savedCart.findIndex(item => {
                    return item._id == id;
                });
                savedCart.splice(index, 1);
                itemsBlockSaved.removeChild(itemDiv);
                itemsBlockSaved.removeChild(line);
                setSavedItemsValues(savedCart);
                if (savedCart.length === 0) {
                    content.removeChild(cartBlockSaved);
                    savedItemsIsEmpty();
                }
            }
        })
}
const addToCartFromSaved = (e, id) => {
    let token = userStore.authToken();
    let content = document.getElementById("main-content");
    let cartBlockSaved = document.querySelector(".saved-items-section");
    let itemsBlockSaved = document.getElementById("saved-items-block");
    let itemDiv = e.target.parentElement.parentElement;
    let line = itemDiv.nextElementSibling;

    //console.log(itemDiv);
    let requestObj = {
        method: 'GET',
        url: `/api/users/item_to_cart/${id}`,
        name: 'Authorization',
        value: token,
        data: null
    }

    blurLoader(itemDiv);
    //deleteSavedItem(e, id);
    makeRequestToServer(requestObj)
        .then(obj => {
            let product = obj.item;
            let isItem = obj.isNotThere;
            if (itemStorage.getItem("cart")) {
                let cart = itemStorage.getItem("cart");
                let cartItems = cart["cart"];
                let index = cartItems.findIndex(item => item._id == id);
                if (index == -1) {
                    cartItems.unshift(product);
                    itemsDom(cartItems);
                    setCartValues(cartItems);
                    cartLogicEvents();
                }
            }
            if (itemStorage.getItem("savedItems")) {
                let savedCart = itemStorage.getItem("savedItems");
                let savedItems = savedCart["savedItems"];
                let index = savedItems.findIndex(item => item._id == id);
                if (index != -1) {
                    savedItems.splice(index, 1);
                    itemsBlockSaved.removeChild(itemDiv);
                    itemsBlockSaved.removeChild(line);
                    setSavedItemsValues(savedItems);
                    saveCartLogicEvents();
                    if (savedItems.length === 0) {
                        content.removeChild(cartBlockSaved);
                        savedItemsIsEmpty();
                    }
                }
                // console.log(savedItems);
            }
        })
        .catch(err => console.log(err))
        .finally(() => {
            removeBlurLoader(itemDiv);
            window.scrollTo(0, 0);
        });

}

//checked cart items

const checkedCartItems = (e, id) => {
    let token = userStore.authToken();
    let checkElement = e.target;
    let isChecked = checkElement.checked;
    //console.log(isChecked);
    let parent = checkElement.parentElement;
    if (isChecked === true) {
        let data = {
            status: "checked",
        };
        let requestObj = {
            method: 'PUT',
            url: `/api/users/checked_items/${id}`,
            name: 'Authorization',
            value: token,
            data: data
        }
        blurLoader(parent);
        makeRequestToServer(requestObj)
            .then(obj => {
                // console.log(obj);
                if (itemStorage.getItem("cart")) {
                    let cartItem = itemStorage.getItem("cart");
                    let cart = cartItem["cart"];
                    let checkedItem = cart.find(item => item._id == id);
                    //let item = {...checkedItem, status: "checked" };
                    checkedItem.status = "checked";
                    let index = cart.findIndex(item => item._id == id);
                    cart.splice(index, 1, checkedItem);
                    setCartValues(cart);
                    //console.log(cart);
                }
            })
            .catch(err => console.log(err))
            .finally(() => removeBlurLoader(parent));
    } else {
        let data = {
            status: "unchecked",
        };
        let requestObj = {
            method: 'PUT',
            url: `/api/users/checked_items/${id}`,
            name: 'Authorization',
            value: token,
            data: data
        }
        blurLoader(parent);
        makeRequestToServer(requestObj)
            .then(obj => {
                //console.log(obj);
                let cartItem = itemStorage.getItem("cart");
                let cart = cartItem["cart"];
                let checkedItem = cart.find(item => item._id == id);
                // let item = {...checkedItem, status: "unchecked" };
                checkedItem.status = "unchecked";
                let index = cart.findIndex(item => item._id == id);
                cart.splice(index, 1, checkedItem);
                setCartValues(cart);
                //console.log(cart);
            })
            .catch(err => console.log(err))
            .finally(() => removeBlurLoader(parent));
    }
}

//requestTo server deselect is clicked

const deselectRequest = (e) => {
    let token = userStore.authToken();
    let itemsBlock = document.getElementById("items-block");
    let checkbox = document.querySelectorAll("input[type='checkbox']");
    let deselect = document.getElementById("deselect");
    let select = document.getElementById("select");
    let span = document.getElementById("select-span");
    //console.log(checkbox);
    let data = {
        status: "unchecked",
    };
    let requestObj = {
        method: 'PUT',
        url: `/api/users/select_action`,
        name: 'Authorization',
        value: token,
        data: data
    }
    blurLoader(itemsBlock);
    makeRequestToServer(requestObj)
        .then(obj => {
            //console.log(obj);
            for (let i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = false;
            }
            deselect.style.display = 'none';
            select.style.display = 'block';
            span.style.display = "block";
            select.style.left = "106px";
            setsValuesOfDeselectIsClicked(obj);
        })
        .catch(err => console.log(err))
        .finally(() => removeBlurLoader(itemsBlock));
}

const selectRequest = (e) => {
    let token = userStore.authToken();
    let itemsBlock = document.getElementById("items-block");
    let checkbox = document.querySelectorAll("input[type='checkbox']");
    let deselect = document.getElementById("deselect");
    let select = document.getElementById("select");
    let span = document.getElementById("select-span");
    //console.log(checkbox);
    let data = {
        status: "checked",
    };
    let requestObj = {
        method: 'PUT',
        url: `/api/users/select_action`,
        name: 'Authorization',
        value: token,
        data: data
    }
    blurLoader(itemsBlock);
    makeRequestToServer(requestObj)
        .then(obj => {
            //console.log(obj);
            for (let i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = true;
            }
            deselect.style.display = 'block';
            deselect.style.left = '0px';
            select.style.display = 'none';
            span.style.display = "none";
            setsValuesOfSelectIsClicked(obj);
        })
        .catch(err => console.log(err))
        .finally(() => removeBlurLoader(itemsBlock));
}

//buy cart logic
const buyCartItems = (e) => {
    let token = userStore.authToken();
    let itemsBlock = document.getElementById("main-content");
    let data = e.target.dataset.id;
    if (!data) return;
    let requestObj = {
        method: 'GET',
        url: `/api/users/check_user`,
        name: 'Authorization',
        value: token,
        data: null
    }
    blurLoader(itemsBlock);
    makeRequestToServer(requestObj)
        .then(obj => {
            //console.log(obj);
            let address = obj.address;
            if (itemStorage.getItem("address")) {
                location.hash = "#delivery-address";
            } else {
                itemStorage.setItem("address", address);
                location.hash = "#delivery-address";
            }
        })
        .catch(err => console.log(err))
        .finally(() => removeBlurLoader(itemsBlock));

}
const cartLogicEvents = () => {
    events("#items-block", 'change', (e) => {
        e.stopPropagation();
        let id = e.target.dataset.id;
        if (id === undefined) return;
        // console.log(e.target);
        // console.log(id);
        if (id) {
            let selectEl = e.target.dataset.opts;
            let checkBox = e.target.dataset.pointer;
            //console.log(checkBox);
            if (selectEl === "options") return selectQuantity(e, id);
            if (checkBox === "checkbox") return checkedCartItems(e, id);
        }
    });
    events("#items-block", "keyup", (e) => {
        e.stopPropagation();
        let value = e.target.dataset.input;
        //console.log(value);
        if (value === undefined) return;
        if (value) {
            let inputEl = e.target;
            //console.log(inputEl);
            let input = e.target.value;
            let inputRe = /^[1-9]{1,3}$/;
            if (!inputRe.exec(input)) {
                input = "";
                inputEl.nextElementSibling.firstElementChild.disabled = true;
                return false;
            } else {
                inputEl.nextElementSibling.firstElementChild.disabled = false;
                return true;
            }
        }
    })
    events("#items-block", 'click', (e) => {
        e.stopPropagation();
        let id = e.target.dataset.id;
        if (id === undefined) return;
        //console.log(e.target);
        //console.log(id);
        if (id) {
            let update = e.target.dataset.update;
            let del = e.target.dataset.del;
            let save = e.target.dataset.save;
            let more = e.target.dataset.more;
            let image = e.target.dataset.image;
            let brand = e.target.dataset.brand;
            let name = e.target.dataset.item;
            if (update === "update") return updateQuantity(id, e);
            if (del === "remove") return deleteCartItem(e, id);
            if (save === "save") return saveForLater(e, id);
            if (more === "more") return seeMoreLikeItems(e, id);
            if (image === "image") return showProductByImage(e, id);
            if (brand === "brand") return showProductByBrandName(e, id);
            if (name === "name") return showProductByItemName(e, id);
        }
    });

    events("#deselect", 'click', (e) => {
        deselectRequest(e);
    });
    events("#select", 'click', (e) => {
        selectRequest(e);
    });
    events("#cart-to-buy", 'click', (e) => {
        buyCartItems(e);
    });
}

const saveCartLogicEvents = () => {
    events("#saved-items-block", 'click', (e) => {
        e.stopPropagation();
        let id = e.target.dataset.id;
        if (id === undefined) return;
        //console.log(e.target);
        //console.log(id);
        if (id) {
            let del = e.target.dataset.del;
            let more = e.target.dataset.more;
            let add = e.target.dataset.add;
            let image = e.target.dataset.image;
            let brand = e.target.dataset.brand;
            let name = e.target.dataset.item;
            if (del === "remove") return deleteSavedItem(e, id);
            if (add === "add") return addToCartFromSaved(e, id);
            if (more === "more") return seeMoreLikeItems(e, id);
            if (image === "image") return showProductByImage(e, id);
            if (brand === "brand") return showProductByBrandName(e, id);
            if (name === "name") return showProductByItemName(e, id);
        }
    });
}

module.exports = {
    checksCartItems,
    setCartValues,
    totalCartValues,
    moneyFormatter,
    cartLogicEvents,
    setSavedItemsValues,
    saveCartLogicEvents
}