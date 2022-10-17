import createPostsHtml from './create-posts-html.js';

const renderPosts = (elements, state) => {
  const { posts } = elements;

  if (state.modalsIds.length > 0) {
    posts.innerHTML = createPostsHtml(state.posts);
    state.modalsIds.forEach((id) => {
      const currentLink = document.querySelector(`a[data-id="${id}"]`);
      currentLink.classList.remove('fw-bold');
      currentLink.classList.add('fw-normal', 'link-secondary');
    });
  } else {
    posts.innerHTML = createPostsHtml(state.posts);
  }
};

export default renderPosts;
