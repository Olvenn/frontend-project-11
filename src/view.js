import onChange from 'on-change';

const renderErrors = (elements, error) => {
  const { feedback, input } = elements;
  feedback.textContent = '';
  input.classList.add('is-invalid');
  feedback.classList.remove('text-success');
  feedback.classList.add('text-danger');
  feedback.textContent = error;
};

const renderFeeds = (elements, i18Instance) => {
  const { feedback, input } = elements;
  input.classList.remove('is-invalid');
  feedback.textContent = '';
  feedback.classList.add('text-success');
  feedback.classList.remove('text-danger');
  feedback.textContent = i18Instance.t('rss');
  elements.form.reset();
  elements.input.focus();
};

const render = (elements, i18Instance) => (path, value) => {
  console.log('path', path);
  switch (path) {
    case 'form.error':
      renderErrors(elements, value);
      break;
    case 'feeds':
      renderFeeds(elements, i18Instance);
      break;

    default:
      break;
  }
};

const view = (state, el, lang) => onChange(state, render(el, lang));

export default view;
