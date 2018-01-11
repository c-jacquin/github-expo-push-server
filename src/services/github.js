const request = require('request-promise');
const { k } = require('../project-env');

/**
 * Fetch a github oAuth token
 * @param {string} code - the github code
 * @param {string} clientId - the id of the github app
 * @returns {Promise<string>}
 */
const getToken = async (code, clientId) => {
  const result = await request({
    uri: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    body: {
      client_id: clientId,
      client_secret: k.githubSecret,
      code,
      accept: 'json',
    },
    json: true,
  });

  return result.access_token;
};

module.exports = {
  getToken,
};
