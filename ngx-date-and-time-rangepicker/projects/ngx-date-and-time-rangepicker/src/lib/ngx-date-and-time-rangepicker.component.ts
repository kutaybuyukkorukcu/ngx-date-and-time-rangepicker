import { AfterViewInit, Component, Input, OnDestroy, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'lib-ngx-date-and-time-rangepicker',
  templateUrl: './ngx-date-and-time-rangepicker.component.html',
  styleUrls: ['./ngx-date-and-time-rangepicker.component.scss']
})
export class NgxDateAndTimeRangepickerComponent implements OnInit, AfterViewInit {

  @Output() public customService: any = new EventEmitter();

  // beautified version of selected date and time values.
  beautifiedDate!: string | null;

  placeholder!: string; // Translate, start date, select date, end date

  DateOptions: typeof DateOptions = DateOptions;
  
  encodedStartDate!: string;
  encodedEndDate!: string;

  encodedDates!: EncodedDates;

  areFieldsValid!: boolean;

  dateInputFormat: string = 'MM/DD/YYYY';

  @Input() bsDateepickerColorTheme: DatepickerTheme = 'theme-blue';

  @Input() public startDatepickerDate!: Date;
  @Input() public startTimepickerDate!: Date;
  
  isStartTimepickerValid: boolean = true;
  isStartTimepickerDisabled: boolean = true;

  @Input() public endDatepickerDate!: Date;
  @Input() public endTimepickerDate!: Date;

  isEndTimepickerValid: boolean = true;
  isEndTimepickerDisabled: boolean = true;

  arePickerComponentsLoaded: boolean = false;

  @Input() isMaxDateToday: boolean = false;
  @Input() isYearVisible: boolean = true;
  currentYearMinDate!: Date;
  currentYearMaxDate!: Date;

  @Input() isTimepickerAvailable: boolean = true;
  @Input() isForDropdown: boolean = false;

  @Input() isHorizontal: boolean = false;
  @Input() isVertical: boolean = false;

  @Input() minDate!: Date;
  @Input() maxDate!: Date;

  // For dropdown only. Start and end dates one of them or both should not be empty.
  isStartDatepickerValid: boolean = true;
  isEndDatepickerValid: boolean = true;

  @Output() onApplyDatesEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
  
  ngOnInit() {
      this.areFieldsValid = true;

      if (this.isYearVisible != true) {
          this.currentYearMinDate = new Date();
          this.currentYearMaxDate = new Date();

          this.currentYearMinDate.setDate(1);
          // 0 is equal to january
          this.currentYearMinDate.setMonth(0);

          this.currentYearMaxDate.setDate(30);
          // 11 is equal to december
          this.currentYearMaxDate.setMonth(11);
      }

      if (this.isMaxDateToday == true) {
          this.currentYearMaxDate = new Date();
      }
  }
  
  ngAfterViewInit() {
      this.arePickerComponentsLoaded = true;
  }

  isValid(event: boolean, pickerName: DateOptions): void {

      if (pickerName == DateOptions.START) {
          if (!(this.startTimepickerDate == null)) {
              this.isStartTimepickerValid = event;
          }
      }

      if (pickerName == DateOptions.END) {
          if (!(this.endTimepickerDate == null)) {
              this.isEndTimepickerValid = event;
          }
      }
  }

  onApplyDates() {
      this.encodeStartAndEndDate();

      this.isStartDatepickerValid = this.startDatepickerDate == null ? false : true;
      this.isEndDatepickerValid = this.endDatepickerDate == null ? false : true;

      this.areFieldsValid = this.isStartDatepickerValid == true && 
          this.isEndDatepickerValid == true &&
          this.isStartTimepickerValid == true &&
          this.isEndTimepickerValid == true ? true : false;
      
      this.encodedDates = new EncodedDates(this.encodedStartDate, this.encodedEndDate);
      
      this.onApplyDatesEvent.emit(this.encodedDates);
  }

  onChangeTimeCheckbox(event: any, pickerName: DateOptions) {

      if (pickerName == DateOptions.START) {
          this.isStartTimepickerDisabled = !this.isStartTimepickerDisabled;
          if (this.isStartTimepickerDisabled == true) {
              this.startTimepickerDate = new Date();
          }
          if (this.isStartTimepickerDisabled == false) {
              this.startTimepickerDate = new Date(2015, 0, 13);
          }
          this.isStartTimepickerValid = true;
      } 
      
      if (pickerName == DateOptions.END) {
          this.isEndTimepickerDisabled = !this.isEndTimepickerDisabled;
          if (this.isEndTimepickerDisabled == true) {
              this.endTimepickerDate = new Date();
          }
          if (this.isEndTimepickerDisabled == false) {
              this.endTimepickerDate = new Date(2015, 0, 13);
          }
          this.isEndTimepickerValid = true;
      }

      this.onChangeDates();
  }

