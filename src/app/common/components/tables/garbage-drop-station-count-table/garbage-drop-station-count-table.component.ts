import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import {
  GarbageDropStationCountTableBusiness,
  GarbageDropStationCountTableBusinessProviders
} from './garbage-drop-station-count-table.business';
import {
  GarbageDropStationCountTableArgs,
  GarbageDropStationCountTableModel
} from './garbage-drop-station-count-table.model';

@Component({
  selector: 'howell-garbage-drop-station-count-table',
  templateUrl: './garbage-drop-station-count-table.component.html',
  styleUrls: [
    '../table.less',
    './garbage-drop-station-count-table.component.less'
  ],
  providers: [...GarbageDropStationCountTableBusinessProviders]
})
export class GarbageDropStationCountTableComponent
  extends PagedTableAbstractComponent<GarbageDropStationCountTableModel>
  implements OnInit, OnChanges
{
  @Input() args = new GarbageDropStationCountTableArgs();

  @Input() load?: EventEmitter<GarbageDropStationCountTableArgs>;
  @Output() loaded: EventEmitter<GarbageDropStationCountTableModel[]> =
    new EventEmitter();

  constructor(private business: GarbageDropStationCountTableBusiness) {
    super();
  }

  widths: string[] = ['10%', '25%', '15%', '15%', '15%', '15%'];
  get is() {
    return this.business.is;
  }
  sort?: Sort;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load) {
      if (this.load) {
        this.load.subscribe((x) => {
          this.loadData();
        });
      }
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  get = {
    widths: (isstaiton: boolean) => {
      if (isstaiton) {
        return ['10%', '25%', '15%', '15%', '10%', '10%', '15%'];
      }
      return ['10%', '25%', '15%', '15%', '15%', '15%'];
    }
  };

  async loadData() {
    this.loading = true;
    this.business
      .load(this.args)
      .then((x) => {
        this.datas = x;
        this.widths = this.get.widths(this.business.is.station);
        if (!this.sort) {
          this.sort = {
            active: 'EventCount',
            direction: 'desc'
          };
        }
        this.sortData(this.sort);
        this.loaded.emit(this.datas);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    if (typeof a === 'string' && typeof b === 'string') {
      return isAsc ? a.localeCompare(b) : b.localeCompare(a);
    } else if (typeof a === 'number' && typeof b === 'number') {
      return isAsc ? a - b : b - a;
    }
    return 0;
  }

  sortData(sort: Sort) {
    this.sort = sort;
    if (this.datas) {
      const isAsc = sort.direction === 'asc';
      this.datas = this.datas.sort((a, b) => {
        return this.compare(a[sort.active], b[sort.active], isAsc);
      });
    }
  }
}
