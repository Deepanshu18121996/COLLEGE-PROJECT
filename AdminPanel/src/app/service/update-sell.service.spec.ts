import { TestBed } from '@angular/core/testing';

import { UpdateSellService } from './update-sell.service';

describe('UpdateSellService', () => {
  let service: UpdateSellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateSellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
