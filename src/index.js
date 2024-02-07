import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34373516-b73f95caf1f569d1c97db55cd';

const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more'),
};
let page;
let searchQuery;

const lightbox = new SimpleLightbox('.gallery a', {
  fadeSpeed: 500,
  animationSlide: true,
  widthRatio: 1,
});

refs.formEl.addEventListener('submit', handleForm);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

function handleForm(e) {
  e.preventDefault();
  page = 1;
  searchQuery = refs.formEl[0].value.trim();
  if (!searchQuery) {
    showMessage('Please enter a search query!');
    return;
  }
  serviceImage(searchQuery);
  clearForm();
}

async function serviceImage(searchQuery) {
  try {
    const { data } = await fetchImage(searchQuery);
    const { hits, totalHits } = data;
    if (!hits.length) {
      showMessage(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    insertMarkUp(hits);
    lightbox.refresh();
    checkIsPageFirst(totalHits);
    showLoadMoreBtn();
    checkIsReachEnd(totalHits);
  } catch (error) {
    showMessage(error.message, '#ffafb4');
  }
}
async function fetchImage(searchQuery) {
  const param = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: page,
  });

  return await axios.get(`${BASE_URL}?${param}`);
}
function markUp(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `    
      <a href=${largeImageURL}>
        <div class="photo-card">
        <img src=${webformatURL}  alt=${tags}  loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes ${likes}</b>
            </p>
                <p class="info-item">
            <b>Views ${views}</b>
            </p>
            <p class="info-item">
                <b>Comments ${comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads ${downloads}</b>
            </p>
        </div>
    </div> 
    </a>`
    )
    .join('');
}
function insertMarkUp(hits) {
  refs.galleryEl.insertAdjacentHTML('beforeend', markUp(hits));
}
function showMessage(message, color = '#cef6ba') {
  iziToast.info({
    message: message,
    position: 'topLeft',
    color: color,
    closeOnClick: true,
    timeout: 2500,
    pauseOnHover: true,
  });
}
function clearForm() {
  refs.formEl[0].value = '';
  refs.galleryEl.innerHTML = '';
  hideLoadMoreBtn();
}
function showLoadMoreBtn() {
  refs.loadMoreBtnEl.style.display = 'flex';
}
function hideLoadMoreBtn() {
  refs.loadMoreBtnEl.style.display = 'none';
}
function onLoadMoreBtnClick() {
  page++;
  return serviceImage(searchQuery);
}
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
function checkIsReachEnd(totalHits) {
  if (totalHits <= page * 40) {
    hideLoadMoreBtn();
    setTimeout(() => {
      showMessage(
        `We're sorry, but you've reached the end of search results...`,
        '#ffff99'
      );
    }, 2000);
  }
}
function checkIsPageFirst(totalHits) {
  if (page === 1) {
    showMessage(`Hooray! We found ${totalHits} images.`);
  }
  if (page !== 1) {
    smoothScroll();
  }
}
