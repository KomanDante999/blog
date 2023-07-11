
export function restServersApi() {
  let serversApi = [
    {
      name: 'GoRest',
      status: 0,
      domen: 'gorest.co.in/',
      uriPosts: 'public-api/posts',
      uriPage: 'public-api/posts/',
      uriComments: 'public-api/comments?post_id=',
    },
  ]
  return serversApi;
}


export function createUrlRequest(serverData, severName, uriType, idPage) {
  const protocol = 'https://';
  let urlServer = ''
  for (const serverObj of serverData) {
    if (serverObj.name == severName) {
      switch (uriType) {
        case 'posts':
          let page = ''
          if (idPage > 1) {
            page = `?page=${idPage}`
          }
          urlServer = `${protocol}${serverObj.domen}${serverObj.uriPosts}${page}`;
          break;
        case 'page':
          urlServer = `${protocol}${serverObj.domen}${serverObj.uriPage}${idPage}`;
          break;
        case 'comments':
          urlServer = `${protocol}${serverObj.domen}${serverObj.uriComments}${idPage}`;
          break;
      }
    }
  }
  return urlServer;
}

// https://gorest.co.in/public-api/comments?post_id=2577
