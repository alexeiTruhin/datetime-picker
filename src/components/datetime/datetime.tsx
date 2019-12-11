import { Component, Host, h, State, Listen } from '@stencil/core';

@Component({
  tag: 'basic-datetime',
  styleUrl: 'datetime.css',
  shadow: true
})
export class Datetime {
  @State() date = new Date();

  @Listen('click', { capture: true })
  handleClick() {
    this.date = new Date(2019,10,10);
  }


  render() {
    return (
      <Host>
        <div>{this.date.toLocaleDateString()}</div>
      </Host>);

  }

}
