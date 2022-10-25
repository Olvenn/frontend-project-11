import he from 'he';

const createFeedsHtml = (data, i18Instance) => {
  const feeds = `
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title h4">${i18Instance.t('feeds')}</h2>
      </div>
      <ul class="list-group border-0 rounded-0">
        ${data.map((item) => (`
          <li class="list-group-item border-0 border-end-0">
            <h3 class="h6 m-0">${he.encode(item.feedTitle)}</h3>
            <p class="m-0 small text-black-50">${he.encode(item.feedDescription)}</p>
          </li>`)).join('')}
      </ul>
    </div>`;

  return feeds;
};

export default createFeedsHtml;
