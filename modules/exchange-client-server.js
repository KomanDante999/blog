export function getIdPageFromUrl() {
  const pageId = new URLSearchParams(document.location.search).get("post");

  return pageId;
}

export async function loadDataFromServer(urlServer) {
  const response = await fetch(`${urlServer}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  .then(res => res.json())
  .then(body => Object.assign(body));

  return response;
}


