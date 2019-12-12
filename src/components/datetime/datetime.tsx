import { Component, Host, h, State, Listen, Element, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'basic-datetime',
  styleUrl: 'datetime.scss',
  shadow: true
})
export class Datetime {
  @Element() el: HTMLElement;

  @Event() change: EventEmitter;

  @State() date = new Date();

  @Listen('click', { capture: true })
  handleClick() {
    console.log(this.el.shadowRoot.querySelector('.datetime-selector'));
    this.datetimeSelector.style.display='block';
  }

  private get datetimeSelector() {
    let datetimeSelector:HTMLElement = this.el.shadowRoot.querySelector('.datetime-selector');
    return datetimeSelector;
  }

  generateRange(start = 2000) {
    return [...Array(10).keys()].map((n) => start + n);
  }

  generateYears() {
    const handleClick = (e) => {
      const target = e.target;
      console.log('year clicked' , target.value);
      this.date.setFullYear(target.value);
      this.date = new Date(this.date.getTime());
      console.log(this.date);
      this.datetimeSelector.style.display='none';
    }

    let numb = 12;

    return this.generateRange(2000).map((n) => <li onClick={ handleClick } value={n}>{n}</li>);
  }

  generateMonths() {
    return this.generateRange(1).map((n) => <li>{n}</li>);
  }

  generateDays() {
    return this.generateRange(1).map((n) => <li>{n}</li>);
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
            { this.generateRange(1).map((n) => <li>{n}</li>) }
          </ul>
          <ul>
            { this.generateRange(1).map((n) => <li>{n}</li>) }
          </ul>
        </div>
      </Host>);

  }

}
