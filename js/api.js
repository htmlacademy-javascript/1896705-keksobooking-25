const API_URL = 'https://25.javascript.pages.academy/keksobooking'

const getData = (onSuccess) => {
  fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then((items) => {
      onSuccess(items);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch (
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
