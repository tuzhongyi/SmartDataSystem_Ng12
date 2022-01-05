declare interface JQuery<TElement = HTMLElement> {
  datetimepicker: datetimepicker;
}
declare interface datetimepicker {
  [key: string]: any;
  (a: any): datetimepicker;
  dates: any;
}

declare module '*.js';
