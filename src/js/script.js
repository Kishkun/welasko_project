window.onload = function () {
    let preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
};
window.onscroll = function () {
    doScroll();
};

function doScroll() {
    let windowScroll = document.body.scrollTop || document.documentElement.scrollTop,
        documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight,
        scrolled = (windowScroll / documentHeight) * 100,
        progressBar = document.querySelector('.progress-bar');

    progressBar.style.width = scrolled + '%';
}

// header-mobile-button
let mobileBtnEl = document.querySelector('.header-mobile-button-body');
let mobileBtnLine = document.querySelectorAll('.header-mobile-button-line');
let headerMobileEl = document.querySelector('.header-mobile');

let clickMobileButton = function () {
    mobileBtnLine.forEach((item) => {
        item.classList.toggle('header-mobile-button-line-active')
    });
    headerMobileEl.classList.toggle('header-mobile-active');
};
mobileBtnEl.addEventListener('click', clickMobileButton);