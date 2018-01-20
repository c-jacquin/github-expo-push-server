/*
 * Testing Environment - used by automated endpoint tests.
 */
module.exports = {
  REQUEST_LOGS: false,
  DB: {
    HOST: 'localhost',
    PORT: '27017',
    NAME: 'github-push-test',
  },
};
