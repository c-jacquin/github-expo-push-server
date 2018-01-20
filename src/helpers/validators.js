const isString = term => typeof term === 'string';

const validateGithubSender = sender => !!sender.login;

module.exports = {
  isString,
  validateGithubSender,
};
