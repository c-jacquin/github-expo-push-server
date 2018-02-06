class Expo {
  static isExpoPushToken(token) {
    return true
  }
  chunkPushNotifications(chunk) {
    return [{ foo: 'bar' }]
  }
  sendPushNotificationsAsync() {
    return Promise.resolve({})
  }
}

module.exports = Expo
