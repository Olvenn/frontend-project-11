import axios from 'axios';
import getParsedData from './parser.js';
import getFeedsLinks from './utils.js';

const updatePosts = (watchedState) => {
  const { posts } = watchedState;
  const feedsLinks = getFeedsLinks(watchedState);

  const promises = feedsLinks.map((url) => axios({
    url: `https://allorigins.hexlet.app/get?disableCache=false&url=${encodeURIComponent(url.trim())}`,
  })
    .then((response) => {
      const data = getParsedData(response.data.contents);
      const { postsData } = data;
      const postsLinks = watchedState.posts.map((post) => post.link);
      const newPosts = postsData.filter((post) => !postsLinks.includes(post.link));
      posts.unshift(...newPosts);
    })
    .catch((err) => {
      throw err;
    }));

  Promise.all(promises)
    .finally(() => setTimeout(() => updatePosts(watchedState), 5000));
};

export default updatePosts;
