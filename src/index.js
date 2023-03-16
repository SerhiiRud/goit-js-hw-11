import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchPictures, { HITS_PER_PAGE } from './js/API';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const buttonMore = document.querySelector('.load-more');

buttonMore.style.display = 'none';
let page = 1;
let query = '';

function onSubmit(event) {
  event.preventDefault();
  const { searchQuery } = event.currentTarget.elements;
  query = searchQuery.value;
  resetPage();
  buttonMore.style.display = 'none';
  fetchPictures(query, page)
    .then(response => {
      if (response.hits.length === 0) {
        galleryEl.innerHTML = '';
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        event.target.reset();
        return;
      }
      galleryEl.innerHTML = '';
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      if (response.hits.length < HITS_PER_PAGE) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        buttonMore.style.display = 'none';
        galleryRender(response.hits);
        return;
      }
      galleryRender(response.hits);
      buttonMore.style.display = 'inline-block';
      incrementPage();
    })
    .then(page => setTimeout(autoScroll, 2000))
    .catch(error => console.log(error.name));
}

function onLoadMore() {
  fetchPictures(query, page)
    .then(response => {
      galleryRender(response.hits);
      incrementPage();
      if (
        response.hits.length < HITS_PER_PAGE ||
        response.hits.length * (page - 1) > response.totalHits
      ) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        buttonMore.style.display = 'none';
        return;
      }
    })
    .then(page => autoScroll())
    .catch(error => console.log(error.message));
}

function autoScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function incrementPage() {
  page += 1;
}

function resetPage() {
  page = 1;
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
  lightbox.refresh();
}

const lightbox = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.6,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  animationSpeed: 500,
});

const onButtonIntersect = entities => {
  const [button] = entities;
  if (button.isIntersecting) {
    onLoadMore();
  }
};

const observer = new IntersectionObserver(onButtonIntersect);
observer.observe(buttonMore);

formEl.addEventListener('submit', onSubmit);
buttonMore.addEventListener('click', onLoadMore);
