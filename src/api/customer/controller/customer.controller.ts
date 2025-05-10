import {Controller, Get, HttpCode} from "@nestjs/common";
import {RateLimitService} from "../../../service/rate-limit.service";

@Controller("/customer")
export class CustomerController {

    constructor(private readonly rateLimitService: RateLimitService) {
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
}