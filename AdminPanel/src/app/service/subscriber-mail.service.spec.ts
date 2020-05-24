import { TestBed } from '@angular/core/testing';

import { SubscriberMailService } from './subscriber-mail.service';

describe('SubscriberMailService', () => {
  let service: SubscriberMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriberMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
