
/// <reference types="jquery"/>

interface JQueryStatic {
  confirm(options: confirmOptions): void;

}

interface confirmOptions {
  // text: string;
  // title: string;
  // confirm: Function;
  // cancel: Function;
  // confirmButton: string;
  // cancelButton: string;
  // post: boolean;
  // submitForm: boolean;
  // confirmButtonClass: string;
  // cancelButtonClass: string;
  // dialogClass: string;
  [key: string]: any
}
