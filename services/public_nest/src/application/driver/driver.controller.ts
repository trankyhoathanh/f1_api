import { Controller, Get, Param, Query } from '@nestjs/common';
import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) { }

  @Get()
  sayHello() {
    return this.driverService.findAll();
  }
}
