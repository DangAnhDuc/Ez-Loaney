import { TestBed } from '@angular/core/testing';

import { ItemdetailService } from './itemdetail.service';

describe('ItemdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemdetailService = TestBed.get(ItemdetailService);
    expect(service).toBeTruthy();
  });
});
