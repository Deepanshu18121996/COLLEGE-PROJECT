import { TestBed } from '@angular/core/testing';

import { GetSellOrderService } from './get-sell-order.service';

describe('GetSellOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSellOrderService = TestBed.get(GetSellOrderService);
    expect(service).toBeTruthy();
  });
});
