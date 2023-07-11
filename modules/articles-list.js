export function createArticleDataByGoRest(incomingServerData) {
  let articlesData = [];
  incomingServerData.data.forEach(elemet => {
    let articleObj = {
      title: elemet.title,
      body: elemet.body,
      url: `page.html?post=${elemet.id}`,
      status: 'free',
      id: elemet.id,
      target: '_blank'

    }
    articlesData.push(articleObj);
  });
  return articlesData;
}

export function createArticleList(articlesData) {
  const wrap = document.createElement('div');
  wrap.classList.add('list-group', 'mb-3');
  wrap.id = 'articles-list'
  let i = 0;
  for (const item of articlesData) {
      const linkArticle = document.createElement('a');
      linkArticle.classList.add('list-group-item', 'list-group-item-action', 'js-article-link');
      linkArticle.id = `${item.id}`;
      linkArticle.textContent = `${item.title}`;
      linkArticle.href = `${item.url}`;
      linkArticle.target = `${item.target}`;
      // color
      switch (i) {
        case 0:
          linkArticle.classList.add('list-group-item-primary')
          break;
        case 2:
          linkArticle.classList.add('list-group-item-danger')
          break;
        case 4:
          linkArticle.classList.add('list-group-item-success')
          break;
        case 6:
          linkArticle.classList.add('list-group-item-warning')
          break;
        case 8:
          linkArticle.classList.add('list-group-item-info')
          break;

          default:
          linkArticle.classList.add('list-group-item-secondary')
          break;
        }
        i++;
        if (i > 8) i = 0;

        wrap.append(linkArticle);
  }
  return wrap
}

export function updateArticleData(idLink, articlesData) {
  for (const item of articlesData) {
    if (item.status === 'active') item.status = 'visible';
    if (item.id == idLink) item.status = 'active';
  }
  return articlesData;
}

export function updateArticleList(links, articlesData) {
  for (const link of links) {
    for (const item of articlesData) {
      if (link.id == item.id) {
        switch (item.status) {
          case 'active':
            link.classList.add('active');
            break;
          // case 'visible':
          //   link.classList.add('list-group-item-light');
          //   break;

            default:
            link.classList.remove('active');
            break;
        }
      }
    }
  }
}

export function changeArticleList(idContainer, idArticleList, articlesData) {
  const container = document.getElementById(`${idContainer}`);
  const oldArticleList = document.getElementById(`${idArticleList}`);
  const newArticleList = createArticleList(articlesData);

  container.removeChild(oldArticleList);
  container.append(newArticleList)
}
