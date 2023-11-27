import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  GarbageDropRecordFilter,
  GarbageDropRecordViewModel,
} from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { CompareRange } from 'src/app/network/model/garbage-station/compare-range.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { SearchOptionKey } from 'src/app/view-model/search-options.model';
import { AuditStatisticEventSelection } from '../audit-statistic-event/audit-statistic-event.selection';

@Component({
  selector: 'audit-statistic-event-drop-manager',
  templateUrl: './audit-statistic-event-drop-manager.component.html',
  styleUrls: ['./audit-statistic-event-drop-manager.component.less'],
})
export class AuditStatisticEventDropManagerComponent implements OnInit {
  @Input() divisionId?: string;
  @Input() handle?: boolean;
  @Input() timeout?: boolean;
  @Output() image: EventEmitter<PagedArgs<GarbageDropRecordViewModel>> =
    new EventEmitter();
  @Output() video: EventEmitter<GarbageDropRecordViewModel> =
    new EventEmitter();
  constructor() {}
  load: EventEmitter<GarbageDropRecordFilter> = new EventEmitter();
  args: GarbageDropRecordFilter = new GarbageDropRecordFilter();
  selection = new AuditStatisticEventSelection();
  DateView = DateTimePickerView;
  GarbageTaskStatus = GarbageTaskStatus;
  status?: GarbageTaskStatus;
  ranges: { key: string; value: CompareRange<number> }[] = [
    {
      value: {
        IsEqual: true,
        GreaterThan: 0,
        LessThan: 30,
      },
      key: '30分钟以内',
    },
    {
      value: {
        IsEqual: true,
        GreaterThan: 30,
        LessThan: 60,
      },
      key: '30分钟-1小时',
    },
    {
      value: {
        IsEqual: true,
        GreaterThan: 60,
        LessThan: 120,
      },
      key: '1小时-2小时',
    },
    {
      value: {
        IsEqual: true,
        GreaterThan: 120,
      },
      key: '2小时以上',
    },
  ];

  ngOnInit(): void {
    this.args.IsHandle = this.handle;
    this.args.IsTimeout = this.timeout;
    if (this.handle && this.timeout) {
      this.status = GarbageTaskStatus.timeout_handled;
    } else if (this.timeout) {
      this.status = GarbageTaskStatus.timeout;
    } else if (this.handle) {
      this.status = GarbageTaskStatus.handled;
    } else if (this.handle === false) {
      this.status = GarbageTaskStatus.unhandled;
    } else {
    }
    this.args.opts = {
      propertyName: SearchOptionKey.name,
      text: '',
    };
    if (this.divisionId) {
      this.args.divisionId = this.divisionId;
      this.selection.default = [this.divisionId];
    }
    this.selection.select.subscribe((x) => {
      this.args.divisionId = x?.Id;
    });
  }

  ondate(date: Date) {
    if (this.args.duration.begin.getDate() !== date.getDate()) {
      let begin = new Date(this.args.duration.begin.getTime());
      begin.setDate(date.getDate());
      this.args.duration.begin = begin;
    }
    if (this.args.duration.end.getDate() !== date.getDate()) {
      let end = new Date(this.args.duration.end.getTime());
      end.setDate(date.getDate());
      this.args.duration.end = end;
    }
  }
  onsearch() {
    this.load.emit(this.args);
  }
  onstatus(item?: GarbageTaskStatus) {
    this.args.IsTimeout = undefined;
    this.args.IsHandle = undefined;

    switch (item) {
      case GarbageTaskStatus.handled:
        this.args.IsHandle = true;
        break;

      case GarbageTaskStatus.unhandled:
        this.args.IsHandle = false;
        break;
      case GarbageTaskStatus.timeout:
        this.args.IsTimeout = true;
        break;
      case GarbageTaskStatus.timeout_handled:
        this.args.IsTimeout = true;
        this.args.IsHandle = true;
        break;

      default:
        break;
    }
  }
  onimage(args: PagedArgs<GarbageDropRecordViewModel>) {
    this.image.emit(args);
  }
  onvideo(item: GarbageDropRecordViewModel) {
    this.video.emit(item);
  }
}
