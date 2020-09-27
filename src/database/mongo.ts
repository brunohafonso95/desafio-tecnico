import mongoose, { Mongoose } from 'mongoose';

import { getEnvVariables } from '@src/config/env';
import { IMongoConfig } from '@src/interfaces';
import Schemas from '@src/interfaces/enums/Schemas';

export function getMongoConnectionString(): string {
  const {
    MONGODB_USER,
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_DATABASE,
    MONGODB_PASSWORD,
    MONGODB_SSL,
  } = getEnvVariables<IMongoConfig>(Schemas.MongoConfigSchema);

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
