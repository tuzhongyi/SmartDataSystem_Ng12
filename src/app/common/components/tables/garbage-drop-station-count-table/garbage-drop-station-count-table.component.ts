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
import { IModel } from 'src/app/network/model/model.interface';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { GarbageDropStationCountTableBusiness } from './garbage-drop-station-count-table.business';
import { GarbageDropStationCountTableConverter } from './garbage-drop-station-count-table.converter';
import {
  GarbageDropStationCountTableArgs,
  GarbageDropStationCountTableModel,
} from './garbage-drop-station-count-table.model';
import { GarbageDropStationCountTableService } from './garbage-drop-station-count-table.service';

@Component({
  selector: 'howell-garbage-drop-station-count-table',
  templateUrl: './garbage-drop-station-count-table.component.html',
  styleUrls: [
    '../table.less',
    './garbage-drop-station-count-table.component.less',
  ],
  providers: [
    GarbageDropStationCountTableService,
    GarbageDropStationCountTableConverter,
    GarbageDropStationCountTableBusiness,
  ],
})
export class GarbageDropStationCountTableComponent
  extends PagedTableAbstractComponent<GarbageDropStationCountTableModel>
  implements
    IComponent<IModel, GarbageDropStationCountTableModel[]>,
    OnInit,
    OnChanges
{
  @Input()
  business: IBusiness<IModel, GarbageDropStationCountTableModel[]>;

  @Input()
  args = new GarbageDropStationCountTableArgs();

  @Input()
  load?: EventEmitter<GarbageDropStationCountTableArgs>;
  @Output()
  loaded: EventEmitter<GarbageDropStationCountTableModel[]> =
    new EventEmitter();

  constructor(business: GarbageDropStationCountTableBusiness) {
    super();
    this.business = business;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load) {
      if (this.load) {
        this.load.subscribe((x) => {
          this.loadData();
        });
      }
    }
  }
  widths: string[] = ['10%', '25%', '15%', '15%', '15%'];
  sort?: Sort;

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.loading = true;
    this.business.load(this.args).then((x) => {
      this.loading = false;
      this.datas = x;
      if (!this.sort) {
        this.sort = {
          active: 'EventCount',
          direction: 'desc',
        };
      }
      this.sortData(this.sort);
      this.loaded.emit(this.datas);
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
