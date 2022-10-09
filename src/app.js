import axios from 'axios';
import i18next from 'i18next';
import view from './view/render.js';
import controller from './controller.js';
import resources from './locales/index.js';
import getParsedData from './parser.js';

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

  controller(elements, watchedState, i18Instance);

  const updatePosts = (watched) => {
    const { posts } = watchedState;

    const feedsLinks = watched.linkUrl;
    console.log('feedsLinks', feedsLinks);

    feedsLinks.map((url) => axios({
      url: `https://allorigins.hexlet.app/get?disableCache=false&url=${encodeURIComponent(url.trim())}`,
    })
      .then((response) => {
        const data = getParsedData(response.data.contents);
        const { postsData } = data;
        const addedPostsLinks = watched.posts.map((post) => post.link);
        console.log('addedPostsLinks', addedPostsLinks);
        posts.unshift(postsData);
      }));

    setTimeout(() => {
      updatePosts(watched);
      // console.log('Delayed for 1 second.');
    }, '5000');
  };
  updatePosts(watchedState);
};

export default app;
