import {
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
export class TouchSpinDirective implements AfterViewInit {
  private _options: TouchSpinOptions = new HowellTouchSpinOptions();
  public get options(): TouchSpinOptions {
    return this._options;
  }
  @Input()
  public set options(v: TouchSpinOptions) {
    this._options = Object.assign(this._options, v);
  }

  public get min(): number | undefined {
    return this.options.min;
  }
  @Input()
  public set min(v: number | undefined) {
    this.options.min = v;
  }

  public get max(): number | undefined {
    return this.options.max;
  }
  @Input()
  public set max(v: number | undefined) {
    this.options.max = v;
  }
  public get verticalbuttons(): boolean | undefined {
    return this.options.verticalbuttons;
  }
  @Input()
  public set verticalbuttons(v: boolean | undefined) {
    this.options.verticalbuttons = v;
  }

  @Output() touchSpinChange = new EventEmitter();

  @Input()
  number?: number = 1;
  @Output()
  numberChange: EventEmitter<number> = new EventEmitter();

  constructor(private ele: ElementRef<HTMLInputElement>) {}
  ngAfterViewInit(): void {
    $(this.ele.nativeElement)
      .TouchSpin(this.options)
      .on('change', (e) => {
        this.touchSpinChange.emit(this.ele.nativeElement.value);
        this.numberChange.emit(parseInt(this.ele.nativeElement.value));
      });

    $(this.ele.nativeElement).val(this.number ?? 1);
  }
}
