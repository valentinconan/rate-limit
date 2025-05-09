import Redis from 'ioredis';
import {SetOptions} from "redis";
import {Injectable} from "@nestjs/common";

@Injectable()
export class RateLimitFinalService {
    private readonly redis: Redis;

    private readonly rateKey: string = 'ratelimit';
    private readonly windowKey: string = 'window';
    private readonly lockKey: string = 'lock';

    /** the limit of call in the windows range **/
    private readonly limitValue: string = '5';
    /** the range in milliseconds **/
    private readonly windowRange: number = 1000;

    private requestCount:number=1;

    constructor() {
        this.redis = new Redis({
            host: 'localhost',
            port: 6379,
        });
    }

    private async acquireLock(): Promise<boolean> {
        // use expiration to prevent deadlocks
        const options = {NX: true, PX: 1000} as SetOptions;
        //@ts-ignore
        const locked = await this.redis.set(this.lockKey, '1', options);
        return locked === 'OK';
    }

    private async releaseLock(): Promise<void> {
        await this.redis.del(this.lockKey);
    }

    async canMakeRequest(retry: number = 5): Promise<boolean> {

        try {
            if (!await this.acquireLock()) {
                if (retry > 0) {
                    await wait();
                    return await this.canMakeRequest(--retry);
                }
                throw new Error("Failed to acquire lock")
            }

            const now = Date.now();
            const windowStart = await this.redis.get(this.windowKey);


            // if windows doesn't exist or is expired, renew it
            if (!windowStart || (now - parseInt(windowStart)) >= this.windowRange) {
                await this.redis.set(this.windowKey, now.toString());
                await this.redis.set(this.rateKey, this.limitValue);
            }

            const remainingRequests = parseInt(await this.redis.get(this.rateKey) || '0');
            if (remainingRequests >= this.requestCount) {
                await this.redis.decrby(this.rateKey, this.requestCount);
                return true;
            }
            if (retry > 0) {
                await wait();
                return await this.canMakeRequest(--retry);
            }
            throw new Error("None request available")
        }catch(e){
            await this.releaseLock();
        }
    }
}
async function wait(ms: number = 5000): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
