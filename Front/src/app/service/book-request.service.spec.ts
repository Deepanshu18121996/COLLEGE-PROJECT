import { TestBed } from '@angular/core/testing';

import { BookRequestService } from './book-request.service';

describe('BookRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookRequestService = TestBed.get(BookRequestService);
    expect(service).toBeTruthy();
  });
});
