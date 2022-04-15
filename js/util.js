function getRandomInteger (start = 1, end = 10) {
  const lower = Math.ceil(Math.min(Math.abs(start), Math.abs(end)));
  const upper = Math.floor(Math.max(Math.abs(start), Math.abs(end)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

function getRandomFloat (start, end, floatSigns = 1) {
  const lower = Math.min(Math.abs(start), Math.abs(end));
  const upper = Math.max(Math.abs(start), Math.abs(end));

  return +(Math.random() * (upper - lower) + lower).toFixed(floatSigns);
}

const createAvatar = () => {
  const avatarIndex = getRandomInteger(1, 10);

  return avatarIndex < 10 ? `img/avatars/user0${avatarIndex}.png` : `img/avatars/user${avatarIndex}.png`;
};

const getRandomArrayElement = (elements) => {
  const element = elements[getRandomInteger(0, elements.length - 1)];

  return element;
};

const createRandomArray = (array) => array.filter(() => getRandomInteger(0,1) === 1);

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';


export {getRandomInteger, getRandomFloat, createAvatar, getRandomArrayElement, createRandomArray, debounce, isEscapeKey};
