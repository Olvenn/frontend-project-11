import axios from 'axios';
import getParsedData from './parser.js';

const updatePosts = (watched) => {
  const { posts } = watched;
  const feedsLinks = watched.linkUrl;

  feedsLinks.map((url) => axios({
    url: `https://allorigins.hexlet.app/get?disableCache=false&url=${encodeURIComponent(url.trim())}`,
  })
    .then((response) => {
      const data = getParsedData(response.data.contents);
      const { postsData } = data;
      const postsLinks = watched.posts.map((post) => post.link);
      const newPosts = postsData.filter((post) => !postsLinks.includes(post.link));
      posts.unshift(...newPosts);
    }));

  const timerId = setTimeout(() => {
    updatePosts(watched);
  }, '5000');
  return timerId;
};

export default updatePosts;
