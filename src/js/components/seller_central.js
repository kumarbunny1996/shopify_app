require('../../css/seller_central.css');

const getInputHtml = (config = {}) => {
    return `
        <div class="input-wrapper">
            <i class="info-mark2" data-seller="${config.value}">?</i>
            <input type="${config.type||"text"}" class="seller-input" id="${config.id}" placeholder="${config.placeholder || ''}" autocomplete="off" />
            <label for="${config.id}" class="label-content-seller"><span class="content-name-seller">${config.title} *</span></label>
        </div>
    `;
}
const getProductInputHtml = (config = {}) => {
    return `
        <div class="input-wrapper2">
            <i class="info-mark" data-info="${config.value}">?</i>
            <input type="${config.type||"text"}" class="product-input" id="${config.id}" placeholder="${config.placeholder || ''}" autocomplete="off"/>
            <label for="${config.id}" class="label-content-product"><span class="content-name-product">${config.title} *</span></label>
        </div>
    `;
}
const getBtnHtml = (config = {}) => {
    return `
        <div class="btn">
            <button id="${config.id}">${config.title}</button>
        </div>
    `;
}

const getSelectElement = (id) => {
    return `<div class="category">
        <i class="info-mark" data-info="Product category is required">?</i>
        <label class="category-name">Choose category *</label>
        <select class="product-category" id="${id}">
            <option value="Speakers">Speakers</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Men">Men</option>
            <option value="Laptops">Laptops</option>
            <option value="Electronics">Electronics</option>
            <option value="Home-appliances">Home-appliances</option>
            <option value="Women">Women</option>
        </select>
        <div class="sort-icon">
            <i class="fa fa-sort-desc" aria-hidden="true"></i>
        </div>
    </div>
    `;
}

const sellerCentralDom = (htmlFn) => {
    const sellerCentralCont = document.getElementById('content');
    document.title = "@shopify_Seller_Central";
    sellerCentralCont.innerHTML = `
        <div class="seller-header" id="seller-header">
            <span class="logo-seller"><i>@</i>Shopify Seller Central</span>
            <nav class="seller-nav">
                <ul class="seller-nav-links">
                    <li><a href="#blogs">Blogs</a></li>
                    <li id="seller-log-out">Sign out</li>
                </ul>
            </nav>
        </div>
        ${htmlFn}
        <footer id="foot">
            <div class="footer-dead2">
                <ul class="footer-items">
                    <li><a href="#">condition of use & sales</a></li>
                    <li><a href="#">privacy&terms</a></li>
                    <li><a href="#">interest based-ads</a></li>
                    <li><span class="footer-rights"><i class="fa fa-copyright" aria-hidden="true"></i>2020, @shopify.com, Inc. or its affiliates</span></li>
                </ul>
            </div>
        </footer>  
    `;
}

const sellerFormHtml = () => {
    let companyNameInput = getInputHtml({ id: "company-name", title: "Company name", value: "Maximum 256 characters", placeholder: "abc company" });
    let emailInput = getInputHtml({
        id: "email",
        title: "Email",
        placeholder: "abc@gmail.com",
        value: "Add new email address, used for seller account only"
    });
    let businessTypeInput = getInputHtml({
        id: "business-type",
        title: "Business type",
        placeholder: "Textile",
        value: "The business type you run like textile, bookseller"
    });
    let accountInput = getInputHtml({
        id: "account-type",
        title: "Account-type",
        placeholder: "Hdfc bank",
        value: "your bank account details for payments"
    });
    let contactInput = getInputHtml({ id: "contact", title: "Manufacturer Contact", placeholder: "Manufacture company, Paddakkupur, Mumbai", value: "Your company address for future contact" });

    let category = getSelectElement("dropdownBox");

    let sellButton = getBtnHtml({ id: "sellButton", title: "Continue to sell" });


    return `
        <section id="seller-cont">
            <div class="logo-seller2" id="logo-seller2">
                <a href="#sell-on-shopify"><span class="seller-logo-title">@</span>shopify seller central</a>
            </div>
            <div class="seller-form-wrapper" id="seller-form-wrapper">
                <div class="seller-title">
                    <h2><span class="seller-logo"><i></i></span> Create seller account</h2> 
                </div>
                ${companyNameInput}
                ${emailInput}
                <div id="email-err-msg"></div>
                ${businessTypeInput}
                ${accountInput}
                ${contactInput}
                ${sellButton}
                <p class=lead-seller>Already your shopify seller <em id="click-to-sell">Start to sell</em></p>
            </div>
        </section>`;

}

