const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const AD_COUNT = 10;

function getType (a,b) {
  if (typeof(a) === 'number' && typeof(b) === 'number') {
    return false;
  }

  return true;
}

function getRandomInteger (start = 1, end = 10) {
  if (getType(start, end)) {
    return false;
  }

  const lower = Math.ceil(Math.min(Math.abs(start), Math.abs(end)));
  const upper = Math.floor(Math.max(Math.abs(start), Math.abs(end)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

function getRandomFloat (start, end, floatSigns = 1) {
  if (getType(start, end)) {
    return false;
  }

  const lower = Math.min(Math.abs(start), Math.abs(end));
  const upper = Math.max(Math.abs(start), Math.abs(end));

  return +(Math.random() * (upper - lower) + lower).toFixed(floatSigns);
}

const createAvatar = () => {
  const avatarIndex = getRandomInteger(1, 10);
  let avatar = `0${avatarIndex.toString()}`;

  if (avatarIndex === 10) {
    avatar = avatarIndex.toString();
  }

  return `img/avatars/user${avatar}.png`;
};

const getRandomArrayElement = (elements) => {
  const element = elements[getRandomInteger(0, elements.length - 1)];
  return element;
};

const createRandomArray = (array) => {
  const arrayLength  = getRandomInteger(0, array.length);
  const randomArray = [];

  for (let i = 0; i < arrayLength; i++) {
    randomArray.push(getRandomArrayElement(array));
  }

  return new Set(randomArray);
};

//Второй вариант реализации, так как при первом очень маленькая вероятность,
//что все 6 параметров попадут в массив
const createRandomArrayOrder = (array) => {
  const arrayLength  = getRandomInteger(0, array.length);
  const randomArray = [];

  for (let i = 0; i < arrayLength; i++) {
    randomArray.push(array[i]);
  }

  return randomArray;
};

function createAd () {
  const locationLat = getRandomFloat(35.65000, 35.70000, 5);
  const locationLng = getRandomFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: createAvatar()
    },

    offer: {
      title: 'hello',
      addres: `${locationLat}, ${locationLng}`,
      price: getRandomInteger(1, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 7),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKINS),
      features: createRandomArray(FEATURES),
      description: 'Nice',
      photos: createRandomArrayOrder(PHOTOS)
    },

    location: {
      lat: locationLat,
      lng: locationLng
    }
  };
}

getRandomInteger(1,2);
getRandomFloat(1.1, 1.7, 3);

const ads = Array.from({length: AD_COUNT}, createAd);

const someFunc = () => ads;
someFunc();
