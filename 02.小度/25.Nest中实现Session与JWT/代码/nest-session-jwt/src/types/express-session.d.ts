// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      username: string;
      role: string;
    };
    views?: number;
  }
}
