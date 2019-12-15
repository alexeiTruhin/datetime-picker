/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface BasicDatetime {
    'format': string;
    'max': string;
    'min': string;
    'pickerBuffer': number;
    'showHeader': boolean;
    'value': string;
  }
  interface BasicPicker {
    'buffer': number;
    'max': number;
    'min': number;
    'minDigits': number;
    'value': number;
  }
}

declare global {


  interface HTMLBasicDatetimeElement extends Components.BasicDatetime, HTMLStencilElement {}
  var HTMLBasicDatetimeElement: {
    prototype: HTMLBasicDatetimeElement;
    new (): HTMLBasicDatetimeElement;
  };

  interface HTMLBasicPickerElement extends Components.BasicPicker, HTMLStencilElement {}
  var HTMLBasicPickerElement: {
    prototype: HTMLBasicPickerElement;
    new (): HTMLBasicPickerElement;
  };
  interface HTMLElementTagNameMap {
    'basic-datetime': HTMLBasicDatetimeElement;
    'basic-picker': HTMLBasicPickerElement;
  }
}

declare namespace LocalJSX {
  interface BasicDatetime {
    'format'?: string;
    'max'?: string;
    'min'?: string;
    'onDateChange'?: (event: CustomEvent<any>) => void;
    'pickerBuffer'?: number;
    'showHeader'?: boolean;
    'value'?: string;
  }
  interface BasicPicker {
    'buffer'?: number;
    'max'?: number;
    'min'?: number;
    'minDigits'?: number;
    'onPickerChange'?: (event: CustomEvent<any>) => void;
    'value'?: number;
  }

  interface IntrinsicElements {
    'basic-datetime': BasicDatetime;
    'basic-picker': BasicPicker;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'basic-datetime': LocalJSX.BasicDatetime & JSXBase.HTMLAttributes<HTMLBasicDatetimeElement>;
      'basic-picker': LocalJSX.BasicPicker & JSXBase.HTMLAttributes<HTMLBasicPickerElement>;
    }
  }
}


