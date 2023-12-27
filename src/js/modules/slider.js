function slider(wrapper) {
    let slideIndex = 0;
    
    const elSlider = wrapper.querySelector(".slider"),
        elSliderWidth = window.getComputedStyle(elSlider).width,
        elSliderField = elSlider.querySelector('.slider-inner'),
        elsSliderItem = elSlider.querySelectorAll('.slider-item'),
        elBtnPrev = wrapper.querySelector('.js-slider-control-prev'),
        elBtnNext = wrapper.querySelector('.js-slider-control-next'),
        elsColor = wrapper.querySelectorAll('.slider-list li');

        
        elsColor.forEach(elColor => {
            elColor.addEventListener('click', (evt) => {
                slideIndex = +evt.target.dataset.slideTo;
                deactivateColors()
                activateColor(slideIndex)
                showSlide(slideIndex)
            })
        })

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
            deactivateColors()
            activateColor(slideIndex)
        }

        function showSlide(idx) {
            elSliderField.style.transform = `translateX(-${+elSliderWidth.replace(/(r?em|px|\%)$/g, '') * idx}px)`;
        }

        function activateColor(idx) {
            elsColor[idx].classList.add("products__color--active")
        }

        function deactivateColors() {
            elsColor.forEach(elColor => {
                elColor.classList.remove("products__color--active")
            })
        }
}

export default slider;