import * as yup from 'yup';

const validateUrl = (state, i18Instance) => {
  const schema = yup.object({
    url: yup.string()
      .required()
      .url()
      .notOneOf(state.linkUrl, i18Instance.t('errors.rssExist')),
  });

  const validate = (link) => schema
    .validate({ url: link }, { abortEarly: false })
    .then(({ url }) => {
      state.form.errors = {};

      return Promise.resolve(url.trim());
    })
    .catch((err) => {
      throw err;
    });

  return validate;
};

export default validateUrl;
