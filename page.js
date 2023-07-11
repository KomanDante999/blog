import { getIdPageFromUrl, loadDataFromServer } from './modules/exchange-client-server.js';
import { createUrlRequest, restServersApi } from './modules/changes-rest-api-server.js';
import { createPage, createCommets } from './modules/page-article.js';

let dataRestServer = [];
let dataPage = [];
let commentsPadeData = [];
let pageUrlServer = '';
let commentsUrlServer = '';

(() => {
  document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('page-article-container');
    container.classList.add('container');

    // article
    const pageId = getIdPageFromUrl();
    dataRestServer = restServersApi();
    // ? checking status of servers
    pageUrlServer = createUrlRequest(dataRestServer, 'GoRest', 'page', pageId);
    dataPage = await loadDataFromServer(pageUrlServer);
    const article = createPage(dataPage);
    container.append(article);

    // comments
    commentsUrlServer = createUrlRequest(dataRestServer, 'GoRest', 'comments', pageId);

    commentsPadeData = await loadDataFromServer(commentsUrlServer);
    const comments = createCommets(commentsPadeData.data)
    container.append(comments);
  })
})()







