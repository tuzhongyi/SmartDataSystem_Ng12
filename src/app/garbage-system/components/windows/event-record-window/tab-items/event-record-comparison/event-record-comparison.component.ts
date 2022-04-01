import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ExportBusiness } from 'src/app/common/business/export.business';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker.directive';
import { ChartType } from 'src/app/enum/chart-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { ChartConfig } from '../../../charts/details-chart/details-chart.option';

@Component({
  selector: 'howell-event-record-comparison',
  templateUrl: './event-record-comparison.component.html',
  styleUrls: ['./event-record-comparison.component.less']
})
export class EventRecordComparisonComponent implements OnInit {
  @Input()
  date: Date = new Date();
  @Input()
  unit: TimeUnit = TimeUnit.Day;
  @Input()
  userType: UserResourceType = UserResourceType.Station;
  @Input()
  eventType: EventType = EventType.IllegalDrop;


  constructor(private local: LocalStorageService, private exports: ExportBusiness) {

    if (local.user.DefaultResource) {
      this.userType = local.user.DefaultResource.ResourceType;
    }
  }

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

  ngOnInit(): void {
    this.initUnits()
    this.initChartTypes()
  }

  initUnits() {
    this.units.push(
      new SelectItem({
        key: TimeUnit.Day.toString(),
        value: TimeUnit.Day,
        language: '日报表',
      })
    );
    this.units.push(
      new SelectItem({
        key: TimeUnit.Week.toString(),
        value: TimeUnit.Week,
        language: '周报表',
      })
    );
    this.units.push(
      new SelectItem({
        key: TimeUnit.Month.toString(),
        value: TimeUnit.Month,
        language: '月报表',
      })
    );
  }
  initChartTypes() {
    this.chartTypes.push(
      new SelectItem({
        key: ChartType.bar.toString(),
        value: ChartType.bar,
        language: "柱状图"
      })
    )
    this.chartTypes.push(
      new SelectItem({
        key: ChartType.line.toString(),
        value: ChartType.line,
        language: "折线图"
      })
    )
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
  search() { }
  exportExcel() {

  }
  exportCSV() { }


}
