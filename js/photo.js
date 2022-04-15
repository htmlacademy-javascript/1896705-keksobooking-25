const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('#avatar');
const photoChooser = document.querySelector('#images');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const previewContainer = document.querySelector('.ad-form__photo');
const photoContainer = document.querySelector('.ad-form__photo-container');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

photoChooser.addEventListener('change', () => {
  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const newPhoto = document.createElement('img');
    newPhoto.src = URL.createObjectURL(file);
    newPhoto.width = '40';
    newPhoto.height= '44';

    if (photoContainer.querySelector('img')) {
      const newPreviewContainer = document.createElement('div');
      newPreviewContainer.classList.add('ad-form__photo');
      photoContainer.append(newPreviewContainer);
      newPreviewContainer.append(newPhoto);
    } else {
      previewContainer.append(newPhoto);
    }
  }
});

const clearPhotos = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  const photos = document.querySelectorAll('.ad-form__photo');
  photos.forEach((photo, index) => {
    if (index === 0) {
      photo.innerHTML = '';
    } else {
      photo.remove();
    }
  });
};

export {clearPhotos};
