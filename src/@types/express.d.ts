import * as http from 'http';

import { IDecodedUser } from '@src/providers/AuthProvider';

declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    decoded?: IDecodedUser;
  }
}
