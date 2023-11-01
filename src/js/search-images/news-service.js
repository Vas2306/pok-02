const API_KEY = '4330ebfabc654a6992c2aa792f3173a3';
const BASE_URL = `https://newsapi.org/v2`;
const options = {
  headers: {
    Authorization: API_KEY,
  },
};
export default class NewApiService {
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
