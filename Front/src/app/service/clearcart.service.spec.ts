import { TestBed } from '@angular/core/testing';

import { ClearcartService } from './clearcart.service';

describe('ClearcartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClearcartService = TestBed.get(ClearcartService);
    expect(service).toBeTruthy();
  });
});
