import { TestBed } from '@angular/core/testing';

import { AddBooksService } from './add-books.service';

describe('AddBooksService', () => {
  let service: AddBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
