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

  @Input()
  beginTime?: TimeModel;

  @Input()
  endTime?: TimeModel;

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
        return !!this.hour;
      },
      () => {
        this.wheel(this.hour!.nativeElement);
      }
    );
    wait(
      () => {
        return !!this.minute;
      },
      () => {
        this.wheel(this.minute!.nativeElement);
      }
    );
    wait(
      () => {
        return !!this.second;
      },
      () => {
        this.wheel(this.second!.nativeElement);
      }
    );
  }

  ngOnInit(): void {}

  wheel(element: HTMLInputElement) {
    $(element).each((index: number, element: HTMLElement) => {
      if (!element.onwheel) {
        element.onwheel = (event: any) => {
          event.preventDefault();
          let input = event.currentTarget as HTMLInputElement;
          let $this = $(event.currentTarget);
          let $inc = parseFloat($this.attr('step'));
          let $max = parseFloat($this.attr('max'));
          let $min = parseFloat($this.attr('min'));
          let $currVal = parseFloat($this.val());
          let { hour, minute, second } = this.time;

          if (this.endTime) {
            // 如果是开始时间组件,max不能超过结束时间
            if (Array.from(input.classList).includes('hour')) {
              $max = this.endTime.hour.value;
            }
            if (
              Array.from(input.classList).includes('minute') &&
              hour.value == this.endTime.hour.value
            ) {
              $max = this.endTime.minute.value;
            }
            if (
              Array.from(input.classList).includes('second') &&
              hour.value == this.endTime.hour.value &&
              minute.value == this.endTime.minute.value
            ) {
              $max = this.endTime.second.value;
            }
          } else if (this.beginTime) {
            // 如果是结束时间组件,min不能小于开始时间
            if (Array.from(input.classList).includes('hour')) {
              $min = this.beginTime.hour.value;
            }
            if (
              Array.from(input.classList).includes('minute') &&
              hour.value == this.beginTime.hour.value
            ) {
              $min = this.beginTime.minute.value;
            }
            if (
              Array.from(input.classList).includes('second') &&
              hour.value == this.beginTime.hour.value &&
              minute.value == this.beginTime.minute.value
            ) {
              $min = this.beginTime.second.value;
            }
          }

          // If blank, assume value of 0
          if (isNaN($currVal)) {
            $currVal = 0.0;
          }
          let value = $min;

          // Increment or decrement numeric based on scroll distance
          if (event.deltaY > 0) {
            if ($currVal + $inc <= $max) {
              value = $currVal + $inc;
            }
          } else {
            if ($currVal - $inc >= $min) {
              value = $currVal - $inc;
            } else {
              // 零时刻回退
              value = $max;
            }
          }
          let view = TimeControlComponent.format(value);
          // $this.val(view);

          let array = ['hour', 'minute', 'second'];

          for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (input.classList.contains(array[i])) {
              this.time[array[i]].value = value;
              this.time[array[i]].view = view;
              break;
            }
          }

          if (this.endTime) {
            if (Array.from(input.classList).includes('hour')) {
              //当前hour的值小于结束时间时，分钟和秒是无限制的，但等于结束时间时需要校准，不得超过结束时间
              if (value == this.endTime.hour.value) {
                minute.value =
                  minute.value > this.endTime.minute.value
                    ? this.endTime.minute.value
                    : minute.value;
                second.value =
                  second.value > this.endTime.second.value
                    ? this.endTime.second.value
                    : second.value;
                let mview = TimeControlComponent.format(minute.value);
                let sview = TimeControlComponent.format(second.value);
                minute.view = mview;
                second.view = sview;
              }
            }
            if (
              Array.from(input.classList).includes('minute') &&
              hour.value == this.endTime.hour.value
            ) {
              if (value == this.endTime.minute.value) {
                second.value =
                  second.value > this.endTime.second.value
                    ? this.endTime.second.value
                    : second.value;
                let sview = TimeControlComponent.format(second.value);
                second.view = sview;
              }
            }
          } else if (this.beginTime) {
            if (Array.from(input.classList).includes('hour')) {
              //当前hour的值大于开始时间时，分钟和秒是无限制的，但等于开始时间时需要校准，不得小于开始时间
              if (value == this.beginTime.hour.value) {
                minute.value =
                  minute.value < this.beginTime.minute.value
                    ? this.beginTime.minute.value
                    : minute.value;
                second.value =
                  second.value < this.beginTime.second.value
                    ? this.beginTime.second.value
                    : second.value;
                let mview = TimeControlComponent.format(minute.value);
                let sview = TimeControlComponent.format(second.value);
                minute.view = mview;
                second.view = sview;
              }
            }
            if (
              Array.from(input.classList).includes('minute') &&
              hour.value == this.beginTime.hour.value
            ) {
              if (value == this.beginTime.minute.value) {
                second.value =
                  second.value < this.beginTime.second.value
                    ? this.beginTime.second.value
                    : second.value;
                let sview = TimeControlComponent.format(second.value);
                second.view = sview;
              }
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

  private static format(num: number) {
    if (num < 10) {
      return `0${num}`;
    }
    return num.toString();
  }
}
