import he from 'he';

const createPostsHtml = (data, i18Instance) => {
  const postsHtml = `
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title h4">${i18Instance.t('posts')}</h2>
      </div>
      <ul class="list-group border-0 rounded-0">

        ${data.map((post) => (`
          <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
            <a href="${he.encode(post.link)}" class="fw-bold" data-id="${post.idItem}" target="_blank" rel="noopener noreferrer">
              ${he.encode(post.title)}
            </a>
            <button type="button" class="btn btn-outline-primary btn-sm" data-id="${post.idItem}" data-bs-toggle="modal" data-bs-target="#modal">
              ${i18Instance.t('view')}
            </button>
          </li>
        `)).join('')}
      </ul>
    </div>`;

  return postsHtml;
};

export default createPostsHtml;
