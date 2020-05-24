import { TestBed } from '@angular/core/testing';

import { GetSelluserService } from './get-selluser.service';

describe('GetSelluserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSelluserService = TestBed.get(GetSelluserService);
    expect(service).toBeTruthy();
  });
});
