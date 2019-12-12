import { Component, Host, h, State, Listen, Element, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'basic-datetime',
  styleUrl: 'datetime.scss',
  shadow: true
})
export class Datetime {
  minDate = new Date('1970');
  maxDate = new Date();
  selectorDate: Date;

  @Element() el: HTMLElement;

  @State() date: Date = new Date();

  @Prop() min: string;
  @Prop() max: string;

  @Event() change: EventEmitter;

  componentWillLoad() {
    let minDate = this.minDate;
    let maxDate = this.maxDate;

    if (this.min) minDate = new Date(this.min);
    if (this.max) maxDate = new Date(this.max);

    if (maxDate.getTime() < minDate.getTime()) {
      console.error('max date is smaller then min date');
    } else {
      this.minDate = minDate;
      this.maxDate = maxDate;
      if (this.date.getTime() > this.maxDate.getTime()) {
        this.date = new Date(this.maxDate.getTime());
      }
      if (this.date.getTime() < this.minDate.getTime()) {
        this.date = new Date(this.minDate.getTime());
      }
    }
  }

  @Listen('click', { capture: true })
  handleClick() {
    this.showSelector();
  }

  private get selector() {
    const selector:HTMLElement = this.el.shadowRoot.querySelector('.datetime-selector');
    return selector;
  }

  showSelector = () => {
    this.selector.style.display='block';
    this.selectorDate = new Date(this.date.getTime());
  }

  hideSelector = () => {
    this.selector.style.display='none';
  }

  submitSelector = () => {
    this.hideSelector();
    this.date = new Date(this.selectorDate.getTime());
    // TODO 
  }

  cancelSelector = () => {
    this.hideSelector();
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
      this.hideSelector();
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
        <div class="datetime-selector">
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
            <button onClick={this.cancelSelector}>Cancel</button>
            <button onClick={this.submitSelector}>Done</button>
          </div>
        </div>
      </Host>);

  }

}
