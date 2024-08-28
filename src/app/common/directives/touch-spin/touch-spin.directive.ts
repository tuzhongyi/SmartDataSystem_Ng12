import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { HowellTouchSpinOptions } from './touch-spin.class';

@Directive({
  selector: '[appTouchSpin]',
})
export class TouchSpinDirective implements AfterViewInit, AfterViewChecked {
  @Input() unit?: string;

  private _options: TouchSpinOptions = new HowellTouchSpinOptions();
  public get options(): TouchSpinOptions {
    return this._options;
  }
  @Input() public set options(v: TouchSpinOptions) {
    this._options = Object.assign(this._options, v);
  }

  public get min(): number | undefined {
    return this.options.min;
  }
  @Input() public set min(v: number | undefined) {
    this.options.min = v;
  }

  public get max(): number | undefined {
    return this.options.max;
  }
  @Input() public set max(v: number | undefined) {
    this.options.max = v;
  }
  public get verticalbuttons(): boolean | undefined {
    return this.options.verticalbuttons;
  }
  @Input() public set verticalbuttons(v: boolean | undefined) {
    this.options.verticalbuttons = v;
  }

  @Output() touchSpinChange = new EventEmitter();

  @Input() number?: number = 1;
  @Output() numberChange: EventEmitter<number> = new EventEmitter();

  constructor(private ele: ElementRef<HTMLInputElement>) {}
  ngAfterViewChecked(): void {
    if (this.unit) {
      let index = this.ele.nativeElement.value.indexOf(this.unit);
      if (index < 0) {
        this.ele.nativeElement.value = this.ele.nativeElement.value + this.unit;
      }
    }
  }
  ngAfterViewInit(): void {
    $(this.ele.nativeElement)
      .TouchSpin(this.options)
      .on('change', (e) => {
        let value = this.ele.nativeElement.value;
        if (this.unit) {
          let index = value.indexOf(this.unit);
          if (index >= 0) {
            value = value.substring(0, index);
          }
        }
        this.touchSpinChange.emit(value);
        this.numberChange.emit(parseInt(value));
      });

    $(this.ele.nativeElement).val(this.number ?? 1);
  }
}
