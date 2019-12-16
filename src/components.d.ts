/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface BasicDatetime {
    /**
    * Expose current date outside the component.
    */
    'date': Date;
    /**
    * Display format of the date. Available variables:    YYYY - for year    MM - for month    DD - for day    HH - for hour    mm - for minute    ss - for second
    */
    'format': string;
    /**
    * The maximum date that should be a valid argument for Date.parse().
    */
    'max': string;
    /**
    * The minimum date that should be a valid argument for Date.parse(). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
    */
    'min': string;
    /**
    * Number of visible values in a picker before and after the current value.
    */
    'pickerBuffer': number;
    /**
    * Show or hide header for each picker column.
    */
    'showHeader': boolean;
    /**
    * The initial value date that should be a valid argument for Date.parse().
    */
    'value': string;
  }
  interface BasicPicker {
    /**
    * Number of visible values in picker before and after the current value
    */
    'buffer': number;
    /**
    * The maximum value;
    */
    'max': number;
    /**
    * The minimum value;
    */
    'min': number;
    /**
    * Minimum length of a number. If the number is shorter, it will be prefixed by 0's.
    */
    'minDigits': number;
    /**
    * The initial value;
    */
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
    /**
    * Expose current date outside the component.
    */
    'date'?: Date;
    /**
    * Display format of the date. Available variables:    YYYY - for year    MM - for month    DD - for day    HH - for hour    mm - for minute    ss - for second
    */
    'format'?: string;
    /**
    * The maximum date that should be a valid argument for Date.parse().
    */
    'max'?: string;
    /**
    * The minimum date that should be a valid argument for Date.parse(). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
    */
    'min'?: string;
    /**
    * Fires every time the date was changed. Emits the new date as Date object.
    */
    'onDateChange'?: (event: CustomEvent<any>) => void;
    /**
    * Number of visible values in a picker before and after the current value.
    */
    'pickerBuffer'?: number;
    /**
    * Show or hide header for each picker column.
    */
    'showHeader'?: boolean;
    /**
    * The initial value date that should be a valid argument for Date.parse().
    */
    'value'?: string;
  }
  interface BasicPicker {
    /**
    * Number of visible values in picker before and after the current value
    */
    'buffer'?: number;
    /**
    * The maximum value;
    */
    'max'?: number;
    /**
    * The minimum value;
    */
    'min'?: number;
    /**
    * Minimum length of a number. If the number is shorter, it will be prefixed by 0's.
    */
    'minDigits'?: number;
    /**
    * Fires every time the value was changed. Emits the new value.
    */
    'onPickerChange'?: (event: CustomEvent<any>) => void;
    /**
    * The initial value;
    */
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


