import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { EventType } from 'src/app/enum/event-type.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Language } from 'src/app/global/tool/language';
import { Division } from 'src/app/network/model/division.model';
import {
  IllegalDropEventRecord,
  MixedIntoEventRecord,
} from 'src/app/network/model/event-record.model';
import { CommitteesHistoryTableConverter } from './committees-history-table.converter';
import {
  CommitteesHistoryTableTypes,
  CommitteesHistoryTableViewModel,
} from './committees-history-table.model';
import { CommitteesHistroyTableService } from './committees-history-table.service';

@Component({
  selector: 'app-histroy-table',
  templateUrl: './committees-history-table.component.html',
  styleUrls: ['./committees-history-table.component.css'],
  providers: [CommitteesHistroyTableService],
})
export class CommitteesHistroyTableComponent
  implements
    OnInit,
    OnChanges,
    IComponent<
      Array<IllegalDropEventRecord | MixedIntoEventRecord>,
      CommitteesHistoryTableViewModel<
        IllegalDropEventRecord | MixedIntoEventRecord
      >[]
    >
{
  Language = Language;
  headWidths = ['10%', '60%', '15%', 'calc(15% - 8px)', '8px'];
  bodyWidths = ['10%', '60%', '15%', '15%'];

  EventType = EventType;

  @Input()
  Committees?: Division;

  @Input()
  Type: EventType = EventType.IllegalDrop;

  @Output()
  OnPictureClicked: EventEmitter<
    IllegalDropEventRecord | MixedIntoEventRecord
  > = new EventEmitter();
  @Output()
  OnVideoClicked: EventEmitter<IllegalDropEventRecord | MixedIntoEventRecord> =
    new EventEmitter();

  constructor(
    business: CommitteesHistroyTableService,
    private store: StoreService
  ) {
    this.business = business;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Committees && this.Committees) {
      this.onLoaded();
    }
  }
  business: IBusiness<
    (IllegalDropEventRecord | MixedIntoEventRecord)[],
    CommitteesHistoryTableViewModel<
      IllegalDropEventRecord | MixedIntoEventRecord
    >[]
  >;
  onLoaded(): void {
    this.show();
  }

  ngOnInit() {
    this.store.interval.subscribe(() => {
      this.show();
    });
  }

  views: CommitteesHistoryTableViewModel<
    IllegalDropEventRecord | MixedIntoEventRecord
  >[] = [];

  show() {
    if (this.Committees) {
      this.business.load(this.Committees.Id, this.Type).then((datas) => {
        this.views = datas;
      });
    }
  }

  filterClick(type: EventType) {
    this.Type = type;
    this.show();
  }

  pictureClick(
    event: Event,
    item: CommitteesHistoryTableViewModel<
      IllegalDropEventRecord | MixedIntoEventRecord
    >
  ) {
    this.OnPictureClicked.emit(item.Data);
  }
  videoClick(
    event: Event,
    item: CommitteesHistoryTableViewModel<
      IllegalDropEventRecord | MixedIntoEventRecord
    >
  ) {
    this.OnVideoClicked.emit(item.Data);
  }
}
