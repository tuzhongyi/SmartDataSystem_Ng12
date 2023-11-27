import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[input-trim]',
})
export class InputTrimDirective {
  constructor(e: ElementRef, private control: NgControl) {}

  @HostListener('keyup', ['$event', '$event.target'])
  keyup(evt: Event, target: any) {
    if (target.value && this.control.control) {
      this.control.control.setValue(target.value.trim());
    }
  }

  @HostListener('input', ['$event', '$event.target'])
  input(evt: Event, target: any) {
    if (target.value && this.control.control) {
      this.control.control.setValue(target.value.trim());
    }
  }
}
