import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ApiModule} from "./api/api.module";
import {RateLimitService} from "./service/rate-limit.service";

@Module({
    imports: [ApiModule],
    controllers: [AppController],
    providers: [
        AppService,
        RateLimitService
    ],
})
export class AppModule {
}
