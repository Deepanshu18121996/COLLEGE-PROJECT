import { TestBed } from '@angular/core/testing';

import { OrderReqService } from './order-req.service';

describe('OrderReqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderReqService = TestBed.get(OrderReqService);
    expect(service).toBeTruthy();
  });
});
