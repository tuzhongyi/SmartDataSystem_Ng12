import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { TableAbstractComponent } from '../table-abstract.component';
import { GarbageDropStationCountTableBusiness } from './garbage-drop-station-count-table.business';
import { GarbageDropStationCountTableModel } from './garbage-drop-station-count-table.model';

@Component({
  selector: 'howell-garbage-drop-station-count-table',
  templateUrl: './garbage-drop-station-count-table.component.html',
  styleUrls: [
    '../table.less',
    './garbage-drop-station-count-table.component.less',
  ],
  providers: [GarbageDropStationCountTableBusiness],
})
export class GarbageDropStationCountTableComponent
  extends TableAbstractComponent<GarbageDropStationCountTableModel>
  implements
    IComponent<IModel, GarbageDropStationCountTableModel[]>,
    OnInit,
    OnChanges
{
  @Input()
  business: IBusiness<IModel, GarbageDropStationCountTableModel[]>;
  @Input()
  date: Date = new Date();
  @Input()
  unit: TimeUnit = TimeUnit.Day;
  @Input()
  type: UserResourceType = UserResourceType.Committees;
  @Input()
  load?: EventEmitter<void>;

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
  width: string[] = ['30%', '25%', '15%', '15%', '15%'];
  sort?: Sort;

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.loading = true;
    this.business.load(this.date, this.unit, this.type).then((x) => {
      this.loading = false;
      this.datas = x;
      if (!this.sort) {
        this.sort = {
          active: 'EventCount',
          direction: 'desc',
        };
      }
      this.sortData(this.sort);
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
        if (sort.active === 'Parent') {
          if (a.Parent && b.Parent) {
            return this.compare(a.Parent.Name, b.Parent.Name, isAsc);
          }
          return 0;
        }
        return this.compare(a[sort.active], b[sort.active], isAsc);
      });
    }
  }
}
