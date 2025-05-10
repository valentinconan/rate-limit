import {Module} from '@nestjs/common';
import {HealthService} from './health/service/health.service';
import {HealthController} from './health/controller/health.controller';
import {CustomerController} from "./customer/controller/customer.controller";
import {RateLimitService} from "../service/rate-limit.service";
import {RateLimitRetryService} from "../service/rate-limit-retry.service";

@Module({
    providers: [HealthService, RateLimitService, RateLimitRetryService],
    controllers: [HealthController, CustomerController]
})
export class ApiModule {
}
