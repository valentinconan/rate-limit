import {Injectable} from "@nestjs/common";


@Injectable()
export class RateLimitService {

    /** the limit of call in the windows range **/
    private readonly limitValue: number = 5;
    /** the range in milliseconds **/
    private readonly windowRange: number = 1000;

    private windowStart: string;
    private requestCount:number=1;
    private remainingRequests:number=5;

    constructor() {
    }

    async canMakeRequest(): Promise<boolean> {
        const now = Date.now();

        // if windows doesn't exist or is expired, renew it
        if (!this.windowStart || (now - parseInt(this.windowStart)) >= this.windowRange) {
            this.windowStart=now.toString();
            this.remainingRequests=this.limitValue;
        }

        if (this.remainingRequests >= this.requestCount) {
            this.remainingRequests--;
            return true;
        }

        throw new Error("None request available")
    }
}
