import { TestBed } from '@angular/core/testing';

import { DeleteSellReqService } from './delete-sell-req.service';

describe('DeleteSellReqService', () => {
  let service: DeleteSellReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteSellReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
