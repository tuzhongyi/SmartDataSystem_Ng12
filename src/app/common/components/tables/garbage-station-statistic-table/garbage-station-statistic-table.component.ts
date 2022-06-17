import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { OrderType } from 'src/app/enum/order-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Language } from 'src/app/global/tool/language';
import { IModel } from 'src/app/network/model/model.interface';

import { OrderModel } from 'src/app/view-model/order.model';
import { SelectItem } from '../../select-control/select-control.model';
import { GarbageStationStatisticTableBusiness } from './garbage-station-statistic-table.business';
import { GarbageStationStatisticModel } from './garbage-station-statistic.model';

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

  constructor(business: GarbageStationStatisticTableBusiness) {
    this.business = business;
  }

  Language = Language;
  Math = Math;
  width = ['12%', '10%', '10%', '8%', '8%', '12%', '12%', '12%', '8%', '8%'];
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
  async loadData() {
    let datas = await this.business.load(this.date, this.unit, this.divisionId);

    datas = datas.sort((a, b) => {
      switch (this.order.type) {
        case OrderType.Asc:
          return a[this.order.name] - b[this.order.name];
        case OrderType.Desc:
          return b[this.order.name] - a[this.order.name];
        default:
          return 0;
      }
    });
    this.datas = datas;
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
