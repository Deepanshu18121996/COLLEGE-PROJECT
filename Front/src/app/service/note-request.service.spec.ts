import { TestBed } from '@angular/core/testing';

import { NoteRequestService } from './note-request.service';

describe('NoteRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteRequestService = TestBed.get(NoteRequestService);
    expect(service).toBeTruthy();
  });
});
