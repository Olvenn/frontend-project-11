import * as yup from 'yup';
import axios from 'axios';

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
    const { form, feeds } = watchedState;

    const validate1 = (link) => schema
      .validate({ url: link }, { abortEarly: false })
      .then(({ url }) => {
        feeds.push(url);
        form.errors = true;
        form.linkUrl = url;
        console.log(Promise.resolve(url));

        return Promise.resolve(url);
      })
      .catch((err) => {
        throw err;
      });

    validate1(linkName)
      .then((url) => {
        axios({ url })
          .then(({ data }) => console.log(data))
          .catch((err) => {
            form.error = err;
          });
      })
      .catch((err) => {
        form.valid = false;
        form.error = err.message;
      });

    // schema.validate({ url: linkName }, { abortEarly: false })
    //   .then(({ url }) => {
    //     form.url = url;
    //     feeds.push(url);
    //   })
    //   .catch((err) => {
    //     form.valid = false;
    //     form.error = err.message;
    //   });
  });
};
