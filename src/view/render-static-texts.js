const renderStaticTexts = (elements, i18Instance) => {
  const {
    title, subtitle, placeholder, example, submitButton,
  } = elements;
  const {
    readBtn, closeBtn,
  } = elements.modal;

  submitButton.textContent = i18Instance.t('submitButton');
  title.textContent = i18Instance.t('title');
  subtitle.textContent = i18Instance.t('subtitle');
  placeholder.textContent = i18Instance.t('placeholder');
  example.textContent = i18Instance.t('example');
  readBtn.textContent = i18Instance.t('read');
  closeBtn[1].textContent = i18Instance.t('close');
};

export default renderStaticTexts;
