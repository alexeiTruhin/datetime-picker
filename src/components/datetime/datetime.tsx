import { Component, Host, h, State, Listen, Element, Event, EventEmitter, Prop } from '@stencil/core';
import { adjustDateToLimits, leftPad } from '../../utils/utils';
import { splitFormatString, convertFormatKeyToType, FormatType, FormatKey } from './formats';

@Component({
  tag: 'basic-datetime',
  styleUrl: 'datetime.scss',
  shadow: true
})
export class Datetime {
  minDate: Date;
  maxDate: Date;

  @Element() el: HTMLElement;

  @State() date: Date;
  @State() pickedDate: Date;

  @Prop() min: string;
  @Prop() max: string;
  @Prop() value: string;
  @Prop() format: string = 'MM/DD/YYYY';
  @Prop() showHeader: boolean;
  @Prop() pickerBuffer: number = 3;

  @Event() dateChange: EventEmitter;

  componentWillLoad() {
    this.initProperties();
  }

  initProperties() {
    // Default dates
    let minDate = new Date('1970');
    let date = new Date();
    let maxDate = new Date();

    // TODO: validate min, max, and value
    if (this.min) minDate = new Date(this.min);
    if (this.value) date = new Date(this.value);
    if (this.max) maxDate = new Date(this.max);

    if (maxDate.getTime() < minDate.getTime()) {
      console.error('"max" date is smaller than "min" date. Values were swapped.');
      const temp = maxDate;
      maxDate = minDate;
      minDate = temp;
    } 
    if (date.getTime() > maxDate.getTime()) {
      console.error('"value" date is bigger than "max" date. "value" date was set equal to the "max" date.');
      date = new Date(maxDate.getTime());
    } 
    if (date.getTime() < minDate.getTime()) {
      console.error('"value" date is samller than "min" date. "value" date was set equal to the "min" date.');
      date = new Date(minDate.getTime());
    } 

    this.minDate = minDate;
    this.maxDate = maxDate;
    this.date = date;
    this.dateChange.emit(this.date);
    this.pickedDate = new Date(this.date.getTime());
  }

  private get datePicker() {
    const datePicker:HTMLElement = this.el.shadowRoot.querySelector('.datetime-picker');
    return datePicker;
  }

  private get dateDisplay() {
    const dateDisplay:HTMLElement = this.el.shadowRoot.querySelector('.datetime-display');
    return dateDisplay;
  }

  showDatePicker = () => {
    this.dateDisplay.classList.add('active');
    this.datePicker.classList.add('active');
    this.pickedDate = new Date(this.date.getTime());
  }

  hideDatePicker = () => {
    this.dateDisplay.classList.remove('active');
    this.datePicker.classList.remove('active');
  }

  submitDatePicker = () => {
    this.hideDatePicker();
    this.date = new Date(this.pickedDate.getTime());
    this.dateChange.emit(this.date);
  }

  cancelDatePicker = () => {
    this.hideDatePicker();
  }

  generateYears = () => {
    const changeYear = (event) => {
      const newYear = event.detail;
      this.pickedDate.setFullYear(newYear);

      // When changing year, the new date might be out of limits.
      // Have to check the limits and adjust by case.
      this.pickedDate = 
        adjustDateToLimits(this.pickedDate, this.minDate, this.maxDate);
    }

    return (
      <basic-picker
        min={this.minDate.getFullYear()}
        max={this.maxDate.getFullYear()}
        value={this.pickedDate.getFullYear()}
        onPickerChange={changeYear}
        buffer={this.pickerBuffer}
      >
      </basic-picker>
    );
  }

