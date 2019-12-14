import { Component, Host, h, State, Listen, Element, Event, EventEmitter, Prop } from '@stencil/core';
import { adjustDateToLimits } from '../../utils/utils';

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

  @Event() change: EventEmitter;

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
    this.pickedDate = new Date(this.date.getTime());
  }

  private get datePicker() {
    const datePicker:HTMLElement = this.el.shadowRoot.querySelector('.datetime-picker');
    return datePicker;
  }

  showDatePicker = () => {
    this.datePicker.style.display='block';
    this.pickedDate = new Date(this.date.getTime());
  }

  hideDatePicker = () => {
    this.datePicker.style.display='none';
  }

  submitDatePicker = () => {
    this.hideDatePicker();
    this.date = new Date(this.pickedDate.getTime());
    // TODO 
  }

  cancelDatePicker = () => {
    this.hideDatePicker();
    // TODO
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

    console.log(valueDay);

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

  render() {
    return (
      <Host>
        <div
          onClick={this.showDatePicker}
        >
          {this.date.toLocaleDateString()}
        </div>
        <div class="datetime-picker">
          <ul>
            { this.generateYears() }
          </ul>
          <ul>
            { this.generateMonths() }
          </ul>
          <ul>
            { this.generateDays() }
          </ul>
          <div>
            <button onClick={this.cancelDatePicker}>Cancel</button>
            <button onClick={this.submitDatePicker}>Done</button>
          </div>
        </div>         
      </Host>
    );
  }

}
