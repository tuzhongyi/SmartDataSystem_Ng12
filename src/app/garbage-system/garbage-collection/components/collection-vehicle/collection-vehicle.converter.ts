import {
  AbstractCommonModelConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { GarbageCollectionEventRecord } from 'src/app/network/model/vehicle-event-record.model';
import { CollectionVehicleModel } from './collection-vehicle.model';

export class CollectionVehicleConverter extends AbstractCommonModelConverter<
  CollectionVehicleModel,
  GarbageCollectionEventRecord
> {
  Convert(source: CommonModelSource, ...res: any[]): CollectionVehicleModel {
    if (source instanceof GarbageCollectionEventRecord) {
      return this._fromGarbageCollectionEventRecord(source);
    }
    throw new TypeError('类型出错');
  }

  private _fromGarbageCollectionEventRecord(
    record: GarbageCollectionEventRecord
  ) {
    let model = new CollectionVehicleModel();
    model.VehicleName = record.Data.VehicleName;
    model.MemberName = record.Data.MemberName ?? '';

    return model;
  }
}
