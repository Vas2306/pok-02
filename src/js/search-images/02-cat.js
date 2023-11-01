import articlesTpl from '../templates/cat.hbs';
import NewApiService from './news-service';
console.log(NewApiService);
import LoadMoreBtn from './load-more-btn';

const refs = {
  seachForms: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newApiService = new NewApiService();
// console.log(newApiService);

refs.seachForms.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);
function onSearch(e) {
  e.preventDefault();
  newApiService.query = e.currentTarget.elements.query.value;
   loadMoreBtn.show();
  newApiService.resetPage();
  // newApiService.fetchArticles().then(articles => {
  //   clearArticlesCointainer();
  //   appendArticlesMarkup(articles);
  // } );
  clearArticlesCointainer();
  fetchArticles();
}
function fetchArticles() {
  loadMoreBtn.disable();
  newApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
}
// function onLoadMore() {
//   newApiService.fetchArticles().then(appendArticlesMarkup);
// }
function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
};
function clearArticlesCointainer() {
  refs.articlesContainer.innerHTML = '';
}