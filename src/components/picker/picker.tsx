import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { throttle, leftPad } from '../../utils/utils';

@Component({
  tag: 'basic-picker',
  styleUrl: 'picker.scss',
  shadow: true
})
export class Picker {
  onWheelThrottled;
  onPointeMoveThrottled;
  pointer = {
    start: null
  };

  @State() list: HTMLElement;
  @State() pickedValue: number;

  /**
   * The minimum value;
   */
  @Prop() min: number;

  /**
   * The maximum value;
   */
  @Prop() max: number;

  /**
   * The initial value;
   */
  @Prop() value: number;

  /**
   * Minimum length of a number.
   * If the number is shorter, it will be prefixed by 0's.
   */
  @Prop() minDigits: number = 2;

  /**
   * Number of visible values in picker before and after the current value
   */
  @Prop() buffer: number = 3;

  /**
   * Fires every time the value was changed.
   * Emits the new value.
   */
  @Event() pickerChange: EventEmitter;

  componentWillLoad() {
    this.initProperties();

    this.onWheelThrottled = throttle(this.onWheel, 50);
    this.onPointeMoveThrottled = throttle(this.onPointerMove, 50);

    document.addEventListener('pointerup', this.onPointerUp);
    document.addEventListener('pointermove', this.onPointeMoveThrottled);
  }

  componentDidUpdate() {
    this.initProperties();
  }

  componentDidUnload() {
    document.removeEventListener('pointerup', this.onPointerUp);
    document.removeEventListener('pointermove', this.onPointeMoveThrottled);
  }

  initProperties() {
    if (this.max < this.min) {
      console.error('"max" property is smaller than "min" property. Values were swapped.');
      const temp = this.max;
      this.max = this.min;
      this.min = temp;
    }
    if (this.value > this.max) {
      console.error('"value" property is bigger than "max" property. "value" was set to "max" property.');
      this.value = this.max;
    }
    if (this.value < this.min) {
      console.error('"value" property is smaller than "min" property. "value" was set to "min" property.');
      this.value = this.max;
    }

    this.pickedValue = this.value;
  }

  incrementPickedValue() {
    if (this.pickedValue < this.max) {
      this.pickedValue += 1;
      this.pickerChange.emit(this.pickedValue);
    }
  }

  decrementPickedValue() {
    if (this.pickedValue > this.min) {
      this.pickedValue -= 1;
      this.pickerChange.emit(this.pickedValue);
    }
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
      let value = n;
      let output = leftPad(n, this.minDigits);
      if (n !== null) {
        className.push('item');
        if (n === this.pickedValue) {
          className.push('picked');
        }
      } else {
        className.push('empty');
        output = null;
      }
      return <li value={value} class={className.join(' ')}>{output}</li>
    });

    return listItems;
  }

  onWheel = (event) => {
    event.preventDefault();

    if (event.deltaY < 0 && this.pickedValue > this.min) {
      this.decrementPickedValue();
    } else if (event.deltaY > 0 && this.pickedValue < this.max) {
      this.incrementPickedValue();
    }
  }

  onClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target;

    if (target.nodeName === 'LI' && !target.classList.contains('empty')) {
      this.pickedValue = target.value;
      this.pickerChange.emit(this.pickedValue);
    }
  }

  onPointerDown = (event) => {
    event.preventDefault();
    this.pointer.start = event.pageY;
  }

  onPointerMove = (event) => {
    event.preventDefault();
    
    if (this.pointer.start !== null && event.pageY !== this.pointer.start) {
      if (event.pageY > this.pointer.start && this.pickedValue > this.min) {
        this.decrementPickedValue();
      } else if (event.pageY < this.pointer.start && this.pickedValue < this.max) {
        this.incrementPickedValue();
      }
      this.pointer.start = event.pageY
    }
  }

  onPointerUp = (event) => {
    event.preventDefault();
    this.pointer.start = null;
  }  

  render() {
    const listItems = this.generateListItems(this.buffer);
    return (
      <Host>
        <ul 
          onWheel={this.onWheelThrottled}
          onClick={this.onClick}
          onPointerDown={this.onPointerDown}
        >
          {listItems}
        </ul>
      </Host>
    );
  }

}
