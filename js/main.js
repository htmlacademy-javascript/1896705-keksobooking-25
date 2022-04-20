import './map.js';
import './slider.js';
import {getData} from './api.js';
import {createMarker, initMap} from './map.js';
import {updateMarkers, setFilterListener, disableFilter} from './filter.js';
import {setUserFormSubmit, disablePage} from './form.js';
import {debounce} from './util.js';
import './photo.js';
import {showMessage, loadTemplate} from './warnings.js';

disablePage(true);

initMap();

getData ((ads) => {
  createMarker(ads);
  setFilterListener(debounce(() => updateMarkers(ads)));
},() => {
  showMessage(loadTemplate);
  disableFilter(true);
});

setUserFormSubmit();
