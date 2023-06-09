import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('aaa')
export class AppController {

  @Get()
  getHello(): string {
    console.log("---", String(process.env.NODE_ENV))
    return String(process.env.NODE_ENV)
  }

}