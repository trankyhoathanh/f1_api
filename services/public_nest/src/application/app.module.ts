import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthModule } from './health/health.module';
import { RaceModule } from './race/race.module';
import { DriverModule } from './driver/driver.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    HealthModule,
    RaceModule,
    DriverModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
