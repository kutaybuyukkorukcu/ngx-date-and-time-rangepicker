import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDateAndTimeRangepickerComponent } from './ngx-date-and-time-rangepicker.component';

describe('NgxDateAndTimeRangepickerComponent', () => {
  let component: NgxDateAndTimeRangepickerComponent;
  let fixture: ComponentFixture<NgxDateAndTimeRangepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDateAndTimeRangepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDateAndTimeRangepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
