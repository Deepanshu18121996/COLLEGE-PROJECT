import { TestBed } from '@angular/core/testing';

import { SaveSecondBooksService } from './save-second-books.service';

describe('SaveSecondBooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveSecondBooksService = TestBed.get(SaveSecondBooksService);
    expect(service).toBeTruthy();
  });
});
