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
const mapForm = document.querySelector('.map__filters');
const mapSelects = mapForm.querySelectorAll('select');
const mapFildsets = mapForm.querySelectorAll('fieldset');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'form__element--invalid',
  successClass: 'form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const disablePage = (lock) => {
  mapSelects.forEach((item) => (item.disabled = lock));
  mapFildsets.forEach((item) => (item.disabled = lock));
  adFieldsets.forEach((item) => (item.disabled = lock));

  if(lock === true) {
    adForm.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');
  }
  if(lock === false) {
    adForm.classList.remove('ad-form--disabled');
    mapForm.classList.remove('map__filters--disabled');
  }
};

function validatePrice (value) {
  return +value >= TYPE_MIN_PRICE[adFormType.value];
}

function getPriceErrorMessage () {
  return `Минимальная цена выбранного типа размещения равна ${TYPE_MIN_PRICE[adFormType.value]} руб.`;
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

function validateCapacity (value) {
  return (+adFormRooms.value === MAX_ROOMS && !+value) || (+value && +value <= +adFormRooms.value && +adFormRooms.value !== MAX_ROOMS);
}

function getCapacityErrorMessage () {
  return +adFormRooms.value === MAX_ROOMS ? '100 комнат на для гостей' : `Выберите количество гостей, максимум: ${adFormRooms.value}`;
}

pristine.addValidator(adFormCapacity, validateCapacity, getCapacityErrorMessage);

adFormRooms.addEventListener('change', () => pristine.validate(adFormCapacity));

function setTime (firstEl, secondEl) {
  secondEl.value = firstEl.value;
}

adFormTimeIn.addEventListener('change', () => setTime(adFormTimeIn, adFormTimeOut));
adFormTimeOut.addEventListener('change', () => setTime(adFormTimeOut, adFormTimeIn));

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    adForm.submit();
  }
});

export {disablePage};
