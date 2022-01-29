import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { OrderType } from 'src/app/enum/order-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Language } from 'src/app/global/tool/language';
import { IModel } from 'src/app/network/model/model.interface';
import { OrderModel } from 'src/app/view-model/order.model';
import { EventRecordFilter } from '../event-record-table/event-record.model';
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
  implements IComponent<IModel, GarbageStationStatisticModel[]>, OnInit
{
  constructor(business: GarbageStationStatisticTableBusiness) {
    this.business = business;
  }
  Language = Language;
  Math = Math;
  width = ['17%', '13%', '16%', '16%', '16%', '13%', '9%'];
  loading = false;
  ngOnInit() {
    this.loadData();
  }

  business: IBusiness<IModel, GarbageStationStatisticModel[]>;

  datas?: GarbageStationStatisticModel[];

  order: OrderModel = new OrderModel('GarbageRatio', OrderType.Asc);

  async loadData() {
    let filter = new EventRecordFilter();

    let datas = await this.business.load(
      { BeginTime: filter.begin, EndTime: filter.end },
      TimeUnit.Day
    );
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
    console.log(this.datas);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    if (this.datas) {
      this.datas = this.datas.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
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
