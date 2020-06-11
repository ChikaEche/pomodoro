import { TestBed } from '@angular/core/testing';

import { SessionUpdateService } from './session-update.service';

describe('SessionUpdateService', () => {
  let service: SessionUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
