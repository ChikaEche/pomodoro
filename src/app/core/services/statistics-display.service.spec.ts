import { TestBed } from '@angular/core/testing';

import { StatisticsDisplayService } from './statistics-display.service';

describe('StatisticsDisplayService', () => {
  let service: StatisticsDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
