import onChange from 'on-change';
import createFeedsHtml from './create-feeds-html.js';
import createPostsHtml from './create-posts-html.js';

const renderSuccess = (elements, state, i18Instance) => {
  const { feedback, input } = elements;
  input.classList.remove('is-invalid');
  feedback.textContent = '';
  feedback.classList.add('text-success');
  feedback.classList.remove('text-danger');
  feedback.textContent = i18Instance.t('success');
};

const renderErrors = (elements, state, i18Instance) => {
  if (state.processError === null) {
    const { feedback, input } = elements;
    feedback.textContent = '';
    input.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = i18Instance.t('errors.url');
  }
};

const handleProcessError = (elements, i18Instance) => {
  const { feedback } = elements;
  feedback.textContent = i18Instance.t('errors.network');
};

const handleProcessState = (elements, processState, state, i18Instance) => {
  console.log(state);
  const { submitButton } = elements;
  switch (processState) {
    case 'success':
      renderSuccess(elements, state, i18Instance);
      submitButton.disabled = false;
      elements.submitButton.style.opacity = '1';
      state.form.errors = {};
      break;

    case 'error':
      renderErrors(elements, state, i18Instance);
      submitButton.disabled = false;
      elements.submitButton.style.opacity = '1';
      break;

    case 'sending':
      submitButton.disabled = true;
      elements.submitButton.style.opacity = '0.65';
      break;

    case 'filling':
      submitButton.disabled = false;
      break;

    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};

const renderFeeds = (elements, state) => {
  const { feeds } = elements;
  feeds.innerHTML = createFeedsHtml(state.feeds);
  elements.form.reset();
  elements.input.focus();
};

const renderPosts = (elements, state) => {
  const { posts } = elements;

  if (state.modalsIds.length > 0) {
    posts.innerHTML = createPostsHtml(state.posts);
    state.modalsIds.forEach((id) => {
      const currentLink = document.querySelector(`a[data-id="${id}"]`);
      currentLink.classList.remove('fw-bold');
      currentLink.classList.add('fw-normal', 'link-secondary');
    });
  } else {
    posts.innerHTML = createPostsHtml(state.posts);
  }
};

const renderModal = (elements, state) => {
  const { body } = elements;
  const {
    modalContainer, title, description, readBtn,
  } = elements.modal;
  const id = state.currentModalId;
  const openPost = state.posts.find((post) => post.idItem === id);

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

  if (id === null) {
    handleCloseClick();
  }

  if (id > 0) {
    const currentLink = document.querySelector(`a[data-id="${id}"]`);
    currentLink.classList.remove('fw-bold');
    currentLink.classList.add('fw-normal', 'link-secondary');
    handleOpenClick(openPost);
  }
};

const render = (elements, i18Instance, state) => (path, value) => {
  console.log(path);

  switch (path) {
    case 'feeds':
      renderFeeds(elements, state);
      break;
    case 'form.processState':
      handleProcessState(elements, value, state, i18Instance);
      break;
    case 'posts':
      renderPosts(elements, state);
      break;
    case 'currentModalId':
      renderModal(elements, state);
      break;
    case 'processError':
      handleProcessError(elements, i18Instance);
      break;

    default:
      break;
  }
};

const view = (state, el, lang) => onChange(state, render(el, lang, state));

export default view;
