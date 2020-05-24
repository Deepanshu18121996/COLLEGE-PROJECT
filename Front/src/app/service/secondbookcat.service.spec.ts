import { TestBed } from '@angular/core/testing';

import { SecondbookcatService } from './secondbookcat.service';

describe('SecondbookcatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecondbookcatService = TestBed.get(SecondbookcatService);
    expect(service).toBeTruthy();
  });
});
