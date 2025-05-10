import {Injectable, Logger} from "@nestjs/common";

@Injectable()
export class RateLimitRetryService {
    private logger = new Logger(RateLimitRetryService.name)

    /** the limit of call in the windows range **/
    private readonly limitValue: number = 5;
    /** the range in milliseconds **/
    private readonly windowRange: number = 1000;

    private windowStart: string;
    private requestCount: number = 1;
    private remainingRequests: number = 5;

    constructor() {
    }

    async canMakeRequest(retry: number = 5): Promise<boolean> {
        const now = Date.now();

        // if windows doesn't exist or is expired, renew it
        if (!this.windowStart || (now - parseInt(this.windowStart)) >= this.windowRange) {
            this.windowStart = now.toString();
            this.remainingRequests = this.limitValue;
        }

        if (this.remainingRequests >= this.requestCount) {
            this.remainingRequests--;
            return true;
        }
        if (retry > 0) {
            await this.wait();
            return await this.canMakeRequest(--retry);
        }
        throw new Error("None request available")
    }

    async wait(ms: number = 1000): Promise<void> {
        this.logger.warn(`Waiting ${ms}ms for the next call`);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }

}

