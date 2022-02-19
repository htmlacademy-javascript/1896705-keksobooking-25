function getRandomInteger (start, end) {
  return Math.floor(Math.random() * (Math.abs(end - start) + 1)) + Math.min(start, end);
}

function getRandomFloat (start, end, floatSigns) {
  return (Math.random() * Math.abs(end - start) + Math.min(start, end)).toFixed(floatSigns);
}

getRandomInteger(1,10);
getRandomFloat(1.1, 1.7, 3);
