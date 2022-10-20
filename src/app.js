import i18next from 'i18next';
import watch from './view/watchers.js';
import controllerForm from './controllers/controller-form.js';
import controllerModal from './controllers/controller-modal.js';
import resources from './locales/index.js';
import updatePosts from './update-posts.js';
import elements from './consts.js';

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
  controllerForm(watchedState, i18Instance);
  controllerModal(watchedState);
};

export default app;
