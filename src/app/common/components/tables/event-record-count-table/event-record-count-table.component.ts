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
import { Language } from 'src/app/common/tools/language';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
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
export class EventRecordCountTableComponent implements OnInit, OnChanges {
  @Input() opts = new EventRecordCountTableOptions();
  @Input() load?: EventEmitter<EventRecordCountTableOptions>;
  @Output() loaded: EventEmitter<EventRecordCountTableModel[]> =
    new EventEmitter();

  constructor(private business: EventRecordCountTableBusiness) {}
  ngOnChanges(changes: SimpleChanges): void {}

  widths = ['10%', '30%', '30%', '30%'];
  get is() {
    return this.business.is;
  }

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

  get = {
    widths: (isstation: boolean) => {
      if (isstation) {
        return ['10%', '20%', '20%', '20%', '30%'];
      }
      return ['10%', '30%', '30%', '30%'];
    },
  };

  async loadData() {
    this.loading = true;

    this.business
      .load(this.opts)
      .then((datas) => {
        this.datas = datas;
        this.widths = this.get.widths(this.business.is.station);
        this.loaded.emit(datas);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  sortData(sort: Sort) {
    if (this.datas) {
      const isAsc = sort.direction === 'asc';
      this.datas = this.datas.sort((a, b) => {
        switch (sort.active) {
          case 'value':
          case 'name':
            return LocaleCompare.compare(a[sort.active], b[sort.active], isAsc);
          case 'parent':
            return LocaleCompare.compare(a.parent?.Name, b.parent?.Name, isAsc);

          case 'community':
            return LocaleCompare.compare(a.community, b.community, isAsc);

          default:
            return 0;
        }
      });
    }
  }
}
