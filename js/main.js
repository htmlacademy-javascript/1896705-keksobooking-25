import './map.js';
import './slider.js';
import {getData} from './api.js';
import {createMarker} from './map.js';
import {updateMarkers, setFilterListener} from './filter.js';
import {setUserFormSubmit} from './form.js';
import {debounce} from './util.js';
import './photo.js';
import {showMessage, loadTemplate} from './warnings.js';

getData ((ads) => {
  createMarker(ads);
  setFilterListener(debounce(() => updateMarkers(ads)));
},() => showMessage(loadTemplate));

setUserFormSubmit();
