import articlesTpl from '../templates/cat.hbs';
const API_KEY = '4330ebfabc654a6992c2aa792f3173a3';
const BASE_URL = `https://newsapi.org/v2`;
const options = {
  headers: {
    Authorization: API_KEY,
  },
};
class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchArticles() {
    console.log(this);

    const url = `${BASE_URL}/everything?q=${this.searchQuery}&pageSize=5&page=${this.page}&language
=ru`;
    return fetch(url, options)
      .then(response => response.json())
      .then(({articles}) => {
        this.page += 1;
        return articles;
      });
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.label');
    refs.spinner = refs.button.querySelector('.spinner');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Показать ещё';
    this.refs.spinner.classList.add('is-hidden');
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Загружаем...';
    this.refs.spinner.classList.remove('is-hidden');
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}


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