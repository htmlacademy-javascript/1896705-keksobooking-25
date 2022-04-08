import {createSingleCard} from './popup.js';
import {disablePage} from './form.js';

const adForm = document.querySelector('.ad-form');
const address = adForm.querySelector('#address');

const START_LAT = 35.6895;
const START_LNG = 139.692;

disablePage(true);

const map = L.map('map-canvas')
  .on('load', () => {
    address.value = `${START_LAT}, ${START_LNG}`;
    disablePage(false);
  })
  .setView({
    lat:  START_LAT,
    lng: START_LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const otherPinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: START_LAT,
    lng: START_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ads) => {
  ads.forEach((ad) => {
    const {lat, lng} = ad.location;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: otherPinIcon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(createSingleCard(ad));
  });
};

const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: START_LAT,
    lng: START_LNG,
  });
  map.setView({
    lat: START_LAT,
    lng: START_LNG,
  }, 10);

  address.value = `${START_LAT}, ${START_LNG}`;
};

export {createMarker, resetMap};
