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
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { EventType } from 'src/app/enum/event-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { TaskTableBusiness } from './task-table.business';
import { TaskTableConverter } from './task-table.converter';
import { TaskTableViewModel } from './task-table.model';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
  providers: [TaskTableConverter, TaskTableBusiness],
})
export class TaskTableComponent
  implements
    OnInit,
    OnChanges,
    OnDestroy,
    IComponent<GarbageDropEventRecord[], TaskTableViewModel[]>
{
  @Input()
  Committees?: Division;

  @Output()
  OnItemClicked: EventEmitter<GarbageDropEventRecord> = new EventEmitter();

  constructor(
    business: TaskTableBusiness,
    private store: GlobalStorageService
  ) {
    this.business = business;
  }

  business: IBusiness<GarbageDropEventRecord[], TaskTableViewModel[]>;
  views?: TaskTableViewModel[];
  headWidths = ['10%', '25%', '15%', '20%', '15%', 'calc(15% - 8px)', '8px'];
  bodyWidths = ['10%', '25%', '15%', '20%', '15%', '15%'];
  key = 'task-table';
  EventType = EventType;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Committees) {
      if (this.Committees) {
        this.onLoaded();
      }
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

  itemClick(item: TaskTableViewModel) {
    if (this.views) {
      let view = this.views.find((x) => x.Id == item.Id);
      if (view) {
        this.OnItemClicked.emit(view.data);
      }
    }
  }

  onLoaded() {
    this.show();
  }

  show() {
    if (this.Committees) {
      this.business.load(this.Committees.Id).then((records) => {
        this.views = records;
      });
    }
  }
}
