import { TestBed } from '@angular/core/testing';

import { GetSellrequestService } from './get-sellrequest.service';

describe('GetSellrequestService', () => {
  let service: GetSellrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSellrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
