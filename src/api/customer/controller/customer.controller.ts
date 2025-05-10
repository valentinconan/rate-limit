import {Controller, Get, HttpCode} from "@nestjs/common";
import {RateLimitService} from "../../../service/rate-limit.service";
import {RateLimitRetryService} from "../../../service/rate-limit-retry.service";

@Controller("/customer")
export class CustomerController {

    constructor(private readonly rateLimitService: RateLimitService, private readonly rateLimitRetryService: RateLimitRetryService) {
    }

    @Get()
    health(): string {
        return "ok"
    }

    @Get("/rate-limit")
    @HttpCode(200)
    async rateLimit() {
        await this.rateLimitService.canMakeRequest();
        return "done"
    }

    @Get("/rate-limit-retry")
    @HttpCode(200)
    async rateLimitRetry() {
        await this.rateLimitRetryService.canMakeRequest();
        return "done"
    }
}