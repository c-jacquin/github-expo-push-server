const { getToken } = require('../../services/github');

const authCtrl = async ctx => {
  try {
    const token = await getToken(
      ctx.request.body.code,
      ctx.request.body.clientId
    );

    ctx.body = { token };
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  authCtrl,
};
