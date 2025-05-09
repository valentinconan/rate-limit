import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {RateLimitService} from "./service/rate-limit.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private rateLimitService: RateLimitService) {}

  @Get()
  getHello(): string {
    this.rateLimitService.canMakeRequest();
    return this.appService.getHello();
  }
}
