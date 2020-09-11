const { events } = require('../app/uiHandler');
const userStore = require("../utils/userStore");

require('../../css/home.css');

const itemsCollectionDom = (config = {}) => {
    return `
        <div class="sp-card-container container-${config.number}">
            <div class="card card-${config.number}">
                <div class="card-header">
                    <h2>${config.title}</h2>
                </div>
                <div class="card-body" data-id=${config.value}>
                    <div class="grid-row row-1">
                        <div class="grid-container contain-1">  
                            <div class="card-img">
                                <img alt="${config.container1.alt}" src="${config.container1.src}" data-hires="${config.container1.value}">
                            </div>
                            <div class="card-link">
                                <span>${config.container1.link}</span>
                            </div>                                  
                        </div>
                        <div class="grid-container contain-2">
                            <div class="card-img">
                                <img alt="${config.container2.alt}" src="${config.container2.src}" data-hires="${config.container2.value}">
                            </div>
                            <div class="card-link">
                                <span>${config.container2.link}</span>
                            </div>                                  
                        </div> 
                    </div>
                    <div class="grid-row row-2">
                        <div class="grid-container contain-3">                        
                            <div class="card-img">
                                <img alt="${config.container3.alt}" src="${config.container3.src}"
                                data-hires="${config.container3.value}">
                            </div>
                            <div class="card-link">
                                <span>${config.container3.link}</span>
                            </div>                          
                        </div>
                        <div class="grid-container contain-4">
                            <div class="card-img">
                                <img alt="${config.container4.alt}" src="${config.container4.src}" data-hires="${config.container4.value}">
                            </div>
                            <div class="card-link">
                                <span>${config.container4.link}</span>
                            </div>                      
                        </div> 
                    </div>                                
                </div>
                <div class="card-footer">
                    <span><a href="#${config.value}">See more</a></span>
                </div>
            </div>
        </div>
    `;
}

const signInDom = () => {
    return `
        <div id="signIn-card" class="sp-sign-card" data-sign="sign-in">
            <div class="sign-card">
                <div class="sign-card-header">
                    <h4>Sign in for you best experience</h4>
                </div>
                <div class="sign-card-body" id="sign-card-body">
                    <button>Sign in</button>
                </div>
            </div>
            <div class="sm-banner">
                <img id="sm-banner" data-id="laptops-cate" src="/public/images/laptopStore/Macbook-Transparent-Background-min.png">
            </div>
        </div>
    `;
}

const yourAccount = () => {
    return `
        <div id="sp-account-card" class="sp-card-container sp-account-layout" data-account="your-account" style="display:none;">
            <div class="card account-card">
                <div class="card-header account-card-header">
                    <i class="fa fa-user-circle-o"></i>
                    <h3 id="card-username"></h3>
                </div>
                <div class="card-body account-card-body" id="card-body">
                    <div class="grid-row row-1">
                        <div class="grid-container contain-1" data-id="your-orders-home">  
                            <div class="card-img">
                                <img alt="your-orders" src="/public/images/commonStore/6660132.png" data-hires="/public/images/commonStore/6660132.png">
                            </div>
                            <div class="card-link">
                                <span>your orders</span>
                            </div>                                  
                        </div>
                        <div class="grid-container contain-2" data-id="mobiles-cate">
                            <div class="card-img">
                                <img alt="mobiles" src="/public/images/mobilesStore/Mobile-Phone-Download-PNG-Image-min.png" data-hires="/public/images/mobilesStore/Mobile-Phone-Download-PNG-Image-min.png">
                            </div>
                            <div class="card-link">
                                <span>mobiles</span>
                            </div>                                  
                        </div> 
                    </div>
                    <div class="grid-row row-2">
                        <div class="grid-container contain-3" data-id="laptops-cate">                        
                            <div class="card-img">
                                <img alt="laptops" src="/public/images/laptopStore/pngkey.com-computadoras-png-4085839-min.png"
                                data-hires="/public/images/laptopStore/pngkey.com-computadoras-png-4085839-min.png">
                            </div>
                            <div class="card-link">
                                <span>laptops</span>
                            </div>                          
                        </div>
                        <div class="grid-container contain-4" data-id="dress-cate">
                            <div class="card-img">
                                <img alt="fashion" src="/public/images/mens/pngkey.com-snoop-png-10087600-min.png" data-hires="/public/images/mens/pngkey.com-snoop-png-10087600-min.png">
                            </div>
                            <div class="card-link">
                                <span>Dress</span>
                            </div>                      
                        </div> 
                    </div>                                
                </div>
            </div>
        </div>
    `;
}

