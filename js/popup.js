const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const createFeaturesList = (data, clone) => {
  const features = clone.querySelectorAll('.popup__feature');
  const modifiers = data.map((feature) => `popup__feature--${feature}`);

  features.forEach((feature) => {
    const modifier = feature.classList[1];

    if (!modifiers.includes(modifier)) {
      feature.remove();
    }
  });

  return features;
};

const createPhotosList = (data, clone) => {
  const photoContainer = clone.querySelector('.popup__photos');
  const photoTemplate = photoContainer.querySelector('.popup__photo');
  photoContainer.innerHTML = '';

  data.forEach((photo) => {
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

const availabilityCheck = (card, data, dataClass) => {
  if (data) {
    card.querySelector(dataClass).textContent = data;
  } else {
    card.querySelector(dataClass).classList.add('hidden');
  }
};

const createSingleCard = (({author, offer}) => {
  const cardElement = similarCardTemplate.cloneNode(true);

  availabilityCheck(cardElement, offer.title, '.popup__title');
  availabilityCheck(cardElement, offer.address, '.popup__text--address');
  availabilityCheck(cardElement, offer.price, '.popup__text--price');
  availabilityCheck(cardElement, offer.description, '.popup__description');
  availabilityCheck(cardElement, author.avatar, '.popup__avatar');

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

  if (offer.photos) {
    createPhotosList(offer.photos, cardElement);
  } else {
    cardElement.querySelector('.popup__photos').classList.add('hidden');
  }

  return cardElement;
});

export {createSingleCard};

