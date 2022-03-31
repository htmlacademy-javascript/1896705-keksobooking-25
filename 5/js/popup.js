const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const createFeaturesList = (arr, clone) => {
  const featureList = clone.querySelectorAll('.popup__feature');
  const modifiers = arr.map((feature) => `popup__feature--${feature}`);

  featureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });

  return featureList;
};

const createPhotosList = (arr, clone) => {
  const photoContainer = clone.querySelector('.popup__photos');
  const photoTemplate = photoContainer.querySelector('.popup__photo');
  photoContainer.innerHTML = '';

  arr.forEach((photo) => {
    const newPhoto = photoTemplate.cloneNode(true);
    newPhoto.src = photo;
    photoContainer.append(newPhoto);
  });

  return photoContainer;
};

const createRoomsString = (rooms, guests, clone) => {
  if (rooms > 4) {
    clone.querySelector('.popup__text--capacity').textContent = `${rooms} комнат для ${guests} гостей`;
  }
  if (rooms === 1) {
    clone.querySelector('.popup__text--capacity').textContent = `${rooms} комната для ${guests} гостей`;
  }
  if (rooms > 1 && rooms < 5) {
    clone.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  }
};

const createSingleCard = (({author, offer}) => {
  const cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = TYPES[offer.type];
  createRoomsString(offer.rooms, offer.guests, cardElement);
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  createFeaturesList(offer.features, cardElement);
  cardElement.querySelector('.popup__description').textContent = offer.description;
  createPhotosList(offer.photos, cardElement);
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  return cardElement;
});

export {createSingleCard};

