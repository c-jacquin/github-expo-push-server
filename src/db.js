const mongoose = require('mongoose');
const { logger } = require('./services/logger');
const { k } = require('./project-env');

const connectMongo = () => {
  return new Promise(resolve => {
    mongoose.connect(k.MONGODB_URI);

    const db = mongoose.connection;

    db.on('error', logger.error.bind(logger, 'connection error:'));
    db.once('open', () => {
      logger.info(`connected to mongodb ${k.MONGODB_URI}`);
      resolve();
    });
  });
};

module.exports = {
  connectMongo,
};
