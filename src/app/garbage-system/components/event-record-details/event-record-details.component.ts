import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record-table/event-record.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker.directive';
import { Enum } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Language } from 'src/app/global/tool/language';
import { Page } from 'src/app/network/model/page_list.model';

@Component({
  selector: 'app-event-record-details',
  templateUrl: './event-record-details.component.html',
  styleUrls: ['./event-record-details.component.less'],
})
export class EventRecordDetailsComponent implements OnInit, OnChanges {
  Language = Language;

  title: string = '';

  @Input()
  type: EventType = EventType.MixedInto;

  @Input()
  recordCount: number = 0;

  @Input()
  index = 0;

  constructor(private storeService: StoreService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.title = Language.EventType(this.type);
    }
  }

  ngOnInit(): void {}
  indexChange(index: number) {
    this.index = index;
  }
}
