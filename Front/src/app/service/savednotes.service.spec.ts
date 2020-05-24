import { TestBed } from '@angular/core/testing';

import { SavednotesService } from './savednotes.service';

describe('SavednotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavednotesService = TestBed.get(SavednotesService);
    expect(service).toBeTruthy();
  });
});
