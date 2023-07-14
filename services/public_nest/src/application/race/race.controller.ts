import { Controller, Get, Param, Query } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceFilterOptions } from './interfaces/filters';

@Controller('race')
export class RaceController {
  constructor(private readonly raceService: RaceService) { }

  @Get('/:id')
  sayHelloId(@Param('id') userId: string) {
    return `Check health race ${userId || ''}`;
  }

  @Get()
  sayHello(@Query() query: RaceFilterOptions) {
    return this.raceService.findAll(query);
  }
}
