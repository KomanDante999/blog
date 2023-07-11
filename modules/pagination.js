export function createPaginationData(totalPage) {
  return [
    {
      name: 'prev',
      status: 'disabled',
      value: -1,
      text: '&laquo;',
      type: 'arrow',
    },
    {
      name: 'first',
      status: 'disabled',
      value: 1,
      text: 1,
      type: 'number',
    },
    {
      name: 'spase',
      status: 'disabled',
      value: 0,
      text: '...',
      type: '',
    },
    {
      name: 'left',
      status: 'active',
      value: 1,
      text: 1,
      type: 'number',
    },
    {
      name: 'middle',
      status: 'free',
      value: 2,
      text: 2,
      type: 'number',
    },
    {
      name: 'rigt',
      status: 'free',
      value: 3,
      text: 3,
      type: 'number',
    },
    {
      name: 'spase',
      status: 'disabled',
      value: 0,
      text: '...',
      type: '',
    },
    {
      name: 'last',
      status: 'free',
      value: totalPage,
      text: totalPage,
      type: 'number',
    },
    {
      name: 'next',
      status: 'free',
      value: 1,
      text: '&raquo;',
      type: 'arrow',
    },
  ]
}


export function createPagination(arrayPropertys) {
  const nav = document.createElement('nav');
  nav.ariaLevel = 'навигация по страницам блога';
  const ul = document.createElement('ul');
  ul.classList.add('pagination', 'justify-content-center');
  for (const objProp of arrayPropertys) {
    const li = document.createElement('li');
    li.classList.add('page-item', 'js-paginator-item');
    li.classList.add(`${objProp.status}`);
    li.id = `paginator-item-${objProp.name}`
    const btn = document.createElement('button');
    btn.classList.add('page-link', 'js-paginator-btn');
    btn.name = `${objProp.name}`;
    const content = document.createElement('span');
    content.innerHTML = `${objProp.text}`;
    content.setAttribute('aria-hidden', 'true')

    btn.append(content);
    li.append(btn);
    ul.append(li);
    nav.append(ul);
  }
  return nav;
}

export function updatePagination(arrayPropertys) {
  // update status items
  const items = document.querySelectorAll('.js-paginator-item');
  for (const objProp of arrayPropertys) {
    for (const item of items) {
      if (item.id.includes(`${objProp.name}`)) {
        item.classList.remove('free', 'disabled', 'active');
        item.classList.add(`${objProp.status}`);
      }
    }
  }
  // update status buttons
  const buttons = document.querySelectorAll('.js-paginator-btn');
  for (const objProp of arrayPropertys) {
    for (const button of buttons) {
      if (button.name.includes(`${objProp.name}`)) {
        button.firstChild.innerHTML = `${objProp.text}`;
      }
    }
  }
}


export function updatePaginationData(btnName, arrayPropertys, totalPage) {
  // currenPage
  let currenPage;
  for (const objProp of arrayPropertys) {
    if (objProp.status === 'active') {
      currenPage = objProp.value;
    }
  }
  // newCurrenPage
  let newCurrenPage;
  for (const objProp of arrayPropertys) {
    if (objProp.name === btnName) {
      switch (objProp.type) {
        case 'arrow':
          newCurrenPage = currenPage + objProp.value;
          break;
          case 'number':
            newCurrenPage = objProp.value;
            break;
          }
        }
      }

  // rules of button paginator
  // start page
  if (newCurrenPage === 1) {
    for (const objProp of arrayPropertys) {
      switch (objProp.name) {
        case 'prev':
          objProp.status = 'disabled';
          break;
        case 'first':
          objProp.status = 'disabled';
          break;
        case 'left':
          objProp.status = 'active';
          objProp.value = newCurrenPage;
          objProp.text = newCurrenPage;
          break;
        case 'middle':
          objProp.status = 'free';
          objProp.value = newCurrenPage + 1;
          objProp.text = newCurrenPage + 1;
          break;
        case 'rigt':
          objProp.status = 'free';
          objProp.value = newCurrenPage + 2;
          objProp.text = newCurrenPage + 2;
          break;
        case 'last':
          objProp.status = 'free';
          break;
        case 'next':
          objProp.status = 'free';
          break;
      }
    }
  }
  // end page
  if (newCurrenPage === totalPage) {
    for (const objProp of arrayPropertys) {
      switch (objProp.name) {
        case 'prev':
          objProp.status = 'free';
          break;
        case 'first':
          objProp.status = 'free';
          break;
        case 'left':
          objProp.status = 'free';
          objProp.value = newCurrenPage - 2;
          objProp.text = newCurrenPage - 2;
          break;
        case 'middle':
          objProp.status = 'free';
          objProp.value = newCurrenPage - 1;
          objProp.text = newCurrenPage - 1;
          break;
        case 'rigt':
          objProp.status = 'active';
          objProp.value = newCurrenPage;
          objProp.text = newCurrenPage;
          break;
        case 'last':
          objProp.status = 'disabled';
          break;
        case 'next':
          objProp.status = 'disabled';
          break;
      }
    }
  }
  // intermediate page
  if (newCurrenPage > 1 && newCurrenPage < totalPage) {
    for (const objProp of arrayPropertys) {
      switch (objProp.name) {
        case 'prev':
          objProp.status = 'free';
          break;
        case 'first':
          objProp.status = 'free';
          break;
        case 'left':
          objProp.status = 'free';
          objProp.value = newCurrenPage - 1;
          objProp.text = newCurrenPage - 1;
          break;
        case 'middle':
          objProp.status = 'active';
          objProp.value = newCurrenPage;
          objProp.text = newCurrenPage;
          break;
        case 'rigt':
          objProp.status = 'free';
          objProp.value = newCurrenPage + 1;
          objProp.text = newCurrenPage + 1;
          break;
        case 'last':
          objProp.status = 'free';
          break;
        case 'next':
          objProp.status = 'free';
          break;
      }
    }
  }
}

export function getCurrentPage(arrayPropertys) {
  for (const objProp of arrayPropertys) {
    if (objProp.status === 'active') {
      return objProp.value;
    }
  }
}
