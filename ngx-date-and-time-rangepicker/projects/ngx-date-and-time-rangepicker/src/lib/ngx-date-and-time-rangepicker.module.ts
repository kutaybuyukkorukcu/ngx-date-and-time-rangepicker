import { NgModule } from '@angular/core';
import { NgxDateAndTimeRangepickerComponent } from './ngx-date-and-time-rangepicker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@NgModule({
  declarations: [
    NgxDateAndTimeRangepickerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule
  ],
  exports: [
    NgxDateAndTimeRangepickerComponent
  ]
})
export class NgxDateAndTimeRangepickerModule { }
