import {
  AbstractCommonModelConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
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
    model.PlatNo = item.PlateNo ?? '未知';
    model.rawData = item;

    return model;
  }
}
