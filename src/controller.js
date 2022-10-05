import * as yup from 'yup';

export default (elements, watchedState, i18Instance) => {
  yup.setLocale({
    string: {
      required: i18Instance.t('required.url'),
      url: i18Instance.t('errors.url'),
    },
  });

  const schema = yup.object({
    url: yup.string()
      .required()
      .url(),
  });

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const linkName = formData.get(elements.input.name);
    const { form, feeds } = watchedState;
    console.log(form);


    schema.validate({ url: linkName }, { abortEarly: false })
      .then(({ url }) => {
        form.url = url;
        feeds.push(url);
      })
      .catch((err) => {
        form.valid = false;
        form.error = err.message;
      });
  });
};
