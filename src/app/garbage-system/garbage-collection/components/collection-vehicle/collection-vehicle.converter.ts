import {
  AbstractCommonModelConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { GarbageCollectionEventRecord } from 'src/app/network/model/vehicle-event-record.model';
import { CollectionVehicleModel } from './collection-vehicle.model';

export class CollectionVehicleConverter extends AbstractCommonModelConverter<CollectionVehicleModel> {
  Convert(source: CommonModelSource, ...res: any[]) {
    if (source instanceof GarbageVehicle) {
      return this._fromGarbageVehicle(source);
    }
    throw new TypeError('类型出错');
  }

  private _fromGarbageVehicle(item: GarbageVehicle) {
    let model = new CollectionVehicleModel<GarbageVehicle>();
    model.Id = item.Id;
    model.Name = item.Name;
    model.Type = item.VehicleType;
    model.rawData = item;

    return model;
  }
}
