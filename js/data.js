import {getRandomInteger, getRandomFloat, createAvatar, getRandomArrayElement, createRandomArray} from './util.js';

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
      photos: createRandomArray(PHOTOS)
    },

    location: {
      lat: locationLat,
      lng: locationLng
    }
  };
}

const createAds = () => Array.from({length: AD_COUNT}, createAd);

export {createAds};
