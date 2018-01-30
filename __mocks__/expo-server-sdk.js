class Expo {
  static isExpoPushToken(token) {
    return true
  }
  chunkPushNotifications(chunk) {
    return [{ foo: 'bar' }]
  }
  sendPushNotificationsAsync() {
    if (process.env.TEST_FAIL) {
      throw new Error('FAIIIIIL')
    }
    return Promise.resolve({})
  }
}

module.exports = Expo
