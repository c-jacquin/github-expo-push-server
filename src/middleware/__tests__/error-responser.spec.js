const { errorResponder } = require('../error-responder');

describe('error responser middleware', () => {
  it('should attach the status of the error to the context', done => {
    const ctx = {};
    const error = { status: 'test-error' };
    errorResponder(ctx, () => Promise.reject(error));

    setTimeout(() => {
      expect(ctx.status).toEqual(error.status);
      done();
    });
  });

  it('should attach the status 500 if no error status', done => {
    const ctx = {};
    const error = {};
    errorResponder(ctx, () => Promise.reject(error));

    setTimeout(() => {
      expect(ctx.status).toEqual(500);
      done();
    });
  });
});
