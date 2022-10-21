const elements = {
  body: document.querySelector('body'),
  form: document.querySelector('.rss-form'),
  input: document.querySelector('.form-control'),
  submitButton: document.querySelector('[type="submit"]'),
  feeds: document.querySelector('.feeds'),
  posts: document.querySelector('.posts'),
  feedback: document.querySelector('.feedback'),
  modal: {
    modalContainer: document.querySelector('.modal'),
    title: document.querySelector('.modal-title'),
    description: document.querySelector('.modal-body'),
    readBtn: document.querySelector('.full-article'),
    closeBtn: document.querySelectorAll('[data-bs-dismiss="modal"]'),
  },
};

const ProcessState = {
  Success: 'success',
  Error: 'error',
  Sending: 'sending',
  Idle: 'idle',
};

const TIME_UPDATA = 5000;

export { elements, ProcessState, TIME_UPDATA };
