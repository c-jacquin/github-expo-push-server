const isString = term => typeof term === 'string';

const isBool = term => typeof term === 'boolean';

const validateGithubSender = sender => !!sender.login;

const validatePushProfile = settings => {
  return (
    isBool(settings.pushEnabled) &&
    isBool(settings.pushIssue) &&
    isBool(settings.pushCommit) &&
    isBool(settings.pushPr)
  );
};

module.exports = {
  isString,
  isBool,
  validatePushProfile,
  validateGithubSender,
};
