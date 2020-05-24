import { TestBed } from '@angular/core/testing';

import { SendingMailService } from './sending-mail.service';

describe('SendingMailService', () => {
  let service: SendingMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendingMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
