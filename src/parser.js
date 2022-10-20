import _ from 'lodash';
import elements from './consts.js';

const getParsedRSS = (content, watchedState, linkName) => {
  const parser = new DOMParser();
  const parsedContent = parser.parseFromString(content, 'application/xml');

  if (parsedContent.querySelector('parsererror')) {
    elements.feedback.textContent = 'Ресурс не содержит валидный RSS';
    watchedState.form.errors = 'Ресурс не содержит валидный RSS';
  }

  const feedTitle = parsedContent.querySelector('title').textContent;
  const feedDescription = parsedContent.querySelector('description').textContent;
  const feedId = _.uniqueId();
  const feed = {
    feedId, feedTitle, feedDescription, linkName,
  };

  const items = parsedContent.querySelectorAll('item');
  const posts = [...items].map((item) => {
    const idItem = _.uniqueId();
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;

    return {
      feedId, title, description, link, idItem,
    };
  });

  return { feedData: feed, postsData: posts };
};

export default getParsedRSS;
