import {createSlider} from './slider.js';
import {resetMap} from './map.js';
import {sendData, getData} from './api.js';
import {clearPhotos} from './photo.js';
import {updateMarkers, disableFilter} from './filter.js';
import {showMessage, successTemplate, errorTemplate, loadTemplate} from './warnings.js';

const TYPE_MIN_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000
};

const MAX_ROOMS = 100;

const adForm = document.querySelector('.ad-form');
const adFieldsets = adForm.querySelectorAll('fieldset');
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
const adFormRooms = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');

const resetButton = adForm.querySelector('.ad-form__reset')

const mapForm = document.querySelector('.map__filters');
const mapSelects = mapForm.querySelectorAll('select');
const mapFildsets = mapForm.querySelectorAll('fieldset');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'form__element--invalid',
  successClass: 'form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

const disablePage = (lock) => {
  mapSelects.forEach((item) => (item.disabled = lock));
  mapFildsets.forEach((item) => (item.disabled = lock));
  adFieldsets.forEach((item) => (item.disabled = lock));

  if(lock) {
    adForm.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');
  }
  if(!lock) {
    adForm.classList.remove('ad-form--disabled');
    mapForm.classList.remove('map__filters--disabled');
  }
};

function validatePrice (price) {
  return +price >= TYPE_MIN_PRICE[adFormType.value];
}

function getPriceErrorMessage () {
  return `Минимальная цена размещения равна ${TYPE_MIN_PRICE[adFormType.value]} руб.`;
}

pristine.addValidator(adFormPrice, validatePrice, getPriceErrorMessage);

function onPriceChange () {
  adFormPrice.min = TYPE_MIN_PRICE[adFormType.value];
  adFormPrice.placeholder = TYPE_MIN_PRICE[adFormType.value];

  if (adFormPrice.value) {
    pristine.validate(adFormPrice);
  }
}

adFormType.addEventListener('change', onPriceChange);

const sliderPrice = createSlider();

sliderPrice.noUiSlider.on('change', () => {
  pristine.validate(adFormPrice);
});

function validateCapacity (value) {
  const amountGuests = +value;
  const amountRooms = +adFormRooms.value;
  const roomsCheck = amountGuests <= amountRooms;

  const firstCheck = amountRooms === MAX_ROOMS && !amountGuests;
  const secondCheck = amountGuests && roomsCheck && amountRooms !== MAX_ROOMS;

  return firstCheck || secondCheck;
}

function getCapacityErrorMessage () {
  return +adFormRooms.value === MAX_ROOMS ? '100 комнат не для гостей' : `Выберите количество гостей, максимум: ${adFormRooms.value}`;
}

pristine.addValidator(adFormCapacity, validateCapacity, getCapacityErrorMessage);

adFormRooms.addEventListener('change', () => pristine.validate(adFormCapacity));

function setTime (firstEl, secondEl) {
  secondEl.value = firstEl.value;
}

adFormTimeIn.addEventListener('change', () => setTime(adFormTimeIn, adFormTimeOut));
adFormTimeOut.addEventListener('change', () => setTime(adFormTimeOut, adFormTimeIn));

const resetDocument = () => {
  adForm.reset();
  mapForm.reset();
  resetMap();
  clearPhotos();
  getData ((ads) => {
    updateMarkers(ads);
  },() => {
    showMessage(loadTemplate);
    disableFilter(true);
  });
}

const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sliderPrice.noUiSlider.set(0);

    const isValid = pristine.validate();

    if (isValid) {
      sendData(
        () => {
          resetDocument();
          showMessage(successTemplate);
        },
        () => {
          showMessage(errorTemplate);
        },
        new FormData(evt.target)
      );
    }
  });
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  resetDocument();
});

export {disablePage, TYPE_MIN_PRICE, setUserFormSubmit};