//product form 

const prodFormHtml = () => {


    const itemName = getProductInputHtml({ id: 'item-name', title: "Item name", placeholder: "books", value: "Maximum 256 characters" });

    const brandName = getProductInputHtml({ id: "brand-name", title: "Brand name", placeholder: "Head First", value: "Maximum 256 characters" });

    const sellPrice = getProductInputHtml({ id: "sell-price", title: "Sell price", placeholder: "1000.00", value: "Only numbers allowed\n No money symbols" });

    const quantity = getProductInputHtml({ id: "quantity", title: "Quantity", placeholder: "75", value: "Only numbers allowed" });

    const maxQuantity = getProductInputHtml({ id: "max-quantity", title: "Maximum quantity", placeholder: "250", value: "Only numbers allowed" });

    const shippingCost = getProductInputHtml({ id: "shipping-cost", title: "Shipping cost", placeholder: "25.00", value: "Only numbers allowed\n No money symbols" });

    const prodFeatures = getProductInputHtml({ id: "product-features", title: "Key features", placeholder: "product features", value: "Maximum 256 characters allowed" });

    let category = getSelectElement("dropdownBox2");

    const saveBtn = getBtnHtml({ id: "save-btn", title: "Save product" });


    return `<section id="product-form">
                <div class="logo-seller3" id="logo-seller3">
                    <a href="#sell-on-shopify"><span class="seller-logo-title2">@</span>shopify seller central</a>
                </div>
                <div class="product-form-wrapper" id="product-form-wrapper">
                    <div class="seller-title2">
                        <h2><span class="seller-logo2"></span>Product details</h2> 
                    </div>
                    ${itemName}
                    ${brandName}
                    ${category}
                    ${sellPrice}
                    ${quantity}
                    ${maxQuantity}
                    ${shippingCost}
                    ${prodFeatures}
                    
                    <div class="input-wrapper3">
                        <textarea type="text" class="text-area" id="textarea"  autocomplete="off"></textarea>
                        <label for="textarea" class="textarea-title"><span class="textarea-name">Description *</span></label>
                    </div>
                    <div class=imgLabel>
                        <i class="info-mark" data-info="Product image is required">?</i>
                        <span>Product_image *</span>
                    </div>
                    <div class="img-wrapper"> 
                        <input type="file" accept="image/*" class="product-img" id="product-img" placeholder="img">
                        <img src="" alt="img-preview" class="image-preview">
                        <label for="product-img" class="img-label"><span class="img-name"><i class="fa fa-camera" aria-hidden="true">Upload</i></span></label> 
                     </div>
                    ${saveBtn}
                </div>
            </section>
        `;

}


const imagePreview = () => {
    let inputFile = document.querySelector("input[type='file']");
    let imagePreview = document.querySelector(".image-preview");
    let imageLabel = document.querySelector(".img-label");

    inputFile.addEventListener("change", function(e) {
        //console.log(e.target.value);
        let filePath = e.target.value;
        let allowedExtension = /(\.tiff|\.pjp|\.pjpeg|\.jfif|\.tif|\.gif|\.svg|\.bmp|\.png|\.jpeg|\.jpg|\.webp|\.svgz|\.ico|\.xbm|\.dib)$/i;

        if (!allowedExtension.exec(filePath)) {
            alert('Invalid file type');
            e.target.value = "";
            return false;
        }
        let file = this.files[0];
        //console.log(file);

        function hideShow() {
            imagePreview.style.opacity = "0";
            imageLabel.style.opacity = "1";
        }
        if (file === undefined) return hideShow();
        if (file) {
            const reader = new FileReader();
            imagePreview.style.opacity = "1";
            imageLabel.style.opacity = "0";
            reader.addEventListener('load', function() {
                imagePreview.setAttribute("src", this.result);
                console.log(this.result);
            });
            reader.readAsDataURL(file);
        }
    });
}

module.exports = {
    sellerCentralDom,
    prodFormHtml,
    sellerFormHtml,
    imagePreview
};