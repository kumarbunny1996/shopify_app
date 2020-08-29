require("../../css/category.css");

const banner = (config = {}) => {
    return `
        <div class="ad-banner">
            <p>${config.para}</p>
            <div class="ad-image">
                 <img src="${config.img}">
            </div>
        </div>
    `;
}


const mobileCategory = () => {
    let mobileBanner = banner({
        para: "One step to mobile store",
        img: "/public/images/mobilesStore/Mobile-Phone-PNG-Transparent-HD-Photo-min.png"
    });

    const mobileCont = document.getElementById('main-content');
    document.title = "@Shopify_Mobile";
    mobileCont.innerHTML = `
        <section class="sp-category-layout">
            ${mobileBanner}
            <div class="product-category mobile-category">
                <h2>Top brands of mobile here</h2>
                <div class="product-container" id="mobileData">
                </div>
            </div>
        </section>
    `;
}

const speakerCategory = () => {
    let speakerBanner = banner({
        para: `Wireless speaker, headsets,<br> speakers`,
        img: "/public/images/speakers/Bluetooth-Headset-PNG-Background-Image-min.png"
    });

    const speakerCont = document.getElementById('main-content');
    document.title = "@Shopify_Speakers";
    speakerCont.innerHTML = `
        <section class="sp-category-layout2">
            ${speakerBanner}
            <div class="product-category2 speaker-category">
                <h2>Top brands of speaker here</h2>
                <div class="product-container2" id="speakerData">
                </div>
            </div>
        </section>
    `;
}

const laptopCategory = () => {
    let laptopBanner = banner({
        para: `Brand laptops,<br>macbook `,
        img: "/public/images/laptopStore/pngkey.com-macbook-air-png-1844127-min.png"
    });

    const laptopCont = document.getElementById('main-content');
    document.title = "@Shopify_Laptops";
    laptopCont.innerHTML = `
        <section class="sp-category-layout3">
            ${laptopBanner}
            <div class="product-category3 laptop-category">
                <h2>Top brands of laptops here</h2>
                <div class="product-container3" id="laptopData">
                </div>
            </div>
        </section>
    `;
}

const homeCategory = () => {
    let homeBanner = banner({
        para: `looking products for<br> your home `,
        img: "/public/images/homeStore/Home-Appliance-PNG-Pic-min.png"
    });

    const homeCont = document.getElementById('main-content');
    document.title = "@Shopify_Home_Appliances";
    homeCont.innerHTML = `
        <section class="sp-category-layout4">
            ${homeBanner}
            <div class="product-category4 home-category">
                <h2>Home appliances here</h2>
                <div class="product-container4" id="homeData">
                </div>
            </div>
        </section>
    `;
}

const electronicsCategory = () => {
    let electronicsBanner = banner({
        para: `Looking for electronic items`,
        img: "/public/images/electronics/pngkey.com-table-fan-png-351479-min.png"
    });

    const electronicsCont = document.getElementById('main-content');
    document.title = "@Shopify_Electronics";
    electronicsCont.innerHTML = `
        <section class="sp-category-layout5">
            ${electronicsBanner}
            <div class="product-category5 electronics-category">
                <h2>Top brands of electronics here</h2>
                <div class="product-container5" id="electronicsData">
                </div>
            </div>
        </section>
    `;
}

const womenCategory = () => {
    let womenBanner = banner({
        para: `Women's collection`,
        img: "/public/images/womens/Floral-Dress-PNG-HD-min.png"
    });

    const womenCont = document.getElementById('main-content');
    document.title = "@Shopify_Women";
    womenCont.innerHTML = `
        <section class="sp-category-layout6">
            ${womenBanner}
            <div class="product-category6 women-category">
                <h2>Women's pick</h2>
                <div class="product-container6" id="womenData">
                </div>
            </div>
        </section>
    `;
}

const menCategory = () => {
    let menBanner = banner({
        para: `Men's collection`,
        img: "/public/images/mens/pngkey.com-breaking-bad-png-9530014-min.png"
    });

    const menCont = document.getElementById('main-content');
    document.title = "@Shopify_Mens";
    menCont.innerHTML = `
        <section class="sp-category-layout7">
            ${menBanner}
            <div class="product-category7 men-category">
                <h2>Top brands available here</h2>
                <div class="product-container7" id="menData">
                </div>
            </div>
        </section>
    `;
}

const categoryDom = (config = {}) => {
    return `
        <div class="${config.class}">
            <div class="img-container">
                <img alt="product-img" src="${config.img}" data-value="${config.value}">
            </div>
            <div class="product-details">
                <h4 data-value="${config.value}">${config.title}</h4>
            </div>
        </div>
    `;
}

const allCategories = () => {
    let allBanner = banner({
        para: `Shop by categories`,
        img: "/public/images/commonStore/amazon-dhamaka-1.png"
    });

    let mobileSec = categoryDom({
        class: "mobile-section",
        img: "/public/images/mobilesStore/IPhone-Apple-PNG-File.png",
        title: "Mobiles",
        value: "#mobiles"
    });

    let speakerSec = categoryDom({
        class: "speaker-section",
        img: "/public/images/speakers/Red-Bluetooth-Speaker-Transparent-PNG-min.png",
        title: "Speakers",
        value: "#speakers"
    });
    let laptopSec = categoryDom({
        class: "laptop-section",
        img: "/public/images/laptopStore/laptop-hd-png-laptop-png-free-download-485-min.png",
        title: "Laptops",
        value: "#laptops"
    });
    let electronicsSec = categoryDom({
        class: "electronics-section",
        img: "/public/images/electronics/pngkey.com-camera-png-80856-min.png",
        title: "Electronics",
        value: "#electronics"
    });
    let homeSec = categoryDom({
        class: "home-section",
        img: "/public/images/homeStore/pngkey.com-cricket-clipart-png-2494895-min.png",
        title: "Home-appliances",
        value: "#home-appliances"
    });
    let womenSec = categoryDom({
        class: "women-section",
        img: "/public/images/womens/pngkey.com-female-model-png-986952-min.png",
        title: "Women",
        value: "#women"
    })
    let menSec = categoryDom({
        class: "men-section",
        img: "/public/images/mens/Maroon-T-Shirt-PNG-min.png",
        title: "Men",
        value: "#men",
    });

    const allCategoriesCont = document.getElementById('main-content');
    document.title = "@Shopify_All_categories";
    allCategoriesCont.innerHTML = `
        <section class="sp-all-categories">
            ${allBanner}
            <div class="all-categories">
                <h2>Top brands available here</h2>
                <div class="category-container" id="all-categories">
                    ${mobileSec}
                    ${speakerSec}
                    ${laptopSec}
                    ${electronicsSec}
                    ${homeSec}
                    ${womenSec}
                    ${menSec}
                </div>
            </div>
        </section>
    `;
}



module.exports = {
    mobileCategory,
    speakerCategory,
    laptopCategory,
    homeCategory,
    electronicsCategory,
    womenCategory,
    menCategory,
    allCategories,
    banner
}