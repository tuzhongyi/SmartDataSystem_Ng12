import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { IModel } from 'src/app/network/model/model.interface';
import { GarbageStationCountTableBusiness } from './garbage-station-count-table.business';
import { DivisionModel } from './garbage-station-count-table.model';
import { GarbageStationCountTableService } from './garbage-station-count-table.service';

@Component({
  selector: 'garbage-station-count-table',
  templateUrl: './garbage-station-count-table.component.html',
  styleUrls: ['./garbage-station-count-table.component.less'],
  providers: [
    GarbageStationCountTableService,
    GarbageStationCountTableBusiness,
  ],
})
export class GarbageStationCountTableComponent
  implements IComponent<IModel, DivisionModel[]>, OnInit
{
  @Input() business: IBusiness<IModel, DivisionModel[]>;

  @Input() load?: EventEmitter<void>;
  @Output() info = new EventEmitter<Division>();
  constructor(business: GarbageStationCountTableBusiness) {
    this.business = business;
  }
  datas: DivisionModel[] = [];

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

  oninfo(item: DivisionModel) {
    this.info.emit(item);
  }
}
