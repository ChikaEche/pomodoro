import { TestBed } from '@angular/core/testing';

import { TaskCreationService } from './task-creation.service';

describe('TaskCreationService', () => {
  let service: TaskCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
