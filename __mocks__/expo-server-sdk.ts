class Expo {
  static isExpoPushToken(token: string) {
    return true
  }
  chunkPushNotifications(chunk: any) {
    return [{ foo: 'bar' }]
  }
  sendPushNotificationsAsync(): Promise<{}> {
    return Promise.resolve({})
  }
}

module.exports = Expo
