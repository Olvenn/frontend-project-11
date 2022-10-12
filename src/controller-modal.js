const controllerModal = (elements, watchedState) => {
  const { body } = elements;
  const {
    modalContainer, title, description, closeBtn, readBtn,
  } = elements.modal;

  const postContaner = elements.posts;

  const handleOpenClick = (post) => {
    body.classList.add('modal-open');
    modalContainer.classList.add('show');
    modalContainer.style.display = 'block';
    readBtn.href = post.link;
    title.textContent = post.title;
    description.textContent = post.description;
  };

  const handleCloseClick = () => {
    body.classList.remove('modal-open');
    modalContainer.classList.remove('show');
    modalContainer.style.display = 'none';
    readBtn.href = '#';
  };

  postContaner.addEventListener('click', (evt) => {
    const { id } = evt.target.dataset;
    const openPost = watchedState.posts.find((post) => post.idItem === id);
    watchedState.modalsIds.push(id);
    const currentLink = document.querySelector(`a[data-id="${id}"]`);
    currentLink.classList.remove('fw-bold');
    currentLink.classList.add('fw-normal', 'link-secondary');
    handleOpenClick(openPost);
  });

  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      handleCloseClick();
    });
  });
};

export default controllerModal;
