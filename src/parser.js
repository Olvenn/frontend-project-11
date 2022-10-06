const getParsedData = (content, type = 'application/xml') => {
  const parser = new DOMParser();
  const parsedContent = parser.parseFromString(content, type);

  if (parsedContent.querySelector('parsererror')) {
    throw new Error('invalidRss');
  }

  return { parsedContent };
};

export default getParsedData;
