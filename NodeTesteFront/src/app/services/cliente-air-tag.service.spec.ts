import { TestBed } from '@angular/core/testing';

import { ClienteAirTagService } from './cliente-air-tag.service';

describe('ClienteAirTagService', () => {
  let service: ClienteAirTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteAirTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
