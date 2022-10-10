import i18next from 'i18next';
import view from './view/render.js';
import controller from './controller.js';
import resources from './locales/index.js';
import updatePosts from './update-posts.js';

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
    },
    linkUrl: [],
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

  const watchedState = view(initialState, elements, i18Instance);

  const timerId = updatePosts(watchedState);

  controller(elements, watchedState, i18Instance, timerId);
};

export default app;
