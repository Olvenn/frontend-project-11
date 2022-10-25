import * as yup from 'yup';
import axios from 'axios';
import _ from 'lodash';
import getParsedRSS from '../parser.js';
import validateUrl from '../validateUrl.js';
import { getFeedsLinks, proxyUrl } from '../utils.js';
import { ProcessState } from '../consts.js';

const controllerForm = (watchedState, i18Instance, elements) => {
  yup.setLocale({
    string: {
      required: i18Instance.t('required.url'),
      url: i18Instance.t('errors.url'),
    },
  });

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    watchedState.form.processState = ProcessState.Sending;
    watchedState.processError = null;

    const formData = new FormData(evt.target);
    const linkName = formData.get(elements.input.name).trim();
    const { form, feeds, posts } = watchedState;
    const validate = validateUrl(watchedState, i18Instance);
    const feedsLinks = getFeedsLinks(watchedState);

    validate(linkName)
      .then((url) => {
        axios({
          url: proxyUrl(url),
        })
          .then((response) => {
            const data = getParsedRSS(response.data.contents, linkName);
            const { feedData, postsData } = data;
            const postsDataWithId = postsData.map((post) => ({ ...post, idItem: _.uniqueId() }));
            console.log(postsDataWithId);
            posts.unshift(...postsDataWithId);
            feeds.unshift(feedData);
            feedsLinks.push(url.trim());
            watchedState.form.processState = ProcessState.Success;
            watchedState.processError = null;
          })
          .catch((err) => {
            form.errors = err.isParsing ? i18Instance.t('errors.badRSS') : i18Instance.t('errors.network');
            watchedState.form.processState = ProcessState.Error;
            throw err;
          });
      })
      .catch((err) => {
        form.valid = false;
        form.errors = err.message;
        watchedState.form.processState = ProcessState.Error;
        watchedState.processError = null;
      });
  });
};

export default controllerForm;
