import { TestBed } from '@angular/core/testing';

import { StartInfoService } from './start-info.service';

describe('StartInfoService', () => {
  let service: StartInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
