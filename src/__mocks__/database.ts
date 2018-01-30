export const connectDatabase = (env: any) => {
  return Promise.resolve({
    mongoManager: {
      save: (type: any, data: any, opt: any) => Promise.resolve({}),
      find: (type: any) =>
        Promise.resolve([{ login: 'test', pushToken: 'qwerty' }]),
      findOneAndUpdate: (type: any, query: any, data: any) =>
        process.env.TEST_FAIL ? Promise.reject({}) : Promise.resolve({}),
    },
  })
}
