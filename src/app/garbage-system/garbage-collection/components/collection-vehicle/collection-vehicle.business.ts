import { Injectable } from '@angular/core';
import {
  CollectionVehicleModel,
  CollectionVehicleSearchInfo,
} from './collection-vehicle.model';

@Injectable()
export class CollectionVehicleBusiness {
  constructor() {}
  init(searchInfo: CollectionVehicleSearchInfo) {
    let res: CollectionVehicleModel[] = [];

    for (let i = 0; i < 10; i++) {
      let model = new CollectionVehicleModel();
      model.VehicleName = '垃圾清运车' + (i + 1);
      model.MemberName = '小明';

      res.push(model);
    }

    return Promise.resolve(res);
  }
}