  generateMonths() {
    const pickedDateValues = this.getDateValues(this.pickedDate);
    const minDateValues = this.getDateValues(this.minDate);
    const maxDateValues = this.getDateValues(this.maxDate);
    let minMonth = 1;
    let maxMonth = 12;
    let valueMonth = pickedDateValues.month;

    if (pickedDateValues.year === minDateValues.year) {
      minMonth = minDateValues.month;
    }
    if (pickedDateValues.year === maxDateValues.year) {
      maxMonth = maxDateValues.month;
    }

    const changeMonth = (event) => {
      const newMonth = event.detail;

      // Months have different number of days.
      // Have to check that the new month has the current day.
      const currentDay = pickedDateValues.day;
      const tempDate = new Date(this.pickedDate);
      tempDate.setMonth(newMonth, 0);
      const maxDay = tempDate.getDate();
      const newDay = currentDay > maxDay ? maxDay : currentDay;

      this.pickedDate.setMonth(newMonth - 1, newDay);

      this.pickedDate = 
        adjustDateToLimits(this.pickedDate, this.minDate, this.maxDate);
    }

    return (
      <basic-picker
        min={minMonth}
        max={maxMonth}
        value={valueMonth}
        onPickerChange={changeMonth}
        buffer={this.pickerBuffer}
      >
      </basic-picker>
    );
  }

  generateDays() {
    const changeDay = (event) => {
      const day = event.detail;
      this.pickedDate.setDate(day);

      this.pickedDate = 
        adjustDateToLimits(this.pickedDate, this.minDate, this.maxDate);
    }

    const pickedDateValues = this.getDateValues(this.pickedDate);
    const minDateValues = this.getDateValues(this.minDate);
    const maxDateValues = this.getDateValues(this.maxDate);
    let minDay = 1;
    let maxDay = new Date(pickedDateValues.year, pickedDateValues.month, 0).getDate();
    let valueDay = pickedDateValues.day;

    if (
      pickedDateValues.year === minDateValues.year &&
      pickedDateValues.month === minDateValues.month
      ) {
      minDay = minDateValues.day;
    }
    if (
      pickedDateValues.year === maxDateValues.year &&
      pickedDateValues.month === maxDateValues.month
      ) {
      maxDay = maxDateValues.day;
    }

    return (
      <basic-picker
        min={minDay}
        max={maxDay}
        value={valueDay}
        onPickerChange={changeDay}
        buffer={this.pickerBuffer}
      >
      </basic-picker>
    );
  }

  generateHours() {
    const changeHour = (event) => {
      const hour = event.detail;
      this.pickedDate.setHours(hour);

      this.pickedDate = 
        adjustDateToLimits(this.pickedDate, this.minDate, this.maxDate);
    }

    const pickedDateValues = this.getDateValues(this.pickedDate);
    const minDateValues = this.getDateValues(this.minDate);
    const maxDateValues = this.getDateValues(this.maxDate);
    let minHour = 0;
    let maxHour = 23;
    let valueHour = pickedDateValues.hour;

    if (
      pickedDateValues.year === minDateValues.year &&
      pickedDateValues.month === minDateValues.month &&
      pickedDateValues.day === minDateValues.day
      ) {
      minHour = minDateValues.hour;
    }
    if (
      pickedDateValues.year === maxDateValues.year &&
      pickedDateValues.month === maxDateValues.month && 
      pickedDateValues.day === maxDateValues.day
      ) {
      maxHour = maxDateValues.hour;
    }

    return (
      <basic-picker
        min={minHour}
        max={maxHour}
        value={valueHour}
        onPickerChange={changeHour}
        buffer={this.pickerBuffer}
      >
      </basic-picker>
    );
  }

