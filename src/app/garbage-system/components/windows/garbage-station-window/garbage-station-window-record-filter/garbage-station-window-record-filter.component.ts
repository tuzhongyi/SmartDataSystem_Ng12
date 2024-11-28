import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { GarbageDropRecordFilter } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { HorizontalAlign } from 'src/app/enum/direction.enum';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { IIdNameModel, IModel } from 'src/app/network/model/model.interface';
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
  @Input() business: IBusiness<IModel, GarbageStationWindowRecordFilterModel>;
  @Output() filterChange: EventEmitter<GarbageDropRecordFilter> =
    new EventEmitter();
  @Input() filter: GarbageDropRecordFilter = new GarbageDropRecordFilter();
  @Input() sameDay: boolean = false;

  constructor(
    business: GarbageStationWindowRecordFilterBusiness,
    private global: GlobalStorageService
  ) {
    this.business = business;
  }

  durations: SelectItem[] = [];
  status?: GarbageTaskStatus;
  HorizontalAlign = HorizontalAlign;

  model: GarbageStationWindowRecordFilterModel =
    new GarbageStationWindowRecordFilterModel();
  loadDivision: EventEmitter<string> = new EventEmitter();
  DateTimePickerView = DateTimePickerView;
  GarbageTaskStatus = GarbageTaskStatus;
  ngOnInit(): void {
    this.global.division.selected.then((division) => {
      this.filter.divisionId = division.Id;
      this.filterChange.emit(this.filter);
    });
    this.initDurations();
    this.initStatuses(this.filter.IsHandle, this.filter.IsTimeout);
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
  initStatuses(handled?: boolean, timeout?: boolean) {
    if (handled && timeout) {
      this.status = GarbageTaskStatus.timeout_handled;
    } else if (!handled && !timeout) {
      this.status = GarbageTaskStatus.unhandled;
    } else if (handled && !timeout) {
      this.status = GarbageTaskStatus.handled;
    } else if (handled == undefined && timeout) {
      this.status = GarbageTaskStatus.timeout;
    } else if (!handled && timeout) {
      this.status = GarbageTaskStatus.timeout_unhandled;
    } else {
      this.status = undefined;
    }
  }

  async loadData(divisionId?: string) {
    this.model = await this.business.load(divisionId);
  }
  changeBegin(date: Date) {
    if (this.sameDay && date.getDate() != this.filter.duration.end.getDate()) {
      let end = new Date(this.filter.duration.end.getTime());
      end.setDate(date.getDate());
      this.filter.duration.end = end;
    }
    this.filterChange.emit(this.filter);
  }
  changeEnd(date: Date) {
    if (
      this.sameDay &&
      date.getDate() != this.filter.duration.begin.getDate()
    ) {
      let begin = new Date(this.filter.duration.begin.getTime());
      begin.setDate(date.getDate());
      this.filter.duration.begin = begin;
    }
    this.filterChange.emit(this.filter);
  }
  ondivision(item?: IIdNameModel) {
    this.filter.divisionId = item?.Id;
    this.loadData(this.filter.divisionId);
    this.filterChange.emit(this.filter);
  }

  onchange() {
    this.filterChange.emit(this.filter);
  }

  onstatus() {
    this.filter.IsTimeout = undefined;
    this.filter.IsHandle = undefined;

    switch (this.status) {
      case GarbageTaskStatus.handled:
        this.filter.IsHandle = true;
        break;

      case GarbageTaskStatus.unhandled:
        this.filter.IsHandle = false;
        break;
      case GarbageTaskStatus.timeout:
        this.filter.IsTimeout = true;
        break;
      case GarbageTaskStatus.timeout_unhandled:
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

    this.filterChange.emit(this.filter);
  }
}
