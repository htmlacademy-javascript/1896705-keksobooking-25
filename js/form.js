const adForm = document.querySelector('.ad-form');
const adFieldsets = adForm.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapSelects = mapForm.querySelectorAll('select');
const mapFildsets = mapForm.querySelectorAll('fieldset');

const disablePage = (lock) => {
  mapSelects.forEach((item) => item.disabled = lock);
  mapFildsets.forEach((item) => item.disabled = lock);
  adFieldsets.forEach((item) => item.disabled = lock);

  if(lock === true) {
    adForm.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');
  }
  if(lock === false) {
    adForm.classList.remove('ad-form--disabled');
    mapForm.classList.remove('map__filters--disabled');
  }
};

export {disablePage};
