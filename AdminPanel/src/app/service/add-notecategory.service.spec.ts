import { TestBed } from '@angular/core/testing';

import { AddNotecategoryService } from './add-notecategory.service';

describe('AddNotecategoryService', () => {
  let service: AddNotecategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNotecategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
