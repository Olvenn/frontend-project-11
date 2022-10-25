import createFeedsHtml from './create-feeds-html.js';

const renderFeeds = (elements, state, i18Instance) => {
  const { feeds } = elements;
  feeds.innerHTML = createFeedsHtml(state.feeds, i18Instance);
  elements.form.reset();
  elements.input.focus();
};

export default renderFeeds;
