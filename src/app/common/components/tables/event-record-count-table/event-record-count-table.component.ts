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
import { Language } from 'src/app/common/tools/language';
import { IModel } from 'src/app/network/model/model.interface';
import { EventRecordCountTableBusiness } from './event-record-count-table.business';
import {
  EventRecordCountTableModel,
  EventRecordCountTableOptions,
} from './event-record-count-table.model';
import { EventRecordCountTableBusinessProviders } from './event-record-count-table.provider';

@Component({
  selector: 'howell-event-record-count-table',
  templateUrl: './event-record-count-table.component.html',
  styleUrls: ['../table.less', './event-record-count-table.component.less'],
  providers: [...EventRecordCountTableBusinessProviders],
})
export class EventRecordCountTableComponent
  implements
    OnInit,
    OnChanges,
    IComponent<IModel, EventRecordCountTableModel[]>
{
  @Input() opts = new EventRecordCountTableOptions();
  @Input() load?: EventEmitter<EventRecordCountTableOptions>;
  @Output() loaded: EventEmitter<EventRecordCountTableModel[]> =
    new EventEmitter();

  constructor(business: EventRecordCountTableBusiness) {
    this.business = business;
  }
  ngOnChanges(changes: SimpleChanges): void {}
  widths = ['10%', '30%', '30%', '40%'];
  business: IBusiness<IModel, EventRecordCountTableModel[]>;
  datas: EventRecordCountTableModel[] = [];
  loading = false;
  Language = Language;
  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.opts = x;
        this.loadData();
      });
    }
    this.loadData();
  }

  async loadData() {
    this.loading = true;

    this.business.load(this.opts).then((datas) => {
      this.datas = datas;
      this.loading = false;
      this.loaded.emit(datas);
    });
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
