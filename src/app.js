import i18next from 'i18next';
import view from './view/render.js';
import controller from './controller.js';
import controllerModal from './controller-modal.js';
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
    currentModalId: null,
    modalsIds: [],
    currentPostId: '',
  };

  const elements = {
    body: document.querySelector('body'),
    form: document.querySelector('.rss-form'),
    input: document.querySelector('.form-control'),
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

  const timerId = updatePosts(watchedState);

  controller(elements, watchedState, i18Instance, timerId);
  controllerModal(elements, watchedState);

  // const {
  //   posts, body, modalContainer, title, description, readBtn, closeBtn
  // } = elements;
  // const postContaner = elements.posts;
  // postContaner.addEventListener('click', (evt) => {
  //   body.classList.add('modal-open');
  //   console.log(evt.target);
  // });
};

export default app;
