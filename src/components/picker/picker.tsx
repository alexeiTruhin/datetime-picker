import { Component, Host, h, Prop, State } from '@stencil/core';
import { throttle } from '../../utils/utils';

@Component({
  tag: 'basic-picker',
  styleUrl: 'picker.scss',
  shadow: true
})
export class Picker {
  onWheelThrottled: Function;
  @State() list: HTMLElement;
  @State() pickedValue: number;

  @Prop() min: number;
  @Prop() max: number;
  @Prop() value: number;

  componentWillLoad() {
    if (this.max < this.min) {
      console.error('"max" property is smaller then "min" property. Values were swapped.');
      const temp = this.max;
      this.max = this.min;
      this.min = temp;
    }
    if (this.value > this.max) {
      console.error('"value" property is bigger then "max" property. "value" was set to "max" property.');
      this.value = this.max;
    }
    if (this.value < this.min) {
      console.error('"value" property is smaller then "min" property. "value" was set to "min" property.');
      this.value = this.max;
    }

    this.pickedValue = this.value;

    this.onWheelThrottled = throttle(this.onWheel, 100);
  }

  // 'buffer' represents the number of elements to display
  // before and after the value.
  generateRange(buffer: number = 3) {
    let bufferBefore = buffer;
    let bufferAfter = buffer;
    const nullsBefore = [];
    const nullsAfter = [];

    if (this.pickedValue - this.min < buffer ) {
      bufferBefore = this.pickedValue - this.min;
      for (let i = 0; i < buffer - bufferBefore; i++) {
        nullsBefore.push(null);
      }
    }
    if (this.max - this.pickedValue < buffer ) {
      bufferAfter = this.max - this.pickedValue;
      for (let i = 0; i < buffer - bufferAfter; i++) {
        nullsAfter.push(null);
      }
    }

    let arr = [...nullsBefore];
    for (let i = 0; i < bufferBefore; i++) {
      arr.push(this.pickedValue - bufferBefore + i);
    }
    arr.push(this.pickedValue);
    for (let i = 1; i <= bufferAfter; i++) {
      arr.push(this.pickedValue + i);
    }
    arr = [...arr, ...nullsAfter];
    return arr;
  }

  generateListItems(buffer: number = 3) {
    const listItems = this.generateRange(buffer).map((n) => {
      const className = [];
      if (n !== null) {
        className.push('item');
        if (n === this.pickedValue) {
          className.push('picked');
        }
      } else {
        className.push('empty');
      }
      return <li value={n} class={className.join(' ')}>{n}</li>
    });

    return listItems;
  }

  onWheel = (event) => {
    event.preventDefault();

    if (event.deltaY < 0 && this.pickedValue > this.min) {
        this.pickedValue -= 1;
    } else if (event.deltaY > 0 && this.pickedValue < this.max) {
      this.pickedValue += 1;
    }
  }

  onClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target;

    if (target.nodeName === 'LI' && target.value) {
      this.pickedValue = target.value;
    }
  }

  onScroll = (event) => {
    event.preventDefault();
  }

  render() {
    const listItems = this.generateListItems();
    return (
      <Host>
        <ul 
          onWheel={this.onWheelThrottled}
          onClick={this.onClick}
        >
          {listItems}
        </ul>
      </Host>
    );
  }

}
