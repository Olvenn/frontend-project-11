import * as yup from 'yup';
import onChange from 'on-change';
import render from './view.js';

yup.setLocale({
  string: {
    required: 'This field cannot be empty',
    url: 'Please enter a valid url',
  },
});

const schema = yup.object({
  url: yup.string().required().url(),
});

const app = () => {
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

  const state = onChange(initialState, render(elements));

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const linkName = formData.get(elements.input.name);
    console.log('linkName', linkName);
    console.log('formData');

    schema.validate({ url: linkName }, { abortEarly: false })
      .then(({ url }) => {
        state.form.url = url;
        state.feeds.push(url);
        console.log('url', state);
      })
      .catch((err) => {
        state.form.valid = false;
        console.log('url', state);
        state.form.error = err.message;
      });
  });
};

export default app;
