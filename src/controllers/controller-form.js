import * as yup from 'yup';
import axios from 'axios';
import getParsedData from '../parser.js';

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

    const schema = yup.object({
      url: yup.string()
        .required()
        .url()
        .notOneOf(watchedState.linkUrl, i18Instance.t('errors.rssExist')),
    });

    const validate = (link) => schema
      .validate({ url: link }, { abortEarly: false })
      .then(({ url }) => {
        watchedState.form.errors = 2;

        return Promise.resolve(url.trim());
      })
      .catch((err) => {
        throw err;
      });

    validate(linkName)
      .then((url) => {
        axios({
          url: `https://allorigins.hexlet.app/get?disableCache=false&url=${encodeURIComponent(url.trim())}`,
        })
          .then((response) => {
            const data = getParsedData(response.data.contents);
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
        form.error = err.message;
        watchedState.form.processState = 'error';
        watchedState.processError = null;
      });
  });
};

export default controllerForm;