const homePage = () => {

    let homeAppliances = itemsCollectionDom({
        number: 0,
        title: "Top picks for your home",
        value: "home-appliances",
        container1: {
            alt: "Foggs",
            src: "/public/images/homeStore/pngkey.com-fogg-png-2700196-min.png",
            value: "/public/images/homeStore/pngkey.com-fogg-png-2700196-min.png",
            link: "Foggs",
        },
        container2: {
            alt: "Home appliance",
            src: "/public/images/homeStore/Home-Appliance-PNG-Pic-min.png",
            value: "/public/images/homeStore/Home-Appliance-PNG-Pic-min.png",
            link: "Home appliances",
        },
        container3: {
            alt: "fryer",
            src: "/public/images/homeStore/pngkey.com-fryer-png-3830030-min.png",
            value: "/public/images/homeStore/pngkey.com-fryer-png-3830030-min.png",
            link: "fryer",
        },
        container4: {
            alt: "cooking-clipart",
            src: "/public/images/homeStore/pngkey.com-cooking-clipart-png-4070385-min.png",
            value: "/public/images/homeStore/pngkey.com-cooking-clipart-png-4070385-min.png",
            link: "cooking-clipart",
        },

    });

    let womenWear = itemsCollectionDom({
        number: 1,
        title: "Women's wear basics",
        value: "women",
        container1: {
            alt: "T-shirts",
            src: "/public/images/womens/pngkey.com-white-shirt-png-4460853-min.png",
            value: "/public/images/womens/pngkey.com-white-shirt-png-4460853-min.png",
            link: "T-shirts",
        },
        container2: {
            alt: "Dress",
            src: "/public/images/womens/Floral-Dress-PNG-Pic-min.png",
            value: "/public/images/womens/Floral-Dress-PNG-Pic-min.png",
            link: "Dress",
        },
        container3: {
            alt: "T-shirts",
            src: "/public/images/womens/pngkey.com-the-neighbourhood-logo-png-6427538-min.png",
            value: "/public/images/womens/pngkey.com-the-neighbourhood-logo-png-6427538-min.png",
            link: "T-shirts",
        },
        container4: {
            alt: "Dress",
            src: "/public/images/womens/Floral-Dress-PNG-HD-min.png",
            value: "/public/images/womens/Floral-Dress-PNG-HD-min.png",
            link: "Dress",
        },

    });

    let menWear = itemsCollectionDom({
        number: 2,
        title: "Men's wear basics",
        value: "men",
        container1: {
            alt: "T-shirts",
            src: "/public/images/mens/Black-T-Shirt-PNG.png",
            value: "/public/images/mens/Black-T-Shirt-PNG.png",
            link: "T-shirts",
        },
        container2: {
            alt: "Dress",
            src: "/public/images/mens/Dress-Shirt-PNG-Clipart-Background-min.png",
            value: "/public/images/mens/Dress-Shirt-PNG-Clipart-Background-min.png",
            link: "Dress",
        },
        container3: {
            alt: "T-shirts",
            src: "/public/images/mens/pngkey.com-breaking-bad-png-9530014-min.png",
            value: "/public/images/mens/pngkey.com-breaking-bad-png-9530014-min.png",
            link: "T-shirts",
        },
        container4: {
            alt: "Dress",
            src: "/public/images/mens/Polo-Shirt-PNG-Image.png",
            value: "/public/images/mens/Polo-Shirt-PNG-Image.png",
            link: "Dress",
        },

    });
    let mobiles = itemsCollectionDom({
        number: 3,
        title: "Top mobile brands for you",
        value: "mobiles",
        container1: {
            alt: "Samsung",
            src: "/public/images/mobilesStore/Smartphone-Transparent-Background.png",
            value: "/public/images/mobilesStore/Smartphone-Transparent-Background.png",
            link: "samsung",
        },
        container2: {
            alt: "Vivo",
            src: "/public/images/mobilesStore/Mobile-Phone-PNG-HD-min.png",
            value: "/public/images/mobilesStore/Mobile-Phone-PNG-HD-min.png",
            link: "Vivo",
        },
        container3: {
            alt: "Redmi",
            src: "/public/images/mobilesStore/Mobile-Phone-PNG-Transparent-HD-Photo-min.png",
            value: "/public/images/mobilesStore/Mobile-Phone-PNG-Transparent-HD-Photo-min.png",
            link: "Redmi",
        },
        container4: {
            alt: "Apple",
            src: "/public/images/mobilesStore/IPhone-Apple-PNG-Clipart.png",
            value: "/public/images/mobilesStore/IPhone-Apple-PNG-Clipart.png",
            link: "Apple",
        },

    });

    let speakers = itemsCollectionDom({
        number: 4,
        title: "Top picks for you",
        value: "speakers",
        container1: {
            alt: "speakers",
            src: "/public/images/speakers/Red-Bluetooth-Speaker-PNG-File-min.png",
            value: "/public/images/speakers/Red-Bluetooth-Speaker-PNG-File-min.png",
            link: " bluetooth speakers",
        },
        container2: {
            alt: "bluetooth headset",
            src: "/public/images/speakers/pngkey.com-earphone-png-image-9516249-min.png",
            value: "/public/images/speakers/pngkey.com-earphone-png-image-9516249-min.png",
            link: "bluetooth headset",
        },
        container3: {
            alt: "wireless speakers",
            src: "/public/images/speakers/Black-Bluetooth-Speaker-PNG-Image-min.png",
            value: "/public/images/speakers/Black-Bluetooth-Speaker-PNG-Image-min.png",
            link: "wireless speakers",
        },
        container4: {
            alt: "speaker",
            src: "/public/images/speakers/Bluetooth-Headset-PNG-File-min.png",
            value: "/public/images/speakers/Bluetooth-Headset-PNG-File-min.png",
            link: "speakers",
        },

    });

    let laptops = itemsCollectionDom({
        number: 5,
        title: "Top brands of laptops",
        value: "laptops",
        container1: {
            alt: "hp laptops",
            src: "/public/images/laptopStore/laptop-hd-png-laptop-png-free-download-485-min.png",
            value: "/public/images/laptopStore/laptop-hd-png-laptop-png-free-download-485-min.png",
            link: "hp laptops",
        },
        container2: {
            alt: "macbook",
            src: "/public/images/laptopStore/Macbook-PNG-HD.png",
            value: "/public/images/laptopStore/Macbook-PNG-HD.png",
            link: "macbook",
        },
        container3: {
            alt: "chromebook",
            src: "/public/images/laptopStore/laptop-hd-png-chromebook-pixel-detailed-with-world-s-most-hd-laptop-display-820-min-min.png",
            value: "/public/images/laptopStore/laptop-hd-png-chromebook-pixel-detailed-with-world-s-most-hd-laptop-display-820-min-min.png",
            link: "chromebook",
        },
        container4: {
            alt: "asus",
            src: "/public/images/laptopStore/laptop-hd-png-asus-laptop-png-transparent-657-min.png",
            value: "/public/images/laptopStore/laptop-hd-png-asus-laptop-png-transparent-657-min.png",
            link: "asus",
        },

    });

    let electronics = itemsCollectionDom({
        number: 6,
        title: "Top picks for you",
        value: "electronics",
        container1: {
            alt: "videocon",
            src: "/public/images/electronics/pngkey.com-digital-camera-png-3402090-min.png",
            value: "/public/images/electronics/pngkey.com-digital-camera-png-3402090-min.png",
            link: "videocon",
        },
        container2: {
            alt: "webcam",
            src: "/public/images/electronics/pngkey.com-webcam-png-2465477-min.png",
            value: "/public/images/electronics/pngkey.com-webcam-png-2465477-min.png",
            link: "webcam",
        },
        container3: {
            alt: "surveillance camera",
            src: "/public/images/electronics/pngkey.com-surveillance-camera-png-6478255-min.png",
            value: "/public/images/electronics/pngkey.com-surveillance-camera-png-6478255-min.png",
            link: "surveillance camera",
        },
        container4: {
            alt: "camcorder",
            src: "/public/images/electronics/pngkey.com-camcorder-png-1238033-min.png",
            value: "/public/images/electronics/pngkey.com-camcorder-png-1238033-min.png",
            link: "camcorder",
        },

    });

    let signCard = signInDom();
    let accountCard = yourAccount();

    const homeCont = document.getElementById('main-content');
    document.title = "@Shopify_Home";
    homeCont.innerHTML = `
        <div class="slider" id="slider">
            <div class="slide current">
                <div class="slide-content">
                    <h4>The one step to audio store</h4>
                    <h3>headphones, speakers<br>&wireless headsets</h3>
                </div>
                <div class="prod-img"></div>
            </div>
            <div class="slide">
                <div class="slide-content">
                    <h4>@shopify fashion</h4>
                    <h3>Budget buys<br>shoes under<br><strong>&#8377;99</strong></h3>
                </div>
                <div class="prod-img2"></div>
            </div>
            <div class="slide">
                <div class="slide-content">
                    <h4>@Shopify seller central</h4>
                    <h3>Pay when your<br><strong>product is ordered</strong></h3>
                </div>
                <div class="prod-img3"></div>
            </div>
            <div class="slide">
                <div class="slide-content">
                    <h4>The one step to mobile store</h4>
                    <h3>New launched<br><strong>Samsung,Redmi &Vivo</strong></h3>
                </div>
                <div class="prod-img4"></div>
            </div>
        </div>
        <div class="arrow-buttons">
            <button class="arrows" id="prev"><i class="fas fa-arrow-left"></i></button>
            <button class="arrows"id="next"><i class="fas fa-arrow-right"></i></button>
        </div>
        <section id="sp-home-layout">
            <div class="sp-card-layout" data-flow="h" id="sp-card-layout">
                ${accountCard}
                ${homeAppliances}
                ${womenWear}
                ${menWear}
                ${signCard}
                ${mobiles}
                ${speakers}
                ${laptops}
                ${electronics}
            </div>
        </section>
    `;
}


