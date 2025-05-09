import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HealthModule} from "./api/health/health.module";
import {RateLimitService} from "./service/rate-limit.service";

@Module({
  imports: [HealthModule],
  controllers: [AppController],
  providers: [
      AppService,
      RateLimitService
  ],
})
export class AppModule {}
