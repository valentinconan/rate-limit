import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import {HealthService} from "../service/health.service";
import {HttpException} from "@nestjs/common";

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService]
    }).compile();

    service = module.get<HealthService>(HealthService);
    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be healthy',()=>{
    expect(controller.health()).toEqual("ok")
  })

  it('should be alive',()=>{
    jest.spyOn(service, 'live').mockImplementation(() => true);
    controller.liveness()
  })
  it('should not be alive',async()=>{
    jest.spyOn(service, 'live').mockImplementation(() => false);
     await expect(controller.liveness()).rejects.toThrow(HttpException);
  })
  it('should be probe',()=>{
    jest.spyOn(service, 'probe').mockImplementation(() => true);
    controller.probeness()
  })
  it('should not be probe',async ()=>{
    jest.spyOn(service, 'probe').mockImplementation(() => false);
    await expect(controller.probeness()).rejects.toThrow(HttpException);
  })
  it('should be ready',()=>{
    jest.spyOn(service, 'ready').mockImplementation(() => true);
    controller.readiness()
  })
  it('should be ready',async()=>{
    jest.spyOn(service, 'ready').mockImplementation(() => false);
    await expect(controller.readiness()).rejects.toThrow(HttpException);
  })

});
