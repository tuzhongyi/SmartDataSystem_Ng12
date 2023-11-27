import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { EventNumberStatistic } from 'src/app/network/model/garbage-station/event-number-statistic.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { StatisticSummaryExportExcelBusiness } from './business/statistic-summary-export-excel.business';
import { StatisticSummaryViewModel } from './statistic-summary.model';
import { StatisticSummaryService } from './statistic-summary.service';

@Component({
  selector: 'app-statistic-summary',
  templateUrl: './statistic-summary.component.html',
  styleUrls: ['./statistic-summary.component.css'],
  providers: [StatisticSummaryService],
})
export class StatisticSummaryComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  private _unit: TimeUnit = TimeUnit.Hour;

  title = '汇总信息';
  key = 'statistic-summary';

  TimeUnits: {
    value: TimeUnit;
    language: string;
  }[] = [];

  divisionStatistic: StatisticSummaryViewModel[] = [
    new StatisticSummaryViewModel(),
  ];
  stationStatistic: GarbageStationNumberStatisticV2[] = [];

  divisionHistory: EventNumberStatistic[] = [];

  display = {
    timeunit: false,
  };

  @Input()
  Committees?: Division;
  @Input()
  Stations: GarbageStation[] = [];

  @Input()
  Date: Date = new Date();

  public set unit(v: TimeUnit) {
    this._unit = v;
    this.onLoaded();
  }
  public get unit(): TimeUnit {
    return this._unit;
  }

  dateView = DateTimePickerView.month;

  language = {
    format: 'yyyy年MM月dd日',
    day: () => {
      return this.datePipe.transform(this.Date, this.language.format);
    },
    unit: () => {
      switch (this.unit) {
        case TimeUnit.Hour:
          this.language.format = 'yyyy年MM月dd日';
          this.dateView = 2;
          break;
        case TimeUnit.Day:
          this.language.format = 'yyyy年MM月';
          this.dateView = 3;
          break;
        default:
          break;
      }
      return Language.TimeUnit(this.unit);
    },
  };

  changeDate = (date: Date) => {
    this.Date = date;
    this.onLoaded();
  };

  constructor(
    private datePipe: DatePipe,
    private service: StatisticSummaryService,
    private store: GlobalStorageService
  ) {}

  ngAfterViewInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.Committees && this.Stations && this.Date) {
      this.onLoaded();
    }
  }

  ngOnInit() {
    this.TimeUnits.push({
      value: TimeUnit.Hour,
      language: Language.TimeUnit(TimeUnit.Day),
    });
    this.TimeUnits.push({
      value: TimeUnit.Day,
      language: Language.TimeUnit(TimeUnit.Month),
    });

    this.store.interval.subscribe(this.key, (x) => {
      this.onLoaded();
    });

    this.exportBusiness = new StatisticSummaryExportExcelBusiness(this.title);
  }
  ngOnDestroy(): void {
    this.store.interval.unsubscribe(this.key);
  }
  onLoaded() {
    if (this.Committees && this.Stations) {
      let stationIds = this.Stations.map((x) => x.Id);

      let unit = this.unit;
      if (this.unit == TimeUnit.Day) {
        unit = TimeUnit.Month;
      }
      let interval = DurationParams.TimeUnit(unit, this.Date);

      this.service
        .stationHistory(this.Committees.Id, interval, this.unit)
        .then((x) => {
          this.divisionHistory = x;
        });
      this.service
        .divisions(this.Committees.Id, interval, this.unit)
        .then(async (x) => {
          this.stationStatistic = await this.service.stations(
            stationIds,
            interval,
            this.unit
          );

          let array = [];
          for (let i = 0; i < x.length; i++) {
            const divisionStatistic = x[i];

            let maxGarbageTime = 0;
            let garde = 100;
            let gardeCount = 0;
            let gardeLength = 0;
            this.stationStatistic.forEach((x) => {
              maxGarbageTime = Math.max(maxGarbageTime, x.MaxGarbageTime ?? 0);
              if (x.Grade) {
                gardeLength++;
                gardeCount += x.Grade;
              }
            });
            if (gardeLength > 0) {
              garde = gardeCount / gardeLength;
            }
            array[i] = new StatisticSummaryViewModel(maxGarbageTime, garde);
            array[i] = Object.assign(array[i], divisionStatistic);
          }
          this.divisionStatistic = array;
        });
    }
  }

  timeUnitChanging(event: Event) {
    this.display.timeunit = !this.display.timeunit;
    event.stopPropagation();
  }
  unitChanged(event: Event, item: TimeUnit) {
    this.unit = item;
    this.display.timeunit = false;
    event.stopPropagation();
  }
  windowClick() {
    this.display.timeunit = false;
  }

  // child input
  exportTrigger = new EventEmitter();

  exportBusiness = new StatisticSummaryExportExcelBusiness(this.title);

  // child output
  onExport(data: any) {
    let date = this.datePipe.transform(this.Date, this.language.format);
    this.exportBusiness.export(data, `${date} ${this.title}`);
    if (this.exportBusiness.completed) {
      this.exportBusiness = new StatisticSummaryExportExcelBusiness(this.title);
    }
  }

  // click
  exportExcel() {
    this.exportTrigger.emit();
  }
}
