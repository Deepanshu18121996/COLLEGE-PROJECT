import { TestBed } from '@angular/core/testing';

import { CreateSellService } from './create-sell.service';

describe('CreateSellService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateSellService = TestBed.get(CreateSellService);
    expect(service).toBeTruthy();
  });
});
