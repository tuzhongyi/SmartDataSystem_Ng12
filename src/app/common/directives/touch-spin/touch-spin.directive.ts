import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HowellTouchSpinOptions } from './touch-spin.class';

@Directive({
  selector: '[appTouchSpin]',
})
export class TouchSpinDirective implements AfterViewInit, OnChanges {
  private _options: TouchSpinOptions = new HowellTouchSpinOptions();
  public get options(): TouchSpinOptions {
    return this._options;
  }
  @Input()
  public set options(v: TouchSpinOptions) {
    this._options = Object.assign(this._options, v);
  }

  @Input()
  min: number = 1;
  @Input()
  max: number = 65535;
  @Input()
  verticalbuttons: boolean = true;

  @Output() touchSpinChange = new EventEmitter();

  @Input()
  number?: number = 1;
  @Output()
  numberChange: EventEmitter<number> = new EventEmitter();

  constructor(private ele: ElementRef<HTMLInputElement>) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.min) {
      this.options.min = this.min;
    }
    if (changes.max) {
      this.options.max = this.max;
    }
    if (changes.verticalbuttons) {
      this.options.verticalbuttons = this.verticalbuttons;
    }
  }
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
