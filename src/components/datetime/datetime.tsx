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
      console.error('"max" date is smaller then "min" date. Values were swapped.');
      const temp = maxDate;
      maxDate = minDate;
      minDate = temp;
    } 
    if (date.getTime() > maxDate.getTime()) {
      console.error('"value" date is bigger then "max" date. "value" date was set equal to the "max" date.');
      date = new Date(maxDate.getTime());
    } 
    if (date.getTime() < minDate.getTime()) {
      console.error('"value" date is samller then "min" date. "value" date was set equal to the "min" date.');
      date = new Date(minDate.getTime());
    } 

    this.minDate = minDate;
    this.maxDate = maxDate;
    this.date = date;
  }

  @Listen('click', { capture: true })
  handleClick() {
    this.showDatePicker();
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

  generateRange(start, end) {
    const arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  }

  generateYears() {
    const handleClick = (e) => {
      const target = e.target;
      this.date.setFullYear(target.value);
      this.date = new Date(this.date.getTime());
      this.hideDatePicker();
    }

    const start = this.minDate.getFullYear();
    const end = this.maxDate.getFullYear();
    return this.generateRange(start, end).map((n) => {
      return <li onClick={ handleClick } value={n}>{n}</li>
    });
  }

  generateMonths() {
    const start = this.minDate.getFullYear();
    const end = this.maxDate.getFullYear();
    return this.generateRange(1, 12).map((n) => {
      return <li value={n}>{n}</li>
    });
  }

  generateDays() {
    const start = this.minDate.getFullYear();
    const end = this.maxDate.getFullYear();
    return this.generateRange(1, 31).map((n) => {
      return <li value={n}>{n}</li>
    });
  }

  render() {
    return (
      <Host>
        <div>{this.date.toLocaleDateString()}</div>
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
      </Host>);

  }

}
