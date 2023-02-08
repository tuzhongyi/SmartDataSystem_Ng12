import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { option } from './line-zoom-chart.option';
import * as echarts from 'echarts/core';
import { wait } from 'src/app/common/tools/tool';
import { formatDate } from '@angular/common';
import {
  LineZoomChartModel,
  LineZoomLinePanel,
  LineZoomScatterPanel,
  TimeString,
} from './line-zoom-chart.model';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { LineZoomChartBusiness } from './line-zoom-chart.business';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { count } from 'console';
import { GarbageDropDurationPanelModel } from '../../panels/garbage-drop-duration-panel/garbage-drop-duration-panel.model';
import { Language } from 'src/app/common/tools/language';
import {
  ImageControlModel,
  ImageControlModelArray,
} from '../../../../view-model/image-control.model';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
@Component({
  selector: 'howell-line-zoom-chart',
  templateUrl: './line-zoom-chart.component.html',
  styleUrls: ['./line-zoom-chart.component.less'],
  providers: [LineZoomChartBusiness],
})
export class LineZoomChartComponent
  implements OnChanges, AfterViewInit, IComponent<IModel, LineZoomChartModel>
{
  @Input()
  stationId?: string;
  @Input()
  date: Date = new Date();
  @Input()
  unit: TimeUnit = TimeUnit.Hour;
  @Input()
  business: IBusiness<IModel, LineZoomChartModel>;

  @Input()
  load?: EventEmitter<string>;

  @Output()
  image: EventEmitter<ImageControlModel> = new EventEmitter();

  @Output()
  ondblclick: EventEmitter<GarbageStationGarbageCountStatistic> =
    new EventEmitter();

  @ViewChild('echarts')
  echarts?: ElementRef<HTMLDivElement>;

  garbageDropModel = new GarbageDropDurationPanelModel();

  panel = {
    line: new LineZoomLinePanel(),
    scatter: new LineZoomScatterPanel(),
  };

  constructor(business: LineZoomChartBusiness) {
    this.business = business;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load) {
      if (this.load) {
        this.load.subscribe((stationId: string) => {
          this.business.load(stationId, this.date, this.unit).then((data) => {
            this.data = data;
            this.setOption(this.data, option);
          });
        });
      }
    }
  }

  data?: LineZoomChartModel;
  xAxisData: Array<TimeString> = [];

  ngOnInit(): void {}
  loaded = false;
  inited = false;
  ngAfterViewInit(): void {
    wait(
      () => {
        if (this.echarts) {
          let div = this.echarts.nativeElement as HTMLDivElement;
          return div.offsetWidth > 0 && div.offsetHeight > 0;
        }
        return false;
      },
      async () => {
        if (this.loaded == false) {
          this.loaded = true;
          if (this.echarts) {
            this.chart = echarts.init(this.echarts.nativeElement, 'dark');
            this.chart.on('click', 'series.line', (trigger: any) => {
              this.showLinePanel(trigger);
            });
            this.chart.on('click', 'series.scatter', (trigger: any) => {
              this.showScatterPanel(trigger);
            });

            this.chart.getZr().on('click', () => {
              this.panel.line.display = false;
              this.panel.scatter.display = false;
            });
            this.chart.getZr().on('dblclick', (params: any) => {
              if (this.chart && this.data) {
                // console.log(params);
                let pointInPixel = [params.offsetX, params.offsetY];
                let grid = this.chart.convertFromPixel(
                  { seriesIndex: 0 },
                  pointInPixel
                );
                let index = grid[0];
                let data = this.data.count.find((x) => x.index == index);
                if (data) {
                  this.ondblclick.emit(data.value);
                } else {
                  let xData = this.xAxisData[index];
                  let statistic = new GarbageStationGarbageCountStatistic();
                  statistic.BeginTime = xData.date;
                  statistic.GarbageCount = 0;
                  statistic.Id = this.stationId ?? '';
                  this.ondblclick.emit(statistic);
                }
              }
            });
          }
          if (this.stationId) {
            this.data = await this.business.load(
              this.stationId,
              this.date,
              this.unit
            );
            this.setOption(this.data, option);
          }
        }
      }
    );
  }

  showLinePanel(trigger: any) {
    this.panel.scatter.display = false;
    this.panel.line.display = trigger.data > 0;

    if (this.panel.line.display) {
      this.panel.line.position.x = trigger.event.offsetX - 105 + 'px';
      this.panel.line.position.y = '-70px';
      // trigger.event.offsetY - 82 - 20 - 5 + 'px';
      if (this.data) {
        let data = this.data.count.find((x) => {
          let key = formatDate(x.time, 'H:mm', 'en');
          return trigger.name == key;
        });
        if (data) {
          this.panel.line.model.date = formatDate(
            data.value.BeginTime,
            'yyyy-MM-dd',
            'en'
          );
          this.panel.line.model.time = trigger.name;
          this.panel.line.model.garbageCount = data.value.GarbageCount;
          if (data.value.GarbageDuration) {
            this.panel.line.model.dropDuration = Language.Time(
              data.value.GarbageDuration
            );
          }
        }
      }
    }
  }

  showScatterPanel(trigger: any) {
    this.panel.line.display = false;
    this.panel.scatter.display = true;
    if (this.panel.scatter.display) {
      this.panel.scatter.position.x = trigger.event.offsetX - 210 / 2 + 'px';
      this.panel.scatter.position.y = '155px';
      // trigger.event.offsetY - 120 - 20 - 5 + 'px';
      if (this.data) {
        let data = this.data.record.find((x) => {
          let key = formatDate(x.time, 'H:mm', 'en');
          return trigger.name == key;
        });
        if (data) {
          this.panel.scatter.model = data.image;
        }
      }
    }
  }

  optionProcess(model: LineZoomChartModel, option: any) {
    let begin = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      model.timeRange ? model.timeRange.BeginTime.hour : 9,
      model.timeRange ? model.timeRange.BeginTime.minute : 0
    );
    let minutes = model.timeRange
      ? model.timeRange.EndTime.toMinutes() -
        model.timeRange.BeginTime.toMinutes()
      : 12 * 60;
    this.xAxisData = [];
    let counts = new Array();
    let records = new Array();
    for (let i = 0, offset = { count: 0, record: 0 }; i <= minutes; i++) {
      let now = new Date(begin.getTime());
      now.setMinutes(i);

      this.xAxisData.push(new TimeString(now));
      if (
        model.count &&
        model.count[offset.count] &&
        model.count[offset.count].time.getTime() === now.getTime()
      ) {
        let value = model.count[offset.count].value.GarbageCount > 0 ? 1 : 0;
        model.count[offset.count].index = i;
        counts.push(value);
        offset.count++;
      } else {
        counts.push(0);
      }
      if (
        model.record &&
        model.record[offset.record] &&
        model.record[offset.record].time.getTime() === now.getTime()
      ) {
        model.record[offset.record].index = i;
        let formatter = formatDate(now, 'H:mm', 'en');
        records.push([formatter, -0.1]);
        offset.record++;
      }
    }

    option.xAxis.data = this.xAxisData;
    option.series[0].data = counts;

    option.series[1].data = records;

    return option;
  }

  chart?: echarts.ECharts;

  setOption(data: LineZoomChartModel, opt: any) {
    if (this.chart) {
      this.chart.resize();
      let option = this.optionProcess(data, opt);
      // console.log(option);
      this.chart.setOption(option);
    }
  }

  onEventPanelClicked(model: ImageControlModel) {
    this.image.emit(model);
  }
}
