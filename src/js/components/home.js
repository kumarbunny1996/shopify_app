const { events } = require('../app/uiHandler');

require('../../css/home.css');

const homePage = () => {
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
module.exports = { homePage, slider, sliderRun };