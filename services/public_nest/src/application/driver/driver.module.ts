import { Module } from '@nestjs/common';

import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

@Module({
  // imports: [TypeOrmModule.forFeature([DriverResult])],
  providers: [DriverService],
  controllers: [DriverController],
})
export class DriverModule {}
