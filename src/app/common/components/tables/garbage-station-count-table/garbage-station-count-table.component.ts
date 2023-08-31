import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { GarbageStationCountTableBusiness } from './garbage-station-count-table.business';
import { DivisionModel } from './garbage-station-count-table.model';
import { GarbageStationCountTableService } from './garbage-station-count-table.service';

@Component({
  selector: 'garbage-station-count-table',
  templateUrl: './garbage-station-count-table.component.html',
  styleUrls: [
    '../table-vertical.less',
    './garbage-station-count-table.component.less',
  ],
  providers: [
    GarbageStationCountTableService,
    GarbageStationCountTableBusiness,
  ],
})
export class GarbageStationCountTableComponent
  extends PagedTableAbstractComponent<DivisionModel>
  implements IComponent<IModel, DivisionModel[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, DivisionModel[]>;

  @Input()
  load?: EventEmitter<void>;
  constructor(business: GarbageStationCountTableBusiness) {
    super();
    this.business = business;
  }

  widths = [undefined, '15%'];

  ngOnInit(): void {
    this.tosubscribe();
    this.loadData();
  }

  tosubscribe() {
    if (this.load) {
      this.load.subscribe((x) => {
        this.loadData();
      });
    }
  }

  async loadData() {
    this.business.load().then((datas) => {
      this.datas = datas;
    });
  }
}
