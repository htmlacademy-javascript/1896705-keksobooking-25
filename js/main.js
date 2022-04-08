import './map.js';
import './slider.js';
import {getData} from './api.js';
import {createMarker} from './map.js';
import {setUserFormSubmit} from './form.js';

getData ((ads) => {
  createMarker(ads.slice(0,10));
});

setUserFormSubmit();
