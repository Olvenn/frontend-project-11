import i18next from 'i18next';
import view from './view/render.js';
import controllerForm from './controllers/controller-form.js';
import controllerModal from './controllers/controller-modal.js';
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
    processError: null,
    form: {
      valid: false,
      processState: 'filling',
      errors: '',
    },
    linkUrl: [],
    feeds: [],
    posts: [],
    currentModalId: null,
    modalsIds: [],
  };

  const elements = {
    body: document.querySelector('body'),
    form: document.querySelector('.rss-form'),
    input: document.querySelector('.form-control'),
    submitButton: document.querySelector('[type="submit"]'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
    feedback: document.querySelector('.feedback'),
    modal: {
      modalContainer: document.querySelector('.modal'),
      title: document.querySelector('.modal-title'),
      description: document.querySelector('.modal-body'),
      readBtn: document.querySelector('.full-article'),
      closeBtn: document.querySelectorAll('[data-bs-dismiss="modal"]'),
    },
  };

  const watchedState = view(initialState, elements, i18Instance);

  updatePosts(watchedState);
  controllerForm(elements, watchedState, i18Instance);
  controllerModal(elements, watchedState);
};

export default app;
