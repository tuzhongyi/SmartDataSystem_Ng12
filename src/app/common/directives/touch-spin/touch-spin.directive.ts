import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { HowellTouchSpinOptions } from './touch-spin.class';

@Directive({
  selector: '[appTouchSpin]',

})
export class TouchSpinDirective implements AfterViewInit {

  @Input() options: TouchSpinOptions = new HowellTouchSpinOptions();

  @Output() touchSpinChange = new EventEmitter();

  constructor(private _ele: ElementRef<HTMLInputElement>) {

  }
  ngAfterViewInit(): void {
    $(this._ele.nativeElement).TouchSpin(this.options).on('change', (e) => {
      this.touchSpinChange.emit(this._ele.nativeElement.value)
    })
  }

}
