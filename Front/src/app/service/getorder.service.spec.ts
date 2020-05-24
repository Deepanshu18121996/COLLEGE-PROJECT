import { TestBed } from '@angular/core/testing';

import { GetorderService } from './getorder.service';

describe('GetorderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetorderService = TestBed.get(GetorderService);
    expect(service).toBeTruthy();
  });
});
