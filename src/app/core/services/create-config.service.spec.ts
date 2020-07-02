import { TestBed } from '@angular/core/testing';

import { CreateConfigService } from './create-config.service';

describe('CreateConfigService', () => {
  let service: CreateConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
