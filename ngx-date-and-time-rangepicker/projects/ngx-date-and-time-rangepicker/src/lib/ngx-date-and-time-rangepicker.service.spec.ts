import { TestBed } from '@angular/core/testing';

import { NgxDateAndTimeRangepickerService } from './ngx-date-and-time-rangepicker.service';

describe('NgxDateAndTimeRangepickerService', () => {
  let service: NgxDateAndTimeRangepickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDateAndTimeRangepickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
