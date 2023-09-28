import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { Language } from 'src/app/common/tools/language';
import { ChartType } from 'src/app/enum/chart-type.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { IChartLineModel } from 'src/app/garbage-system/components/charts/lines/chart-line-simple/chart-line-simple.option';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { IModel, IObjectModel } from 'src/app/network/model/model.interface';
import { DapuqiaoGarbageDropStationWindowDetailsChartBusiness } from './dapuqiao-garbage-drop-station-window-details-chart.business';
import { DapuqiaoGarbageDropStationWindowDetailsChartConverter } from './dapuqiao-garbage-drop-station-window-details-chart.converter';
import {
  DapuqiaoGarbageDropStationWindowDetailsChartArgs,
  DapuqiaoGarbageDropStationWindowDetailsChartItemKey,
  DapuqiaoGarbageDropStationWindowDetailsChartItemLanguage,
  DapuqiaoGarbageDropStationWindowDetailsChartModel,
} from './dapuqiao-garbage-drop-station-window-details-chart.model';
import { DapuqiaoGarbageDropStationWindowDetailsChartService } from './dapuqiao-garbage-drop-station-window-details-chart.service';

@Component({
  selector: 'dapuqiao-garbage-drop-station-window-details-chart',
  templateUrl:
    './dapuqiao-garbage-drop-station-window-details-chart.component.html',
  styleUrls: [
    './dapuqiao-garbage-drop-station-window-details-chart.component.less',
  ],
  providers: [
    DapuqiaoGarbageDropStationWindowDetailsChartService,
    DapuqiaoGarbageDropStationWindowDetailsChartConverter,
    DapuqiaoGarbageDropStationWindowDetailsChartBusiness,
  ],
})
export class DapuqiaoGarbageDropStationWindowDetailsChartComponent
  implements
    OnInit,
    IComponent<IModel, DapuqiaoGarbageDropStationWindowDetailsChartModel>
{
  @Input()
  business: DapuqiaoGarbageDropStationWindowDetailsChartBusiness;
  constructor(
    business: DapuqiaoGarbageDropStationWindowDetailsChartBusiness,
    private local: LocalStorageService
  ) {
    this.business = business;
  }

  args = new DapuqiaoGarbageDropStationWindowDetailsChartArgs();
  model: IChartLineModel = {
    option: {},
    x: [],
    data: [],
  };
  type = {
    chart: ChartType.line,
    division: DivisionType.County,
  };
  ChartType = ChartType;
  TimeUnit = TimeUnit;
  key = DapuqiaoGarbageDropStationWindowDetailsChartItemKey.AllLevelNumber;
  ItemKey = DapuqiaoGarbageDropStationWindowDetailsChartItemKey;
  ItemLanguage = DapuqiaoGarbageDropStationWindowDetailsChartItemLanguage;
  Language = Language;
  chartload: EventEmitter<IChartLineModel> = new EventEmitter();
  DivisionType = DivisionType;
  stations: GarbageStation[] = [];
  defaultName = '请选择';
  ngOnInit(): void {
    if (this.local.user.Resources && this.local.user.Resources.length > 0) {
      this.defaultName = this.local.user.Resources[0].Name ?? '请选择';
    }
  }

  oninit(option: echarts.EChartsOption) {
    this.model.option = option;
    this.setOption();
    this.loadData();
  }

  setOption() {
    (this.model.option.color as any) = ['#5470c6'];
    (this.model.option.xAxis as any).boundaryGap = true;
    (this.model.option.yAxis as any).type = 'value';
    (this.model.option.yAxis as any).axisLabel = {
      formatter: `{value}${this.getYUnit(this.key)}`,
    };
    (this.model.option.grid as any).top = 60;
    (this.model.option.tooltip as any).valueFormatter = (value: string) => {
      return `${value}${this.getYUnit(this.key)}`;
    };
    (this.model.option.series as any)[0].label.formatter = `{c} ${this.getYUnit(
      this.key
    )}`;
  }

  getYUnit(key: DapuqiaoGarbageDropStationWindowDetailsChartItemKey) {
    switch (key) {
      case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.SupervisedRatio:
      case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.FeedbackRatio:
        return '%';
      case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.AvgFeedbackSeconds:
        return '分钟';
      case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.Level1FeedbackNumber:
      case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.Level2FeedbackNumber:
      case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.Level3FeedbackNumber:
      case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.PropertyFeedbackNumber:
      case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.ThirdPartFeedbackNumber:
      case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.FeedbackNumber:
      case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.SupervisedNumber:
        return '次';

      default:
        return '起';
    }
  }

  loadData() {
    this.business.load(this.args, this.key).then((x) => {
      this.model.data = x.data;
      this.model.x = x.x;
      this.setOption();
      this.chartload.emit(this.model);
    });
  }

  onsearch() {
    this.loadData();
  }

  async ondivision(item?: IObjectModel) {
    if (this.args.divisionId !== item?.Id) {
      this.args.stationId = undefined;
    }
    this.args.divisionId = item?.Id;
    this.stations = await this.business.stations(this.args.divisionId);
  }
}
