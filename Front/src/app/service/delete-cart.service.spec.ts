import { TestBed } from '@angular/core/testing';

import { DeleteCartService } from './delete-cart.service';

describe('DeleteCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteCartService = TestBed.get(DeleteCartService);
    expect(service).toBeTruthy();
  });
});