  generateMinutes() {
    const changeMinute = (event) => {
      const minute = event.detail;
      this.pickedDate.setMinutes(minute);

      this.pickedDate = 
        adjustDateToLimits(this.pickedDate, this.minDate, this.maxDate);
    }

    const pickedDateValues = this.getDateValues(this.pickedDate);
    const minDateValues = this.getDateValues(this.minDate);
    const maxDateValues = this.getDateValues(this.maxDate);
    let minMinute = 0;
    let maxMinute = 59;
    let valueMinute = pickedDateValues.minute;

    if (
      pickedDateValues.year === minDateValues.year &&
      pickedDateValues.month === minDateValues.month &&
      pickedDateValues.day === minDateValues.day &&
      pickedDateValues.hour === minDateValues.hour
      ) {
      minMinute = minDateValues.minute;
    }
    if (
      pickedDateValues.year === maxDateValues.year &&
      pickedDateValues.month === maxDateValues.month && 
      pickedDateValues.day === maxDateValues.day &&
      pickedDateValues.hour === maxDateValues.hour
      ) {
      maxMinute = maxDateValues.minute;
    }

    return (
      <basic-picker
        min={minMinute}
        max={maxMinute}
        value={valueMinute}
        onPickerChange={changeMinute}
        buffer={this.pickerBuffer}
      >
      </basic-picker>
    );
  }
  generateSeconds() {
    const changeSecond = (event) => {
      const second = event.detail;
      this.pickedDate.setSeconds(second);

      this.pickedDate = 
        adjustDateToLimits(this.pickedDate, this.minDate, this.maxDate);
    }

    const pickedDateValues = this.getDateValues(this.pickedDate);
    const minDateValues = this.getDateValues(this.minDate);
    const maxDateValues = this.getDateValues(this.maxDate);
    let minSecond = 0;
    let maxSecond = 59;
    let valueSecond = pickedDateValues.second;

    if (
      pickedDateValues.year === minDateValues.year &&
      pickedDateValues.month === minDateValues.month &&
      pickedDateValues.day === minDateValues.day &&
      pickedDateValues.hour === minDateValues.hour &&
      pickedDateValues.minute === minDateValues.minute
      ) {
      minSecond = minDateValues.second;
    }
    if (
      pickedDateValues.year === maxDateValues.year &&
      pickedDateValues.month === maxDateValues.month && 
      pickedDateValues.day === maxDateValues.day &&
      pickedDateValues.hour === maxDateValues.hour &&
      pickedDateValues.minute === maxDateValues.minute
      ) {
      maxSecond = maxDateValues.second;
    }

    return (
      <basic-picker
        min={minSecond}
        max={maxSecond}
        value={valueSecond}
        onPickerChange={changeSecond}
        buffer={this.pickerBuffer}
      >
      </basic-picker>
    );
  }

  getDateValues(date: Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    }
  }

  generatePickers(formatString: string = 'DD/YYYY/MM/DD') {
    const formatArr = splitFormatString(formatString);
    const pickers = [];
    formatArr.forEach((v) => {
      const formatType = convertFormatKeyToType(v);
      if (formatType) {
        const pickerHeader = (
          <div class="datetime-picker-cell-header">
            {formatType}
          </div>
        );
        pickers.push(
          <div class="datetime-picker-cell">
            {this.showHeader ? pickerHeader : null}
            <div class="datetime-picker-cell-body">
              {this.generatePicker(formatType)}
            </div>
          </div>
        );
      }
    })

    return pickers;
  }

  generatePicker(type: FormatType) {
    switch (type) {
      case FormatType.Year:
        return this.generateYears();
      case FormatType.Month:
        return this.generateMonths();
      case FormatType.Day:
        return this.generateDays();
      case FormatType.Hour:
        return this.generateHours();
      case FormatType.Minute:
        return this.generateMinutes();
      case FormatType.Second:
        return this.generateSeconds();
      default:
        return null
    }
  }

  displayDate(formatString: string) {
    const formatArr = splitFormatString(formatString);
    const output = [];
    formatArr.forEach((v) => {
      const formatType = convertFormatKeyToType(v);
      if (formatType) {
        output.push(this.displayDateByFormatType(formatType));
      } else {
        output.push(v);
      }
    })

    return output;
  }

  displayDateByFormatType(type: FormatType) {
    switch (type) {
      case FormatType.Year:
        return leftPad(this.date.getFullYear(), 2);
      case FormatType.Month:
        return leftPad(this.date.getMonth() + 1, 2);
      case FormatType.Day:
        return leftPad(this.date.getDate(), 2);
      case FormatType.Hour:
        return leftPad(this.date.getHours(), 2);
      case FormatType.Minute:
        return leftPad(this.date.getMinutes(), 2);
      case FormatType.Second:
        return leftPad(this.date.getSeconds(), 2);
      default:
        return null
    }
  }

  render() {
    return (
      <Host>
        <div
          class="datetime-display"
          onClick={this.showDatePicker}
        >
          {this.displayDate(this.format)}
        </div>
        <div class="datetime-picker">
          {this.generatePickers(this.format)}
          <div class="datetime-buttons">
            <button 
              class="datetime-button-cancel"
              onClick={this.cancelDatePicker}>Cancel</button>
            <button 
              class="datetime-button-confirm"
              onClick={this.submitDatePicker}>Done</button>
          </div>
        </div>         
      </Host>
    );
  }

}
