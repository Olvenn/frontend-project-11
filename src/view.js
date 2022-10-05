const renderErrors = (elements, error) => {
  const { feedback, input } = elements;
  feedback.textContent = '';
  input.classList.add('is-invalid');
  feedback.classList.remove('text-success');
  feedback.classList.add('text-danger');
  feedback.textContent = error;
};

const renderFeeds = (elements) => {
  const { feedback, input } = elements;
  input.classList.remove('is-invalid');
  feedback.classList.add('text-success');
  feedback.classList.remove('text-danger');
  feedback.textContent = 'RSS успешно загружен';
  elements.form.reset();
  elements.input.focus();
};

const render = (elements) => (path, value) => {
  console.log('path', path);
  switch (path) {
    case 'form.error':
      renderErrors(elements, value);
      break;
    case 'feeds':
      renderFeeds(elements);
      break;

    default:
      break;
  }
};

export default render;
