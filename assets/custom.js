// Lookbook Custom Slider
document.addEventListener('DOMContentLoaded', function () {

    var splide = new Splide('.splide', {
        type: "loop",
        autoWidth: true,
        gap: '24px',
        pagination: false
    });
    var bar = splide.root.querySelector('.custom-splide-progress-bar');

    splide.on('mounted move', function () {
        var end = splide.Components.Controller.getEnd() + 1;
        bar.style.width = String(100 * (splide.index + 1) / end) + '%';
    });
    splide.mount();
});