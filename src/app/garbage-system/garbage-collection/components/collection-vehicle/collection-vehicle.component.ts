import { Component, OnInit } from '@angular/core';
import { Time } from 'src/app/common/tools/time';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { CollectionVehicleBusiness } from './collection-vehicle.business';
import { CollectionVehicleConverter } from './collection-vehicle.converter';
import {
  CollectionVehicleModel,
  CollectionVehicleSearchInfo,
} from './collection-vehicle.model';

@Component({
  selector: 'collection-vehicle',
  templateUrl: './collection-vehicle.component.html',
  styleUrls: ['./collection-vehicle.component.less'],
  providers: [
    {
      provide: CollectionVehicleBusiness,
      useClass: CollectionVehicleBusiness,
    },
    CollectionVehicleConverter,
  ],
})
export class CollectionVehicleComponent implements OnInit {
  tdWidth = ['15%', '10%', '5%'];

  dataSource: CollectionVehicleModel[] = [];

  searchInfo: CollectionVehicleSearchInfo = {
    DivisionIds: [],
  };

  constructor(private _business: CollectionVehicleBusiness) {}

  ngOnInit(): void {
    this._init();

    // console.log(DurationParams.allDay(new Date()));

    // console.log(Time.curWeek(new Date()));
  }
  private async _init() {
    this.dataSource = await this._business.init(this.searchInfo);
    // console.log(this.dataSource);
  }
}
