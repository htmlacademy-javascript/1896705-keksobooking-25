import {createSingleCard} from './popup.js';
import {createAds} from './data.js';

const similarAds = createAds();
const mapCanvas = document.querySelector('#map-canvas');
const similarListFragment = document.createDocumentFragment();

similarAds.forEach((ad) => {
  const card = createSingleCard(ad);

  similarListFragment.append(card);
});

mapCanvas.append(similarListFragment.children[0]);
