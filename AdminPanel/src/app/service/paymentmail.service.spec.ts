import { TestBed } from '@angular/core/testing';

import { PaymentmailService } from './paymentmail.service';

describe('PaymentmailService', () => {
  let service: PaymentmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
