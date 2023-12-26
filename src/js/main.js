import slider from "./modules/slider";

window.addEventListener('DOMContentLoaded', () => {

    slider('.services__slider');

    const introSwitch = document.querySelector('.intro__house-windows-toggler input.window-toggler__input'),
    introHouseWindow = document.querySelector('.intro__house-window');
    introSwitch.addEventListener("click", (evt) => {
        if (evt.target.checked) {
            introHouseWindow.classList.add('intro__house-window--active')
        } else {
            introHouseWindow.classList.remove('intro__house-window--active')
        }
    })


    const isNumericInput = (event) => {
        const key = event.keyCode;
        return ((key >= 48 && key <= 57) || // Allow number line
            (key >= 96 && key <= 105) // Allow number pad
        );
    };
    
    const isModifierKey = (event) => {
        const key = event.keyCode;
        return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
            (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
            (key > 36 && key < 41) || // Allow left, up, right, down
            (
                // Allow Ctrl/Command + A,C,V,X,Z
                (event.ctrlKey === true || event.metaKey === true) &&
                (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
            )
    };
    
    const enforceFormat = (event) => {
        // Input must be of a valid number format or a modifier key, and not longer than ten digits
        if(!isNumericInput(event) && !isModifierKey(event)){
            event.preventDefault();
        }
    };
    
    const formatToPhone = (event) => {
        if(isModifierKey(event)) {return;}
    
        const input = event.target.value.replace(/\D/g,'').substring(0,11); // First ten digits of input only
        const countryCode = input.substring(0,1);
        const areaCode = input.substring(1,4);
        const middle = input.substring(4,7);
        const lastOne = input.substring(7,9);
        const lastTwo = input.substring(9,11);
    
        if(input.length > 9){event.target.value = `+${countryCode} (${areaCode}) ${middle}-${lastOne}-${lastTwo}`;}
        else if(input.length > 7){event.target.value = `+${countryCode} (${areaCode}) ${middle}-${lastOne}`;}
        else if(input.length > 4){event.target.value = `+${countryCode} (${areaCode}) ${middle}`;}
        else if(input.length > 1){event.target.value = `+${countryCode} (${areaCode}`;}
        else if(input.length > 0){event.target.value = `+${countryCode}`;}
    };
    
    const inputElement = document.querySelector('.js-phoneNumber');
    inputElement.addEventListener('keydown',enforceFormat);
    inputElement.addEventListener('keyup',formatToPhone);
})