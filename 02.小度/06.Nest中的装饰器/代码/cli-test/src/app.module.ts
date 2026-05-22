import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PersonModule } from './person/person.module';

// const createRandomFactory = () => Math.random();
const createRandomFactory = (
  car: { brand: string; price: number },
  appService: AppService,
) => {
  return {
    random: Math.random(),
    brand: car.brand,
    hello: appService.getHello(),
  };
};

@Module({
  imports: [UserModule, PersonModule],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      provide: 'car',
      useValue: {
        brand: 'BYD',
        price: 100000,
      },
    },
    {
      provide: 'random',
      useFactory: createRandomFactory,
      inject: ['car', AppService],
    },
  ],
})
export class AppModule {}
