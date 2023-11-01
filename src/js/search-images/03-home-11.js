import imagesTpl from '../templates/03-home-11.hbs';
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34183762-c424f4d4956e0b56568efe7d9';
const perPage = 4;
let pageNumber = 0;
let searchQuery = '';
const refs = {
  formEl: document.querySelector('.js-seach-form'),
  containerEl: document.querySelector('.js-gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
hideButton();
function onSearch(e) {
  e.preventDefault();
  clearImageCard();
  pageNumber = 1;
  searchQuery = e.currentTarget.elements.searchQuery.value;
  fetchImages(searchQuery, pageNumber);
  showButton();
}
async function fetchImages(query, page) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    const markupData = await response.json();
    const image = await renderImageCard(markupData.hits);
    return image;
  } catch (error) {
    console.log(error);
    alert('The request failed. Please try again later');
  }
  
}
function renderImageCard(img) {
  const markup = imagesTpl(img);
  refs.containerEl.insertAdjacentHTML('beforeend', markup);
}
function clearImageCard() {
  refs.containerEl.innerHTML = '';
}
function showButton() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
function hideButton() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
function onLoadMore() {
  pageNumber += 1;
  fetchImages(searchQuery, pageNumber);
}