  onChangeDates() {
      let fromDate = '';

      if (this.startDatepickerDate != null) {
          let month: number | string = this.startDatepickerDate.getUTCMonth() + 1;
          let day: number | string = this.startDatepickerDate.getUTCDate();
          if (month.toString().length == 1) {
              month = ('0' + month);
          }
          if (day.toString().length == 1) {
              day = ('0' + day);
          }
          let year = this.startDatepickerDate.getUTCFullYear();
          this.isStartDatepickerValid = true;
          fromDate = month + '-' + day + '-' + year;
      }

      let fromTime = '';

      if (this.startTimepickerDate != null) {
          let hour = this.startTimepickerDate.getHours();
          let minute: number | string = this.startTimepickerDate.getMinutes();
          if (hour == 0 && minute == 0) {
              fromTime = '';
          } else {
              if (minute.toString().length == 1) {
                  minute = ('0' + minute);
              }
  
              fromTime = hour + ':' + minute;
          }
      }

      let toDate = '';

      if (this.endDatepickerDate != null) {
          let month: number | string = this.endDatepickerDate.getUTCMonth() + 1;
          let day: number | string = this.endDatepickerDate.getUTCDate();
          if (month.toString().length == 1) {
              month = ('0' + month);
          }
          if (day.toString().length == 1) {
              day = ('0' + day);
          }
          let year = this.endDatepickerDate.getUTCFullYear();
          this.isEndDatepickerValid = true;
          toDate = month + '-' + day + '-' + year;
      }
      
      let toTime = '';

      if (this.endTimepickerDate != null) {
          let hour = this.endTimepickerDate.getHours();
          let minute: number | string = this.endTimepickerDate.getMinutes();
          if (hour == 0 && minute == 0) {
              toTime = '';
          } else {
              if (minute.toString().length == 1) {
                  minute = ('0' + minute);
              }

              toTime = hour + ':' + minute;
          }
      }

      this.beautifiedDate = fromDate == '' && fromTime == '' && toDate == '' && toTime == '' 
          ? null : fromDate + ' ' + fromTime + ' - ' + toDate + ' ' + toTime;
  }

  encodeStartAndEndDate() {

      let emptyTime = new Date(2015, 0, 13);
      let startDate = '';

      if (this.startDatepickerDate != null) {
          startDate = this.customService.emit(this.startDatepickerDate, Format.DATE, DateOptions.START);
      }
      
      let startTime = '';

      if (this.isStartTimepickerDisabled) {
          if (this.startTimepickerDate != null) {
              if (this.isStartTimepickerValid) {
                  startTime = this.customService.emit(this.startTimepickerDate, Format.TIME, DateOptions.START);
              }
          } else {
              this.isStartTimepickerValid = false;
          }
      }

      if (!this.isStartTimepickerDisabled) {
          startTime = this.customService.emit(emptyTime, Format.TIME, DateOptions.START);
      }

      let endDate = '';

      if (this.endDatepickerDate != null) {
          endDate = this.customService.emit(this.endDatepickerDate, Format.DATE, DateOptions.END);
      }

      let endTime = '';

      if (this.isEndTimepickerDisabled) {
          if (this.endTimepickerDate != null) {
              if (this.isEndTimepickerValid) {
                  endTime = this.customService.emit(this.endTimepickerDate, Format.TIME, DateOptions.END);
              }
          } else {
              this.isEndTimepickerValid = false;
          }
      }

      if (!this.isEndTimepickerDisabled) {
          endTime = this.customService.emit(emptyTime, Format.TIME, DateOptions.END);
      }

      this.encodedStartDate = startDate + 'T' + startTime;
      this.encodedEndDate = endDate + 'T' + endTime;
  }

  encodeDate() {

      let emptyTime = new Date(2015, 0, 13);
      let startDate = '';

      if (this.startDatepickerDate != null) {
          startDate = this.customService.emit(this.startDatepickerDate, Format.DATE, DateOptions.START);
      }

      let startTime = '';

      if (this.isTimepickerAvailable) {
          if (this.startTimepickerDate != null) {
              if (this.isStartTimepickerValid) {
                  startTime = this.customService.emit(this.startTimepickerDate, Format.TIME, DateOptions.START);
              }
          } else {
              this.isStartTimepickerValid = false;
          }
      }

      if (!this.isTimepickerAvailable) {
          startTime = this.customService.emit(emptyTime, Format.TIME, DateOptions.START);
      }

      this.encodedStartDate = startDate + 'T' + startTime;
  }
}

export enum DateOptions {
  START = 0,
  END = 1
}

export class EncodedDates {
  startDate: string;
  endDate: string;

  constructor(encodedStartDate: string, encodedEndDate: string) {
      this.startDate = encodedStartDate;
      this.endDate = encodedEndDate;
  }
}

export enum Format {
  DATE = 0,
  TIME = 1
}

type DatepickerTheme = 'theme-default' | 'theme-green' | 'theme-blue' | 'theme-dark-blue' | 'theme-red' | 'theme-orange';