import { Controller, Get, Param } from '@nestjs/common';

@Controller('health')
export class HealthController {

  @Get()
  sayHello() {
    return `Check health`;
  }

  @Get('/:id')
  sayHelloId(@Param('id') userId: string) {
    return `Check health ${userId || ''}`;
  }
}
