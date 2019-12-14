import { Component, Host, h, State, Listen, Element, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'basic-datetime',
  styleUrl: 'datetime.scss',
  shadow: true
})
export class Datetime {
  minDate: Date;
  maxDate: Date;

  pickedDate: Date;

  @Element() el: HTMLElement;

  @State() date: Date;

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

  generateYears() {
    return (
      <basic-picker
        min={this.minDate.getFullYear()}
        max={this.maxDate.getFullYear()}
        value={this.date.getFullYear()}
      >
      </basic-picker>
    );
  }

  generateMonths() {
    return (
      <basic-picker
        min={1}
        max={12}
        value={this.date.getMonth() + 1}
      >
      </basic-picker>
    );
  }

  generateDays() {
    return (
      <basic-picker
        min={1}
        max={31}
        value={this.date.getDate()}
      >
      </basic-picker>
    );
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
