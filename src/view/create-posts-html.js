const createPostsHtml = (data) => {
  const posts = `
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title h4">Посты</h2>
      </div>
      <ul class="list-group border-0 rounded-0">
        <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0"><a
            href="https://ru.hexlet.io/courses/graphs/lessons/network/theory_unit" class="fw-bold" data-id="2"
            target="_blank" rel="noopener noreferrer">Поточная сеть / Теория графов</a><button type="button"
            class="btn btn-outline-primary btn-sm" data-id="2" data-bs-toggle="modal"
            data-bs-target="#modal">Просмотр</button></li>
        <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0"><a
            href="https://ru.hexlet.io/courses/graphs/lessons/connectedness/theory_unit" class="fw-bold" data-id="28"
            target="_blank" rel="noopener noreferrer">Связанность графов / Теория графов</a><button type="button"
            class="btn btn-outline-primary btn-sm" data-id="28" data-bs-toggle="modal"
            data-bs-target="#modal">Просмотр</button></li>
      </ul>
    </div>`;

  return posts;
};

export default createPostsHtml;
