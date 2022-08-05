import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { GarbageDropRecordFilter } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { HorizontalAlign } from 'src/app/enum/direction.enum';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { CompareRange } from 'src/app/network/model/compare-range.model';
import { Division } from 'src/app/network/model/division.model';
import { IModel } from 'src/app/network/model/model.interface';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { GarbageStationWindowRecordFilterBusiness } from './garbage-station-window-record-filter.business';
import { GarbageStationWindowRecordFilterModel } from './garbage-station-window-record-filter.model';

@Component({
  selector: 'howell-garbage-station-window-record-filter',
  templateUrl: './garbage-station-window-record-filter.component.html',
  styleUrls: ['./garbage-station-window-record-filter.component.less'],
  providers: [GarbageStationWindowRecordFilterBusiness],
})
export class GarbageStationWindowRecordFilterComponent
  implements IComponent<IModel, GarbageStationWindowRecordFilterModel>, OnInit
{
  @Input()
  business: IBusiness<IModel, GarbageStationWindowRecordFilterModel>;
  @Output()
  changed: EventEmitter<GarbageDropRecordFilter> = new EventEmitter();

  constructor(business: GarbageStationWindowRecordFilterBusiness) {
    this.business = business;
  }

  filter: GarbageDropRecordFilter = new GarbageDropRecordFilter();

  durations: SelectItem[] = [];
  statuses: SelectItem[] = [];
  HorizontalAlign = HorizontalAlign;

  model: GarbageStationWindowRecordFilterModel =
    new GarbageStationWindowRecordFilterModel();
  loadDivision: EventEmitter<string> = new EventEmitter();
  DateTimePickerView = DateTimePickerView;
  ngOnInit(): void {
    this.initDurations();
    this.initStatuses();
    this.loadData();
  }

  initDurations() {
    this.durations.push(new SelectItem('0>', undefined, '全部'));
    this.durations.push(
      new SelectItem(
        '0<30',
        {
          IsEqual: true,
          GreaterThan: 0,
          LessThan: 30,
        },
        '30分钟以内'
      )
    );
    this.durations.push(
      new SelectItem(
        '30<60',
        {
          IsEqual: true,
          GreaterThan: 30,
          LessThan: 60,
        },
        '30分钟-1小时'
      )
    );
    this.durations.push(
      new SelectItem(
        '60<120',
        {
          IsEqual: true,
          GreaterThan: 60,
          LessThan: 120,
        },
        '1小时-2小时'
      )
    );
    this.durations.push(
      new SelectItem(
        '>120',
        {
          IsEqual: true,
          GreaterThan: 120,
        },
        '2小时以上'
      )
    );
  }
  initStatuses() {
    this.statuses.push(SelectItem.create(undefined, '全部'));
    this.statuses.push(
      SelectItem.create(GarbageTaskStatus.unhandled, '待处置')
    );
    this.statuses.push(SelectItem.create(GarbageTaskStatus.handled, '已处置'));
    this.statuses.push(
      SelectItem.create(GarbageTaskStatus.timeout, '超时待处置')
    );
    this.statuses.push(
      SelectItem.create(GarbageTaskStatus.timeout_handled, '超时处置')
    );
  }

  async loadData(divisionId?: string) {
    this.model = await this.business.load(divisionId);
  }
  changeBegin(date: Date) {
    this.filter.BeginTime = date;
    this.changed.emit(this.filter);
  }
  changeEnd(date: Date) {
    this.filter.EndTime = date;
    this.changed.emit(this.filter);
  }
  ondivision(item: Division) {
    this.filter.divisionId = item.Id;
    this.loadData(item.Id);
    this.changed.emit(this.filter);
  }
  onstation(item: SelectItem) {
    this.filter.stationId = item.key;
    this.changed.emit(this.filter);
  }
  onduration(item: SelectItem) {
    this.filter.duration = item.value;
    this.changed.emit(this.filter);
  }
  onstatus(item: SelectItem) {
    this.filter.IsTimeout = undefined;
    this.filter.IsHandle = undefined;
    if (item.key) {
      switch (item.value as GarbageTaskStatus) {
        case GarbageTaskStatus.handled:
          this.filter.IsHandle = true;
          this.filter.IsTimeout = false;
          break;
        case GarbageTaskStatus.unhandled:
          this.filter.IsHandle = false;
          this.filter.IsTimeout = false;
          break;
        case GarbageTaskStatus.timeout:
          this.filter.IsTimeout = true;
          this.filter.IsHandle = false;
          break;
        case GarbageTaskStatus.timeout_handled:
          this.filter.IsTimeout = true;
          this.filter.IsHandle = true;
          break;

        default:
          break;
      }
    }
    this.changed.emit(this.filter);
  }
}
