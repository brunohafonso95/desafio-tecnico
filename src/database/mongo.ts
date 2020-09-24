import mongoose, { Mongoose } from 'mongoose';

import { mongoConfig } from '@src/config/env';

export function getMongoConnectionString(): string {
  const {
    MONGODB_USER,
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_DATABASE,
    MONGODB_PASSWORD,
    MONGODB_SSL,
  } = mongoConfig.getEnv();

  return `mongodb://${
    MONGODB_USER && MONGODB_PASSWORD
      ? `${MONGODB_USER}:${encodeURIComponent(MONGODB_PASSWORD)}@`
      : ''
  }${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?ssl=${MONGODB_SSL}`;
}

export const connect = async (): Promise<Mongoose> =>
  mongoose.connect(getMongoConnectionString(), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export const close = (): Promise<void> => mongoose.connection.close();
