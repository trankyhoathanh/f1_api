import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RaceController } from './race.controller';
import { RaceService } from './race.service';
import { RaceResult } from './race.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RaceResult])],
  providers: [RaceService],
  controllers: [RaceController],
})
export class RaceModule {}
