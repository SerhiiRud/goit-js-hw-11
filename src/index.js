import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import fetchPictures from './js/API';
const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
let page = 1;

function onSubmit(event) {
  event.preventDefault();
  const { searchQuery } = event.currentTarget.elements;
  fetchPictures(searchQuery.value, 1).then(response =>
    galleryRender(response.hits)
  );

  page++;
}

function galleryRender(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        previewURL,
      }) => `<a href="${largeImageURL}" class="gallery-link"><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="image"/>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div></a>`
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

const lightbox = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.6,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  animationSpeed: 500,
});

formEl.addEventListener('submit', onSubmit);
