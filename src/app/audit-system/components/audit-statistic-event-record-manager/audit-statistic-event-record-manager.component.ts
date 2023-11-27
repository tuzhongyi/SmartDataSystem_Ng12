import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record/event-record.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { SearchOptionKey } from 'src/app/view-model/search-options.model';
import { AuditStatisticEventSelection } from '../audit-statistic-event/audit-statistic-event.selection';

@Component({
  selector: 'audit-statistic-event-record-manager',
  templateUrl: './audit-statistic-event-record-manager.component.html',
  styleUrls: ['./audit-statistic-event-record-manager.component.less'],
})
export class AuditStatisticEventRecordManagerComponent implements OnInit {
  @Input() type: EventType = EventType.IllegalDrop;
  @Input() divisionId?: string;
  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<EventRecordViewModel>> =
    new EventEmitter();
  @Output() video: EventEmitter<EventRecordViewModel> = new EventEmitter();
  @Output() image: EventEmitter<PagedArgs<EventRecordViewModel>> =
    new EventEmitter();
  constructor() {}

  selection = new AuditStatisticEventSelection();
  args: EventRecordFilter = new EventRecordFilter();
  load: EventEmitter<EventRecordFilter> = new EventEmitter();
  Language = Language;
  DateView = DateTimePickerView;

  ngOnInit(): void {
    this.args.type = this.type;
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

  onimage(model: PagedArgs<EventRecordViewModel>) {
    this.image.emit(model);
  }
  onvideo(model: EventRecordViewModel) {
    this.video.emit(model);
  }
  ongot(data: any) {
    this.got.emit(data);
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
}
