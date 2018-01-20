const mongoose = require('mongoose');
const { logger } = require('./services/logger');
const { k } = require('./project-env');

const connectMongo = () => {
  return new Promise(resolve => {
    const uri = `mongodb://${k.DB.HOST}:${k.DB.PORT}/${k.DB.NAME}`;
    mongoose.connect(uri);

    const db = mongoose.connection;

    db.on('error', logger.error.bind(logger, 'connection error:'));
    db.once('open', () => {
      logger.info(`connected to mongodb ${uri}`);
      resolve();
    });
  });
};

module.exports = {
  connectMongo,
};
