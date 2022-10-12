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
  posts.innerHTML = createPostsHtml(state.posts);
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

    default:
      break;
  }
};

const view = (state, el, lang) => onChange(state, render(el, lang, state));

export default view;
