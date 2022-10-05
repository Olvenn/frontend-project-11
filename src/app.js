import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import render from './view.js';
import resources from './locales/index.js';

const app = () => {
  const defaultLanguage = 'ru';

  const i18Instance = i18next.createInstance();
  i18Instance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  });

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

  const initialState = {
    form: {
      valid: true,
      processState: 'filling',
      errors: {},
      url: null,
    },
    feeds: [],
    posts: [],
    currentPostId: '',
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('.form-control'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
    feedback: document.querySelector('.feedback'),
  };

  const state = onChange(initialState, render(elements, i18Instance));

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const linkName = formData.get(elements.input.name);
    console.log('linkName', linkName);
    console.log('formData');

    schema.validate({ url: linkName }, { abortEarly: false })
      .then(({ url }) => {
        state.form.url = url;
        state.feeds.push(url);
        console.log('url', state);
      })
      .catch((err) => {
        state.form.valid = false;
        console.log('url', state);
        state.form.error = err.message;
      });
  });
};

export default app;
