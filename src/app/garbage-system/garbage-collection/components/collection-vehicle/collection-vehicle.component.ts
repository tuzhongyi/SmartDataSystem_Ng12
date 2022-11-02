import { Component, OnInit } from '@angular/core';
import { CollectionVehicleBusiness } from './collection-vehicle.business';
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
  ],
})
export class CollectionVehicleComponent implements OnInit {
  tdWidth = ['15%', '10%', '5%'];

  dataSource: CollectionVehicleModel[] = [];

  searchInfo: CollectionVehicleSearchInfo = {
    BeginTime: new Date(),
    EndTime: new Date(),
  };

  constructor(private _business: CollectionVehicleBusiness) {}

  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    this.dataSource = await this._business.init(this.searchInfo);
    console.log(this.dataSource);
  }
}
