import { TestBed, inject } from '@angular/core/testing';

import { ServerService } from './server.service';

describe('ServersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerService]
    });
  });

  it('should be created', inject([ServerService], (service: ServerService) => {
    expect(service).toBeTruthy();
  }));
});
