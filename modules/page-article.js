export function createPage(dataPage) {
  const wrap = document.createElement('div');
  const title = document.createElement('h1');
  title.classList.add('h1');
  title.textContent = `${dataPage.data.title}`
  const body = document.createElement('p');
  body.textContent = `${dataPage.data.body}`

  wrap.append(title, body);
  return wrap;
}

export function createCommets(dataComments) {
  const wrap = document.createElement('ul');
  wrap.classList.add('list-group')
  for (const commentObj of dataComments) {
    const comment = document.createElement('li');
    comment.classList.add('list-group-item', 'list-group-item-success');
    const user = document.createElement('a');
    user.textContent = `${commentObj.name}`;
    user.href = `${commentObj.email}`;
    const bodyComment = document.createElement('p');
    bodyComment.textContent = `${commentObj.body}`;

    comment.append(user, bodyComment);
    wrap.append(comment)
  }
  return wrap;
}
