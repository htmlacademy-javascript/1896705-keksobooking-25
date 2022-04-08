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

  if (offer.title) {
    cardElement.querySelector('.popup__title').textContent = offer.title;
  } else {
    cardElement.querySelector('.popup__title').classList.add('hidden');
  }

  if (offer.address) {
    cardElement.querySelector('.popup__text--address').textContent = offer.address;
  } else {
    cardElement.querySelector('.popup__text--address').classList.add('hidden');
  }

  if (offer.price) {
    cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  } else {
    cardElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (offer.type) {
    cardElement.querySelector('.popup__type').textContent = TYPES[offer.type];
  } else {
    cardElement.querySelector('.popup__type').classList.add('hidden');
  }

  if (offer.rooms && offer.guests) {
    createRoomsString(offer.rooms, offer.guests, cardElement);
  } else {
    cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (offer.checkin && offer.checkout) {
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    cardElement.querySelector('.popup__text--time').classList.add('hidden');
  }

  if (offer.features) {
    createFeaturesList(offer.features, cardElement);
  } else {
    cardElement.querySelector('.popup__features').classList.add('hidden');
  }

  if (offer.description) {
    cardElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }

  if (offer.photos) {
    createPhotosList(offer.photos, cardElement);
  } else {
    cardElement.querySelector('.popup__photos').classList.add('hidden');
  }

  if (author.avatar) {
    cardElement.querySelector('.popup__avatar').src = author.avatar;
  } else {
    cardElement.querySelector('.popup__avatar').classList.add('hidden');
  }
  return cardElement;
});

export {createSingleCard};

