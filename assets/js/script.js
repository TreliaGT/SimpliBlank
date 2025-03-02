document.addEventListener('DOMContentLoaded', function () {
    browserClass();
});

// On screen resize
window.addEventListener('resize', function () {
    browserClass();
});


// Add browser class to body
function browserClass() {
    var deviceAgent = navigator.userAgent.toLowerCase();
    var body = document.body;
    if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
        body.classList.add('ios');
        body.classList.add('mobile');
    }
    if (deviceAgent.match(/(Android)/)) {
        body.classList.add('android');
        body.classList.add('mobile');
    }
    if (deviceAgent.match(/(windows phone)/)) {
        body.classList.add('windows');
        body.classList.add('mobile');
    }
    if (deviceAgent.match(/(msie 10|edge)/)) {
        body.classList.add('ie');
    }
    else if (navigator.userAgent.search("Chrome") >= 0) {
        body.classList.add('chrome');
    }
    else if (navigator.userAgent.search("Firefox") >= 0) {
        body.classList.add('firefox');
    }
    else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        body.classList.add('safari');
    }
    else if (navigator.userAgent.search("Opera") >= 0) {
        body.classList.add('opera');
    }
    // check if screen is portrait or landscape
    if (window.matchMedia("(orientation: portrait)").matches) {
        body.classList.add('portrait');
    } else {
        body.classList.add('landscape');
    }
}