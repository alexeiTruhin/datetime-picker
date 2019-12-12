import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'basic-picker',
  styleUrl: 'picker.scss',
  shadow: true
})
export class Picker {
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
  }

  // 'buffer' represents the number of elements to display
  // before and after the value.
  generateRange(buffer: number = 3) {
    let bufferBefore = buffer;
    let bufferAfter = buffer;

    if (this.value - this.min < buffer ) {
      bufferBefore = this.value - this.min;
    }
    if (this.max - this.value < buffer ) {
      bufferAfter = this.max - this.value;
    }

    const arr = [];
    for (let i = 0; i < bufferBefore; i++) {
      arr.push(this.value - bufferBefore + i);
    }
    arr.push(this.value);
    for (let i = 1; i <= bufferAfter; i++) {
      arr.push(this.value + i);
    }
    return arr;
  }

  generateList(buffer: number = 3) {
    const listItems = this.generateRange(buffer).map((n) => {
      return <li value={n}>{n}</li>
    })

    return (
      <ul>
        {listItems}
      </ul>
    )
  }

  render() {
    const list = this.generateList();
    return (
      <Host>
        {list}
      </Host>
    );
  }

}
