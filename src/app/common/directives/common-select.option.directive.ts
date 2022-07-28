import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: 'common-option]'
})
export class CommonOptionDirective {
  @Input()
  set commonValue(value: any) {

  }

  constructor(private _el: ElementRef) {
    console.log('sdf')
  }

}