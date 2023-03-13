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
      }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}/b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

formEl.addEventListener('submit', onSubmit);

//console.log(fetchPictures('cat', 1));

//------------------------------------------
