import { TestBed } from '@angular/core/testing';

import { DelNotecategoryService } from './del-notecategory.service';

describe('DelNotecategoryService', () => {
  let service: DelNotecategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelNotecategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
