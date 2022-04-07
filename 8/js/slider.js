import {TYPE_MIN_PRICE} from './form.js';

const createSlider = () => {
  const sliderElement = document.querySelector('.ad-form__slider');
  const adForm = document.querySelector('.ad-form');
  const adFormPrice = adForm.querySelector('#price');
  const adFormType = adForm.querySelector('#type');

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 0,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  adFormType.addEventListener('change', () => {
    const min = TYPE_MIN_PRICE[adFormType.value];

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: min,
        max: 100000,
      },
      start: min,
      step: 1,
    });
  });

  sliderElement.noUiSlider.on('change', () => {
    adFormPrice.value = sliderElement.noUiSlider.get();
  });

  adFormPrice.addEventListener('input', () => {
    sliderElement.noUiSlider.set(adFormPrice.value);
  });

  return sliderElement;
};

export {createSlider};
