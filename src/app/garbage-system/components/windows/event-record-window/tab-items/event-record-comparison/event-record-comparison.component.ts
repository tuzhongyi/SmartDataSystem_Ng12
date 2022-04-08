import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { ExportBusiness } from 'src/app/common/business/export.business';
import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { ChartType } from 'src/app/enum/chart-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { Language } from 'src/app/global/tool/language';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { IModel } from 'src/app/network/model/model.interface';
import { ChartConfig } from '../../../charts/details-chart/details-chart.option';
import { EventRecordComparisonBusiness } from './event-record-comparison.business';
import { EventRecordComparisonOptions } from './EventRecordComparison.model';

@Component({
  selector: 'howell-event-record-comparison',
  templateUrl: './event-record-comparison.component.html',
  styleUrls: ['./event-record-comparison.component.less'],
  providers: [EventRecordComparisonBusiness]
})
export class EventRecordComparisonComponent
  implements OnInit, IComponent<IModel, ITimeData<number>[][]> {
  @Input()
  date: Date = new Date();
  @Input()
  unit: TimeUnit = TimeUnit.Day;
  @Input()
  userType: UserResourceType = UserResourceType.Station;
  @Input()
  eventType: EventType = EventType.IllegalDrop;


  constructor(private local: LocalStorageService, private exports: ExportBusiness, business: EventRecordComparisonBusiness) {
    this.business = business;
    if (this.local.user.Resources && this.local.user.Resources.length > 0) {
      this.userType = this.local.user.Resources[0].ResourceType
    }

  }
  business: IBusiness<IModel, ITimeData<number>[][]>;
  userTypes: SelectItem[] = [];
  DateTimePickerView = DateTimePickerView;
  dateFormat = "yyyy年MM月dd日";
  units: SelectItem[] = [];
  ChartType = ChartType;
  chartType: ChartType = ChartType.bar;
  chartTypes: SelectItem[] = [];
  load: EventEmitter<void> = new EventEmitter();
  config = {
    line: new ChartConfig(this.unit, this.date),
    bar: new ChartConfig(this.unit, this.date),
  };
  datas?: ITimeData<number>[][]
  selectIds?: string[]

  ngOnInit(): void {
    this.initUnits();
    this.initChartTypes();
    this.initUserTypes();
  }

  initUnits() {
    this.units.push(
      new SelectItem(
        TimeUnit.Hour.toString(),
        TimeUnit.Hour,
        '日报表',
      )
    );
    this.units.push(
      new SelectItem(
        TimeUnit.Week.toString(),
        TimeUnit.Week,
        '周报表',
      )
    );
    this.units.push(
      new SelectItem(
        TimeUnit.Month.toString(),
        TimeUnit.Month,
        '月报表',
      )
    );
  }
  initChartTypes() {
    this.chartTypes.push(
      new SelectItem(
        ChartType.bar.toString(),
        ChartType.bar,
        Language.ChartType(ChartType.bar)
      )
    )
    this.chartTypes.push(
      new SelectItem(
        ChartType.line.toString(),
        ChartType.line,
        Language.ChartType(ChartType.line)
      )
    )
  }
  initUserTypes() {
    if (this.local.user.Resources && this.local.user.Resources.length > 0) {
      if (this.local.user.Resources[0].ResourceType == UserResourceType.City) {
        this.userTypes.push(
          new SelectItem(
            UserResourceType.County.toString(),
            UserResourceType.County,
            Language.UserResourceType(UserResourceType.County)
          )
        )
      }
    }
    this.userTypes.push(
      new SelectItem(
        UserResourceType.Committees.toString(),
        UserResourceType.Committees,
        Language.UserResourceType(UserResourceType.Committees)
      )
    )
    this.userTypes.push(
      new SelectItem(
        UserResourceType.Station.toString(),
        UserResourceType.Station,
        Language.UserResourceType(UserResourceType.Station)
      )
    )
  }

  async loadData() {
    if (!this.selectIds) return;
    let opts: EventRecordComparisonOptions = {
      userType: this.userType,
      eventType: this.eventType,
      unit: this.unit,
      date: this.date,
      ids: this.selectIds
    }
    this.datas = await this.business.load(opts);
    this.load.emit();    
    switch (this.chartType) {
      case ChartType.line:
        this.config.line.options = this.config.line.getOption(this.unit, this.date);
        this.config.line.merge = {
          series: this.datas.map(data => {
            return {
              type: 'line',
              name: '单位(起)',
              data: data.map((x) => x.value),
              areaStyle: {},
              label: {
                formatter: (params: CallbackDataParams) => {
                  return params.value.toString();
                },
              },
            }
          })
        };
        break;
      case ChartType.bar:
        this.config.bar.options = this.config.bar.getOption(this.unit, this.date);
        this.config.bar.merge = {
          series: this.datas.map(data => {
            return {
              type: 'bar',
              name: '单位(起)',
              data: data.map((x) => x.value),
              barWidth: "32px",
              label: {
                show: true,
                position: 'top',
                color: "#7d90bc",
                fontSize: "16px",
                textBorderWidth: 0,
                formatter: (params: CallbackDataParams) => {
                  return params.value.toString();
                },
              },
            }
          }
          ),
        };
        break;
      default:
        break;
    }
  }

  changeDate(date: Date) {
    this.date = date;
  }
  ontimeunit(item: SelectItem) {
    this.unit = item.value;
  }
  oncharttype(item: SelectItem) {
    this.chartType = item.value;
  }
  onusertype(item: SelectItem) {
    this.userType = item.value;
  }



  onTreeSelect(ids: string[]) {
    debugger;
    this.selectIds = ids;
  }

  search() {
    this.loadData();
  }
  exportExcel() {

  }
  exportCSV() { }


}



