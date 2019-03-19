import { TestBed } from '@angular/core/testing';

import { MandateService } from './mandate.service';

describe('MandateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MandateService = TestBed.get(MandateService);
    expect(service).toBeTruthy();
  });
});
