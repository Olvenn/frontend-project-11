import _ from 'lodash';

const getParsedRSS = (content) => {
  const parser = new DOMParser();
  const parsedContent = parser.parseFromString(content, 'application/xml');

  if (parsedContent.querySelector('parsererror')) {
    throw new Error('invalidRss');
  }

  const feedTitle = parsedContent.querySelector('title').textContent;
  const feedDescription = parsedContent.querySelector('description').textContent;
  const feedId = _.uniqueId();
  const feed = { feedId, feedTitle, feedDescription };

  const items = parsedContent.querySelectorAll('item');
  const posts = [...items].map((item) => {
    const idItem = _.uniqueId();
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;

    return {
      title, description, link, idItem,
    };
  });
  // console.log(feed, posts);

  return { feedData: feed, postsData: { feedId, posts } };
};

export default getParsedRSS;
