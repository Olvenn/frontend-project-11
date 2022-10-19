const renderSuccess = (elements, i18Instance) => {
  const { feedback, input } = elements;
  input.classList.remove('is-invalid');
  feedback.textContent = '';
  feedback.classList.add('text-success');
  feedback.classList.remove('text-danger');
  feedback.textContent = i18Instance.t('success');
};

const renderErrors = (elements, state) => {
  if (state.processError === null) {
    const { feedback, input } = elements;
    feedback.textContent = '';
    input.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = state.form.errors;
  }
};

const handleProcessState = (elements, processState, state, i18Instance) => {
  // console.log(state);
  const { submitButton } = elements;
  switch (processState) {
    case 'success':
      renderSuccess(elements, i18Instance);
      submitButton.disabled = false;
      elements.submitButton.style.opacity = '1';
      state.form.errors = {};
      break;

    case 'error':
      renderErrors(elements, state);
      submitButton.disabled = false;
      elements.submitButton.style.opacity = '1';
      break;

    case 'sending':
      submitButton.disabled = true;
      elements.submitButton.style.opacity = '0.65';
      break;

    case 'idle':
      submitButton.disabled = false;
      break;

    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};

export default handleProcessState;
