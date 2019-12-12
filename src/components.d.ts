/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface BasicDatetime {
    'max': string;
    'min': string;
  }
}

declare global {


  interface HTMLBasicDatetimeElement extends Components.BasicDatetime, HTMLStencilElement {}
  var HTMLBasicDatetimeElement: {
    prototype: HTMLBasicDatetimeElement;
    new (): HTMLBasicDatetimeElement;
  };
  interface HTMLElementTagNameMap {
    'basic-datetime': HTMLBasicDatetimeElement;
  }
}

declare namespace LocalJSX {
  interface BasicDatetime {
    'max'?: string;
    'min'?: string;
    'onChange'?: (event: CustomEvent<any>) => void;
  }

  interface IntrinsicElements {
    'basic-datetime': BasicDatetime;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'basic-datetime': LocalJSX.BasicDatetime & JSXBase.HTMLAttributes<HTMLBasicDatetimeElement>;
    }
  }
}


