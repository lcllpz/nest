import { Module } from '@nestjs/common';
import { createClient } from 'redis';

const createRedisClient = () => {
  return createClient({
    socket: {
      host: 'localhost',
      port: 6379,
    },
  }).connect();
};

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: createRedisClient,
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
