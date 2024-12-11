import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { GarbageDropRecordFilter } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { HorizontalAlign } from 'src/app/enum/direction.enum';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { CompareRange } from 'src/app/network/model/garbage-station/compare-range.model';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
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

  @Input() duration: Duration = DateTimeTool.allDay(new Date());
  @Output() durationChange = new EventEmitter<Duration>();

  @Input() divisionId?: string;
  @Output() divisionIdChange = new EventEmitter<string>();

  @Input() stationId?: string;
  @Output() stationIdChange = new EventEmitter<string>();

  @Input() range?: CompareRange<number>;
  @Output() rangeChange = new EventEmitter<CompareRange<number>>();

  @Input() handle?: boolean;
  @Output() handleChange = new EventEmitter<boolean>();

  @Input() timeout?: boolean;
  @Output() timeoutChange = new EventEmitter<boolean>();

  @Input() sameDay: boolean = false;

  constructor(business: GarbageStationWindowRecordFilterBusiness) {
    this.business = business;
  }

  ranges: SelectItem[] = [];
  status?: GarbageTaskStatus;
  HorizontalAlign = HorizontalAlign;

  model: GarbageStationWindowRecordFilterModel =
    new GarbageStationWindowRecordFilterModel();
  loadDivision: EventEmitter<string> = new EventEmitter();
  DateTimePickerView = DateTimePickerView;
  GarbageTaskStatus = GarbageTaskStatus;
  ngOnInit(): void {
    this.initRanges();
    this.initStatuses(this.handle, this.timeout);
    this.loadData();
  }

  initRanges() {
    this.ranges.push(new SelectItem('0>', undefined, '全部'));
    this.ranges.push(
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
    this.ranges.push(
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
    this.ranges.push(
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
    this.ranges.push(
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
    if (this.sameDay && date.getDate() != this.duration.end.getDate()) {
      let end = new Date(this.duration.end.getTime());
      end.setDate(date.getDate());
      this.duration.end = end;
    }
    this.durationChange.emit(this.duration);
  }
  changeEnd(date: Date) {
    // if (
    //   this.sameDay &&
    //   date.getDate() != this.filter.duration.begin.getDate()
    // ) {
    //   let begin = new Date(this.filter.duration.begin.getTime());
    //   begin.setDate(date.getDate());
    //   this.filter.duration.begin = begin;
    // }
    this.durationChange.emit(this.duration);
  }
  ondivision(item?: IIdNameModel) {
    this.divisionId = item?.Id;
    this.loadData(this.divisionId);
    this.divisionIdChange.emit(this.divisionId);
  }

  onstation() {
    this.stationIdChange.emit(this.stationId);
  }
  onrange() {
    this.rangeChange.emit(this.range);
  }

  onstatus() {
    this.timeout = undefined;
    this.handle = undefined;

    switch (this.status) {
      case GarbageTaskStatus.handled:
        this.handle = true;
        break;

      case GarbageTaskStatus.unhandled:
        this.handle = false;
        break;
      case GarbageTaskStatus.timeout:
        this.timeout = true;
        break;
      case GarbageTaskStatus.timeout_unhandled:
        this.timeout = true;
        this.handle = false;
        break;
      case GarbageTaskStatus.timeout_handled:
        this.timeout = true;
        this.handle = true;
        break;

      default:
        break;
    }

    this.timeoutChange.emit(this.timeout);
    this.handleChange.emit(this.handle);
  }
}
