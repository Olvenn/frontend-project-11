import * as yup from 'yup';
import axios from 'axios';
import getParsedData from './parser.js';

export default (elements, watchedState, i18Instance) => {
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

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const linkName = formData.get(elements.input.name);
    const { form, feeds, posts } = watchedState;

    const validate = (link) => schema
      .validate({ url: link }, { abortEarly: false })
      .then(({ url }) => {
        if (!feeds.includes(url)) {
          form.errors = {};
          form.linkUrl = url.trim();

          return Promise.resolve(url);
        }
        throw new Error(i18Instance.t('errors.rssExist'));
      })
      .catch((err) => {
        throw err;
      });

    validate(linkName)
      .then((url) => {
        axios({
          url: `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`,
        })
          .then((response) => {
            const data = getParsedData(response.data.contents);
            const { feedData, postsData } = data;
            posts.unshift(postsData);
            feeds.unshift(feedData);
          })
          .catch((err) => {
            form.error = err;
          });
      })
      .catch((err) => {
        form.valid = false;
        form.error = err.message;
      });
  });
};
