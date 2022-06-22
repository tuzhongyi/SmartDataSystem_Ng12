import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';
import { StoreService } from 'src/app/common/service/store.service';
import { Language } from 'src/app/common/tools/language';

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

  constructor(private storeService: StoreService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.title = Language.EventType(this.type);
    }
  }

  ngOnInit(): void { }
  indexChange(index: number) {
    this.index = index;
  }
}
