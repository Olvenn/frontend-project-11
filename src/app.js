import onChange from 'on-change';
import i18next from 'i18next';
import view from './view.js';
import controller from './controller.js';
import resources from './locales/index.js';

const app = () => {
  const defaultLanguage = 'ru';

  const i18Instance = i18next.createInstance();
  i18Instance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
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

  // const getwatchedState = (state, el) => onChange(state, render(el, i18Instance));
  const watchedState = view(initialState, elements, i18Instance);
  // const watchedState = onChange(initialState, render(elements, i18Instance));

  controller(elements, watchedState, i18Instance);
};

export default app;
