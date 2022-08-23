import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Language } from 'src/app/common/tools/language';
import { IModel } from 'src/app/network/model/model.interface';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { EventRecordCountTableBusiness } from './event-record-count-table.business';
import {
  EventRecordCountTableModel,
  EventRecordCountTableOptions,
} from './event-record-count-table.model';

@Component({
  selector: 'howell-event-record-count-table',
  templateUrl: './event-record-count-table.component.html',
  styleUrls: ['../table.less', './event-record-count-table.component.less'],
  providers: [EventRecordCountTableBusiness],
})
export class EventRecordCountTableComponent
  implements
  OnInit,
  OnChanges,
  IComponent<IModel, EventRecordCountTableModel[]>
{
  @Input()
  eventType = EventType.IllegalDrop;
  @Input()
  unit: TimeUnit = TimeUnit.Day;
  @Input()
  type: UserResourceType = UserResourceType.Station;
  @Input()
  date: Date = new Date();
  @Input()
  load?: EventEmitter<void>;
  @Output()
  loaded: EventEmitter<EventRecordCountTableModel[]> = new EventEmitter();

  constructor(business: EventRecordCountTableBusiness) {
    this.business = business;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load && this.load) {
      this.load.subscribe((x) => {
        this.loadData();
      });
    }
  }
  width = ['10%', '30%', '30%', '40%'];
  business: IBusiness<IModel, EventRecordCountTableModel[]>;
  datas: EventRecordCountTableModel[] = [];
  loading = false;
  Language = Language;
  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.loading = true;
    let interval = new DurationParams();
    switch (this.unit) {
      case TimeUnit.Day:
        interval = DurationParams.allDay(this.date);
        break;
      case TimeUnit.Week:
        interval = DurationParams.allWeek(this.date);
        break;
      case TimeUnit.Month:
        interval = DurationParams.allMonth(this.date);
        break;
      default:
        break;
    }

    let opts: EventRecordCountTableOptions = {
      unit: this.unit,
      eventType: this.eventType,
      type: this.type,
      ...interval,
    };
    this.business.load(opts).then((datas) => {
      this.datas = datas;
      this.loading = false;
      this.loaded.emit(datas);
    });
    console.log(this.datas);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    // return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    if (typeof a === 'string' && typeof b === 'string') {
      return isAsc ? a.localeCompare(b) : b.localeCompare(a);
    } else if (typeof a === 'number' && typeof b === 'number') {
      return isAsc ? a - b : b - a;
    }
    return 0;
  }

  sortData(sort: Sort) {
    if (this.datas) {
      const isAsc = sort.direction === 'asc';
      this.datas = this.datas.sort((a, b) => {
        switch (sort.active) {
          case 'value':
          case 'name':
            return this.compare(a[sort.active], b[sort.active], isAsc);
          case 'parent':
            if (a.parent && b.parent) {
              return this.compare(a.parent.Name, b.parent.Name, isAsc);
            }
            return 0;
          default:
            return 0;
        }
      });
    }
  }
}
