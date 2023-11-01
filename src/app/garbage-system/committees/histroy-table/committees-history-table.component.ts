import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { EventRecordConverter } from 'src/app/common/components/tables/event-record/event-record.converter';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { IllegalDropEventRecord } from 'src/app/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { MixedIntoEventRecord } from 'src/app/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { CommitteesHistoryTableConverter } from './committees-history-table.converter';
import { CommitteesHistoryTableViewModel } from './committees-history-table.model';
import { CommitteesHistroyTableService } from './committees-history-table.service';

@Component({
  selector: 'app-histroy-table',
  templateUrl: './committees-history-table.component.html',
  styleUrls: ['./committees-history-table.component.css'],
  providers: [
    CommitteesHistroyTableService,
    EventRecordConverter,
    CommitteesHistoryTableConverter,
  ],
})
export class CommitteesHistroyTableComponent
  implements
    OnInit,
    OnChanges,
    OnDestroy,
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

  @Output() OnPictureClicked: EventEmitter<ImageControlModelArray> =
    new EventEmitter();
  @Output() OnVideoClicked: EventEmitter<
    CommitteesHistoryTableViewModel<
      IllegalDropEventRecord | MixedIntoEventRecord
    >
  > = new EventEmitter();

  constructor(
    business: CommitteesHistroyTableService,
    private store: GlobalStorageService
  ) {
    this.business = business;
  }
  key = 'committees-history-table';
  business: IBusiness<
    (IllegalDropEventRecord | MixedIntoEventRecord)[],
    CommitteesHistoryTableViewModel<
      IllegalDropEventRecord | MixedIntoEventRecord
    >[]
  >;
  views: CommitteesHistoryTableViewModel<
    IllegalDropEventRecord | MixedIntoEventRecord
  >[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Committees && this.Committees) {
      this.onLoaded();
    }
  }

  ngOnInit() {
    this.store.interval.subscribe(this.key, () => {
      this.show();
    });
  }

  ngOnDestroy(): void {
    this.store.interval.unsubscribe(this.key);
  }

  onLoaded(): void {
    this.show();
  }
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
    event.stopImmediatePropagation();
    let array = new ImageControlModelArray(item.images, 0, item);
    this.OnPictureClicked.emit(array);
  }
  videoClick(
    event: Event,
    item: CommitteesHistoryTableViewModel<
      IllegalDropEventRecord | MixedIntoEventRecord
    >
  ) {
    event.stopImmediatePropagation();
    this.OnVideoClicked.emit(item);
  }
}
