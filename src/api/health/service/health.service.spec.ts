import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be probe',()=>{
    expect(service.probe()).toBeTruthy()
  });
  it('should be ready',()=>{
    expect(service.ready()).toBeTruthy()
  });
  it('should be alive',()=>{
    expect(service.live()).toBeTruthy()
  });
});
