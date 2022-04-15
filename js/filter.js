import {createMarker, resetMap, resetMarkers} from './map.js';

const DEFAULT_FILTER_VALUE = 'any';

const PriceRange = {
  MIN: 10000,
  MAX: 50000,
};

const mapForm = document.querySelector('.map__filters');
const mapFormType = mapForm.querySelector('#housing-type');
const mapFormPrice = mapForm.querySelector('#housing-price');
const mapFormRoom = mapForm.querySelector('#housing-rooms');
const mapFormGuest = mapForm.querySelector('#housing-guests');
const mapFormFeatures = mapForm.querySelector('#housing-features');

const filterType = (ad) => mapFormType.value === ad.offer.type || mapFormType.value === DEFAULT_FILTER_VALUE;

const filterPrice = (ad) => {
  const filterPriceCategory = {
    low: ad.offer.price < PriceRange.MIN,
    middle: ad.offer.price >= PriceRange.MIN && ad.offer.price < PriceRange.MAX,
    high: ad.offer.price >= PriceRange.MAX,
  };

  return mapFormPrice.value === DEFAULT_FILTER_VALUE || filterPriceCategory[mapFormPrice.value];
};

const filterRoom = (ad) => +mapFormRoom.value === ad.offer.rooms || mapFormRoom.value === DEFAULT_FILTER_VALUE;

const filterGuest = (ad) => +mapFormGuest.value === ad.offer.guests || mapFormGuest.value === DEFAULT_FILTER_VALUE;

const filterFeature = (ad) => {
  const checkedFeatures = Array.from(mapFormFeatures.querySelectorAll('.map__checkbox:checked')).map((feature) => feature.value);

  if (checkedFeatures.length !== 0) {
    if (ad.offer.features) {
      return checkedFeatures.every((feature) => ad.offer.features.includes(feature));
    }
    return false;
  }

  return true;
};

const getAdsRank = (ad) => {
  let rank = 0;
  const checkedFeatures = Array.from(mapFormFeatures.querySelectorAll('.map__checkbox:checked')).map((feature) => feature.value);

  if (ad.offer.features) {
    checkedFeatures.forEach((feature) => {
      if (ad.offer.features.includes(feature)) {
        rank += 1;
      }
    });
  }

  return rank;
};

const compareAds = (adA, adB) => {
  const rankA = getAdsRank(adA);
  const rankB = getAdsRank(adB);

  return rankB - rankA;
};

const filter = (ads) => ads.filter((ad) => filterType(ad) && filterPrice(ad) && filterRoom(ad) && filterGuest(ad) && filterFeature(ad));

const updateMarkers = (ads) => {
  resetMap();
  resetMarkers();
  const filterData = filter(ads);
  filterData.sort(compareAds);
  createMarker(filterData);
};

const setFilterListener = (cb) => mapForm.addEventListener('change', () => cb());

export {updateMarkers, setFilterListener};
