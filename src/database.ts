import { asValue, AwilixContainer } from 'awilix';
import {
  createConnection,
  getMongoManager,
  getMongoRepository,
  MongoEntityManager,
  MongoRepository,
} from 'typeorm';
import { container } from './container';
import { User } from './entity/User';
import { Env } from './services/Env';

export const connectDatabase = async (): Promise<void> => {
  const env = container.resolve<Env>('env');

  await createConnection({
    entities: [User],
    logging: env.TYPEORM_LOGGING,
    synchronize: env.TYPEORM_SYNCHRONIZE,
    type: env.TYPEORM_CONNECTION,
    url: env.TYPEORM_URL,
  });

  container.register<MongoEntityManager>(
    'dbManager',
    asValue(getMongoManager()),
  );
  container.register<MongoRepository<User>>(
    'userRepository',
    asValue(getMongoRepository<User>(User)),
  );
};