//slider functionality

let auto = true;
let intervalTime = 8000;
let slideInterval;


const nextSlide = () => {
    let slides = document.querySelectorAll('.slide');
    const current = document.querySelector('.current');
    current.classList.remove('current');
    if (current.nextElementSibling) {
        current.nextElementSibling.classList.add('current');
    } else {
        slides[0].classList.add('current')
    }
    setTimeout(() => current.classList.remove('current'));
}

const prevSlide = () => {
    let slides = document.querySelectorAll('.slide');
    const current = document.querySelector('.current');
    current.classList.remove('current');
    if (current.previousElementSibling) {
        current.previousElementSibling.classList.add('current');
    } else {
        slides[slides.length - 1].classList.add('current')
    }
    setTimeout(() => current.classList.remove('current'));
}

const sliderRun = (value = "") => {
    if (auto && location.hash === '#home') {
        return slideInterval = setInterval(nextSlide, intervalTime);
    };
    if (auto && value === "home") {
        return slideInterval = setInterval(nextSlide, intervalTime);
    }
    return clearInterval(slideInterval);
}


const slider = () => {
    if (auto) {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    events('#next', 'click', (e) => {
        nextSlide();
        if (auto) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    });
    events('#prev', 'click', (e) => {
        prevSlide();
        if (auto) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    });
}
const homeCategoryEvents = () => {
    events("#sp-card-layout", 'click', (e) => {
        let women = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let mobiles = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let laptops = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let men = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let electronics = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let speakers = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let home_app = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        if (women === "women") return location.hash = "#women";
        if (men === "men") return location.hash = "#men";
        if (mobiles === "mobiles") return location.hash = "#mobiles";
        if (laptops === "laptops") return location.hash = "#laptops";
        if (electronics === "electronics") return location.hash = "#electronics";
        if (home_app === "home-appliances") return location.hash = "#home-appliances";
        if (speakers === "speakers") return location.hash = "#speakers";
    });
}
const homeLogicEvents = () => {
    let token = userStore.authToken();
    if (token) {
        events("#card-body", 'click', (e) => {
            let account = e.target.parentElement.parentElement.dataset.id;
            let mobile = e.target.parentElement.parentElement.dataset.id;
            let laptop = e.target.parentElement.parentElement.dataset.id;
            let dress = e.target.parentElement.parentElement.dataset.id;
            if (account === "your-orders-home") return location.hash = "#your-orders";
            if (mobile === "mobiles-cate") return location.hash = "#mobiles";
            if (laptop === "laptops-cate") return location.hash = "#laptops";
            if (dress === "dress-cate") return location.hash = "#men";

        });
    } else {
        events("#sign-card-body", 'click', (e) => {
            location.hash = "#login";
        });
        events("#sm-banner", 'click', (e) => {
            let value = e.target.dataset.id;
            if (value === "laptops-cate") return location.hash = "#laptops";
        });
    }

}
module.exports = { homePage, slider, sliderRun, homeCategoryEvents, homeLogicEvents };