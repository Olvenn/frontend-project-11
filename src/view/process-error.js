const handleProcessError = (elements, i18Instance) => {
  const { feedback } = elements;
  feedback.textContent = i18Instance.t('errors.network');
};

export default handleProcessError;
