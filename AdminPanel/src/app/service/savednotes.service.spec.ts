import { TestBed } from '@angular/core/testing';

import { SavednotesService } from './savednotes.service';

describe('SavednotesService', () => {
  let service: SavednotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavednotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
