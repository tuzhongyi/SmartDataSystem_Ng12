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
import { OrderType } from 'src/app/enum/order-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { IModel } from 'src/app/network/model/model.interface';

import { OrderModel } from 'src/app/view-model/order.model';
import { SelectItem } from '../../select-control/select-control.model';
import { GarbageStationStatisticTableBusiness } from './garbage-station-statistic-table.business';
import { GarbageStationStatisticModel } from './garbage-station-statistic.model';

interface TableWidth {
  current: number;
  signal: number;
  differ: number;
}

@Component({
  selector: 'howell-garbage-station-statistic-table',
  templateUrl: './garbage-station-statistic-table.component.html',
  styleUrls: [
    '../table.less',
    './garbage-station-statistic-table.component.less',
  ],
  providers: [GarbageStationStatisticTableBusiness],
})
export class GarbageStationStatisticTableComponent
  implements
    IComponent<IModel, GarbageStationStatisticModel[]>,
    OnInit,
    OnChanges
{
  @Input()
  unit: TimeUnit = TimeUnit.Day;

  @Input()
  date: Date = new Date();
  @Input()
  divisionId?: string;
  @Input()
  load?: EventEmitter<void>;
  @Output()
  loaded: EventEmitter<GarbageStationStatisticModel[]> = new EventEmitter();

  constructor(business: GarbageStationStatisticTableBusiness) {
    this.business = business;
  }

  Language = Language;
  Math = Math;
  widths = [
    '200px', // 1
    undefined, // 2
    undefined, // 3
    undefined, // 4
    '60px', // 5
    '16px', // 6
    '60px', // 7
    '127px', // 8
    '16px', // 9
    '87px', // 10
    '127px', // 11
    '16px', // 12
    '87px', // 13
    '127px', // 14
    '16px', // 15
    '87px', // 16
    '60px', // 17
    '16px', // 18
    '60px', // 19
    '60px', // 20
    '16px', // 21
    '60px', // 22
  ];

  tabelWidth: TableWidth[] = [{ current: 60, signal: 16, differ: 60 }];

  loading = false;
  ngOnInit() {
    this.loadData();
  }

  /** 居委会 */
  committees: SelectItem[] = [];
  /** 居委会 */
  county: SelectItem[] = [];

  business: IBusiness<IModel, GarbageStationStatisticModel[]>;

  datas?: GarbageStationStatisticModel[];

  order: OrderModel = new OrderModel('GarbageRatio', OrderType.Asc);
  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.date && !changes.date.firstChange) ||
      (changes.unit && !changes.unit.firstChange)
    ) {
      this.loadData();
    }
    if (changes.load) {
      if (this.load) {
        this.load.subscribe((x) => {
          this.loadData();
        });
      }
    }
  }
  loadData() {
    this.loading = true;
    this.business.load(this.date, this.unit, this.divisionId).then((data) => {
      this.datas = data.sort((a, b) => {
        switch (this.order.type) {
          case OrderType.Asc:
            return a[this.order.name] - b[this.order.name];
          case OrderType.Desc:
            return b[this.order.name] - a[this.order.name];
          default:
            return 0;
        }
      });
      if (!this.sort) {
        this.sort = {
          active: 'GarbageRatio',
          direction: 'asc',
        };
      }
      this.sortData(this.sort);
      this.datas = data;
      this.loading = false;
      this.loaded.emit(this.datas);
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

  sort?: Sort;
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

enum TableClumn {
  Name = 'Name',
  GarbageRatio = 'GarbageRatio',
  AvgGarbageTime = 'AvgGarbageTime',
  MaxGarbageTime = 'MaxGarbageTime',
  GarbageDuration = 'GarbageDuration',
  IllegalDrop = 'IllegalDrop',
  MixedInto = 'MixedInto',
}
