function slider(selector) {
    let slideIndex = 0;
    
    const elSlider = document.querySelector(selector),
        elSliderWidth = window.getComputedStyle(elSlider).width,
        elSliderField = elSlider.querySelector('.slider-inner'),
        elsSliderItem = elSlider.querySelectorAll('.slider-item'),
        elBtnPrev = elSlider.querySelector('.js-slider-control-prev'),
        elBtnNext = elSlider.querySelector('.js-slider-control-next');

        elSliderField.style.width = `${100 * elsSliderItem.length}%`

        elBtnPrev.addEventListener('click', () => {
            slideControl(-1);
        })

        elBtnNext.addEventListener('click', () => {
            slideControl(1);
        })

        function slideControl(number) {
            slideIndex += number;
            if(slideIndex < 0) {
                slideIndex = elsSliderItem.length - 1;
            } else if(slideIndex > elsSliderItem.length - 1) {
                slideIndex = 0;
            }

            showSlide(slideIndex);
        }

        function showSlide(idx) {
            elSliderField.style.transform = `translateX(-${+elSliderWidth.replace(/(r?em|px|\%)$/g, '') * idx}px)`;
        }
}

export default slider;