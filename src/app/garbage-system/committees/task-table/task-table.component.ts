import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TaskTableBusiness } from './task-table.business';
import { TaskTableViewModel } from './task-table.model';
import { TaskTableConverter } from './task-table.converter';
import { DatePipe } from '@angular/common';
import { GarbageDropEventRecord } from 'src/app/network/model/event-record.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { Division } from 'src/app/network/model/division.model';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { StoreService } from 'src/app/global/service/store.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
  providers: [TaskTableBusiness],
})
export class TaskTableComponent
  implements
    OnInit,
    OnChanges,
    IComponent<GarbageDropEventRecord[], TaskTableViewModel[]>
{
  @Input()
  Committees?: Division;

  @Output()
  OnItemClicked: EventEmitter<GarbageDropEventRecord> = new EventEmitter();

  constructor(business: TaskTableBusiness, private store: StoreService) {
    this.business = business;
  }

  business: IBusiness<GarbageDropEventRecord[], TaskTableViewModel[]>;
  views?: TaskTableViewModel[];
  headWidths = ['10%', '25%', '15%', '20%', '15%', 'calc(15% - 8px)', '8px'];
  bodyWidths = ['10%', '25%', '15%', '20%', '15%', '15%'];

  EventType = EventType;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Committees) {
      if (this.Committees) {
        this.onLoaded();
      }
    }
  }

  ngOnInit() {
    this.store.interval.subscribe(() => {
      this.show();
    });
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
