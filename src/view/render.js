import onChange from 'on-change';
import createFeedsHtml from './create-feeds-html.js';
import createPostsHtml from './create-posts-html.js';

const renderErrors = (elements, error) => {
  const { feedback, input } = elements;
  feedback.textContent = '';
  input.classList.add('is-invalid');
  feedback.classList.remove('text-success');
  feedback.classList.add('text-danger');
  feedback.textContent = error;
};

const renderFeeds = (elements, i18Instance, state) => {
  const { feedback, input, feeds } = elements;
  input.classList.remove('is-invalid');
  feedback.textContent = '';
  feeds.innerHTML = createFeedsHtml(state.feeds);
  feedback.classList.add('text-success');
  feedback.classList.remove('text-danger');
  feedback.textContent = i18Instance.t('rss');
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
  switch (path) {
    case 'form.error':
      renderErrors(elements, value);
      break;
    case 'feeds':
      renderFeeds(elements, i18Instance, state);
      break;
    case 'posts':
      renderPosts(elements, state);
      break;
    case 'currentModalId':
      renderModal(elements, state);
      break;

    default:
      break;
  }
};

const view = (state, el, lang) => onChange(state, render(el, lang, state));

export default view;
