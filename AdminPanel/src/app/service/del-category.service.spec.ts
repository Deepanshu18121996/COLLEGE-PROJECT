import { TestBed } from '@angular/core/testing';

import { DelCategoryService } from './del-category.service';

describe('DelCategoryService', () => {
  let service: DelCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
