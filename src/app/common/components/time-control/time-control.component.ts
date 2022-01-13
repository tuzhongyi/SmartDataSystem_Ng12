import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { wait } from '../../tools/tool';
import { TimeModel } from './time-control.model';

declare let $: any;

@Component({
  selector: 'app-time-control',
  templateUrl: './time-control.component.html',
  styleUrls: ['./time-control.component.less'],
})
export class TimeControlComponent implements OnInit, AfterViewInit {
  @Input()
  time: TimeModel = new TimeModel();

  @ViewChild('hour')
  hour?: ElementRef;

  @ViewChild('minute')
  minute?: ElementRef;

  @ViewChild('second')
  second?: ElementRef;

  constructor() {}
  ngAfterViewInit(): void {
    wait(
      () => {
        return !!(this.hour && this.minute && this.second);
      },
      () => {
        this.wheel();
      }
    );
  }

  ngOnInit(): void {}

  wheel() {
    $('.time-control.time').each(function (
      index: number,
      element: HTMLElement
    ) {
      if (!element.onwheel) {
        element.onwheel = function (this: any, event: any) {
          event.preventDefault();

          let $this = $(this);
          let $inc = parseFloat($this.attr('step'));
          let $max = parseFloat($this.attr('max'));
          let $min = parseFloat($this.attr('min'));
          let $currVal = parseFloat($this.val());

          // If blank, assume value of 0
          if (isNaN($currVal)) {
            $currVal = 0.0;
          }

          // Increment or decrement numeric based on scroll distance
          if (event.deltaY > 0) {
            if ($currVal + $inc <= $max) {
              $this.val(TimeModel.format($currVal + $inc));
            }
          } else {
            if ($currVal - $inc >= $min) {
              $this.val(TimeModel.format($currVal - $inc));
            }
          }
        };
      }
    });
  }

  oninput(e: Event) {
    if (e.target) {
      let value = (e.target as HTMLInputElement).value;
      let int = parseInt(value);
      (e.target as HTMLInputElement).value = TimeModel.format(int);
    }
  }
}
