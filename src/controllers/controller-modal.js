const controllerModal = (watchedState, elements) => {
  const postContaner = elements.posts;
  const { closeBtn } = elements.modal;

  postContaner.addEventListener('click', (evt) => {
    if (evt.target.dataset.bsToggle === 'modal') {
      const { id } = evt.target.dataset;
      const { visitedPosts } = watchedState.uiState;
      const isExist = visitedPosts.includes(id);

      if (!isExist) {
        visitedPosts.push(id);
      }

      watchedState.uiState.openPostId = id;
    }
  });

  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      watchedState.uiState.openPostId = null;
    });
  });
};

export default controllerModal;
