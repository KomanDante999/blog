import { createPagination, createPaginationData, updatePagination, updatePaginationData, getCurrentPage,  } from './modules/pagination.js';
import { loadDataFromServer } from './modules/exchange-client-server.js';
import { createUrlRequest, restServersApi } from './modules/changes-rest-api-server.js';
import { createArticleList, createArticleDataByGoRest, changeArticleList, updateArticleData, updateArticleList} from './modules/articles-list.js';

let currentPage = 1;
let totalPage = 100;
let postsUrlServer = '';
let dataPagesServer = [];
let dataRestServer = [];
(() => {
  document.addEventListener('DOMContentLoaded', async () => {
  // get data for elements---------------------------
  dataRestServer = restServersApi();
  // ? checking status of servers

  postsUrlServer = createUrlRequest(dataRestServer, 'GoRest', 'posts', currentPage);
  dataPagesServer = await loadDataFromServer(postsUrlServer);

  let articleData = createArticleDataByGoRest(dataPagesServer);

  totalPage = dataPagesServer.meta.pagination.pages
  const paginationData = createPaginationData(totalPage)

  // create DOM elements------------------------------
  const container = document.getElementById('blog-container');
  container.classList.add('container');

  const containerArticleList = document.createElement('div');
  containerArticleList.id = 'container-article-list';
  containerArticleList.classList.add('py-4');

  const articleList = createArticleList(articleData);
  const paginator = createPagination(paginationData);

  containerArticleList.append(articleList)
  container.append(containerArticleList, paginator);

  // events links article
  const linksArticle = document.querySelectorAll('.js-article-link');
  linksArticle.forEach(link => {
    link.addEventListener('click', () => {
      updateArticleData(link.id, articleData);
      updateArticleList(linksArticle, articleData);
      //
    })
  });
  // events pagination buttons
  const buttonsPaginator = document.querySelectorAll('.js-paginator-btn');
  for (const button of buttonsPaginator) {
    button.addEventListener('click', async () => {
      // обновление данных пагинатора
      updatePaginationData(button.name, paginationData, totalPage);
      currentPage =  getCurrentPage(paginationData);
      // получение данных с сервера
      dataRestServer = restServersApi();
      // ? checking status of servers
      postsUrlServer = createUrlRequest(dataRestServer, 'GoRest', 'posts', currentPage);
      dataPagesServer = await loadDataFromServer(postsUrlServer);
      // отрисовка нового списка
      articleData = createArticleDataByGoRest(dataPagesServer);
      changeArticleList('container-article-list', 'articles-list', articleData);
      // events links article
      const linksArticle = document.querySelectorAll('.js-article-link');
      linksArticle.forEach(link => {
        link.addEventListener('click', () => {
          updateArticleData(link.id, articleData);
          updateArticleList(linksArticle, articleData);

          //
        })
      });
    // обновление пагинатора
    updatePagination(paginationData);
    });
  }
  })
})()











