const createFeedsHtml = (data) => {
  const feeds = `
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title h4">Фиды</h2>
      </div>
      <ul class="list-group border-0 rounded-0">
      ${data}
        <li class="list-group-item border-0 border-end-0">
          <h3 class="h6 m-0">Новые уроки на Хекслете</h3>
          <p class="m-0 small text-black-50">Практические уроки по программированию</p>
        </li>
      </ul>
    </div>`;
  console.log('feeds', data);

  return feeds;
};

export default createFeedsHtml;
