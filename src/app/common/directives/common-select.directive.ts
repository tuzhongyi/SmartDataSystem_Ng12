import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: 'common-select'
})
export class CommonSelectDirective {
  @Input()
  set commonValue(value: any) {

  }

  constructor(private _el: ElementRef) {
    console.log('sdf')
  }

}