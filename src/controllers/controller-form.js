import * as yup from 'yup';
import axios from 'axios';
import getParsedRSS from '../parser.js';
import validateUrl from '../validate.js';

const controllerForm = (elements, watchedState, i18Instance, timerId) => {
  yup.setLocale({
    string: {
      required: i18Instance.t('required.url'),
      url: i18Instance.t('errors.url'),
    },
  });

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    watchedState.form.processState = 'sending';
    watchedState.processError = null;

    clearTimeout(timerId);

    const formData = new FormData(evt.target);
    const linkName = formData.get(elements.input.name).trim();
    const { form, feeds, posts } = watchedState;

    const validate = validateUrl(watchedState, i18Instance);

    validate(linkName)
      .then((url) => {
        axios({
          url: `https://allorigins.hexlet.app/get?disableCache=false&url=${encodeURIComponent(url.trim())}`,
        })
          .then((response) => {
            const data = getParsedRSS(response.data.contents, linkName);
            const { feedData, postsData } = data;
            posts.unshift(...postsData);
            feeds.unshift(feedData);
            watchedState.linkUrl.push(url.trim());
            watchedState.form.processState = 'success';
            watchedState.processError = null;
          })
          .catch((err) => {
            watchedState.processError = i18Instance.t('errors.network');
            watchedState.form.processState = 'filling';
            throw err;
          });
      })
      .catch((err) => {
        form.valid = false;
        form.errors = err.message;
        watchedState.form.processState = 'error';
        watchedState.processError = null;
      });
  });
};

export default controllerForm;
