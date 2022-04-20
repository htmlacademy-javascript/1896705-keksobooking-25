import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('div');
const errorTemplate = document.querySelector('#error').content.querySelector('div');
const loadTemplate = document.querySelector('#load-error').content.querySelector('div');

const showMessage = (template) => {
  const message = template.cloneNode(true);
  document.body.append(message);

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onModalClose();
    }
  };

  function onModalClose () {
    message.removeEventListener('click', onModalClose);
    message.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }

  document.addEventListener('keydown', onPopupEscKeydown);
  message.addEventListener('click', onModalClose);
};

export {showMessage, successTemplate, errorTemplate, loadTemplate};
