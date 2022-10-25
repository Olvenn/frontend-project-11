import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import watch from './view/watchers.js';
import controllerForm from './controllers/controller-form.js';
import controllerModal from './controllers/controller-modal.js';
import resources from './locales/index.js';
import updatePosts from './update-posts.js';

const app = () => {
  const defaultLanguage = 'ru';
  const i18Config = {
    lng: defaultLanguage,
    debug: false,
    resources,
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

  const i18Instance = i18next.createInstance();
  i18Instance.init(i18Config);

  const initialState = {
    processError: null,
    form: {
      valid: false,
      processState: 'idle',
      errors: '',
    },
    linkUrl: [],
    feeds: [],
    posts: [],
    uiState: {
      openPostId: null,
      visitedPosts: [],
    },
  };

  const watchedState = watch(initialState, elements, i18Instance);

  updatePosts(watchedState);
  controllerForm(watchedState, i18Instance, elements);
  controllerModal(watchedState, elements);
};

app();
