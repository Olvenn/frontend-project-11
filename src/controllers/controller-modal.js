const controllerModal = (elements, watchedState) => {
  const postContaner = elements.posts;
  const { closeBtn } = elements.modal;

  postContaner.addEventListener('click', (evt) => {
    const { id } = evt.target.dataset;
    const { modalsIds } = watchedState;
    modalsIds.push(id);
    watchedState.currentModalId = id;
  });

  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      watchedState.currentModalId = null;
    });
  });
};

export default controllerModal;
