import {Injectable} from "@nestjs/common";


@Injectable()
export class HealthService{

    ready(): boolean{
        return true
    }
    probe(): boolean{
        return true
    }
    live(): boolean{
        return true
    }
}