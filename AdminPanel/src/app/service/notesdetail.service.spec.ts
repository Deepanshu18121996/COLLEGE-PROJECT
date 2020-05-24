import { TestBed } from '@angular/core/testing';

import { NotesdetailService } from './notesdetail.service';

describe('NotesdetailService', () => {
  let service: NotesdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
