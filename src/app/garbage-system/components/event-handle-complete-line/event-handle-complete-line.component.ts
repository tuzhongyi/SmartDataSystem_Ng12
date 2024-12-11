import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { timer } from 'rxjs';
import { IEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-event-record.model';
import { EventHandleCompleteLineBusiness } from './event-handle-complete-line.business';
import { EventHandleCompleteLineOptions } from './event-handle-complete-line.option';

@Component({
  selector: 'event-handle-complete-line',
  templateUrl: './event-handle-complete-line.component.html',
  styleUrls: ['./event-handle-complete-line.component.less'],
  providers: [EventHandleCompleteLineBusiness],
})
export class EventHandleCompleteLineComponent implements OnInit, AfterViewInit {
  @Input() data?: IEventRecord;
  @Input('load') _load?: EventEmitter<IEventRecord>;
  constructor(private business: EventHandleCompleteLineBusiness) {}

  @ViewChild('echarts')
  private element?: ElementRef<HTMLDivElement>;
  private option: EChartsOption = EventHandleCompleteLineOptions;
  private echarts?: echarts.ECharts;

  ngOnInit(): void {
    if (this._load) {
      this._load.subscribe((data) => {
        this.load(data);
      });
    }
  }

  ngAfterViewInit(): void {
    timer(10).subscribe(() => {
      if (this.element) {
        this.echarts = echarts.init(this.element.nativeElement);
        if (this.data) {
          this.load(this.data);
        }
      }
    });
  }

  private load(data: IEventRecord) {
    let models = this.business.load(data);
    let serie = (this.option.series as any)[0];
    let visual = this.option.visualMap as any;
    let count = 0;
    models.forEach((model) => {
      if (model.name) {
        count++;
      }
    });

    visual.pieces[0].lte = count - 1;
    serie.data = [...models];
    if (this.echarts) {
      this.echarts.setOption(this.option);
    }
  }
}
