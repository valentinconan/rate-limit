import { Module } from '@nestjs/common';
import { HealthService } from './service/health.service';
import { HealthController } from './controller/health.controller';

@Module({
  providers: [HealthService],
  controllers: [HealthController]
})
export class HealthModule {}
