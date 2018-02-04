import { TestBed, inject } from '@angular/core/testing';

import { AbodeService } from './abode.service';

describe('AbodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbodeService]
    });
  });

  it('should be created', inject([AbodeService], (service: AbodeService) => {
    expect(service).toBeTruthy();
  }));
});
