import {
  CommonModelConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { GarbageCollectionEventRecord } from 'src/app/network/model/vehicle-event-record.model';
import { CollectionDeviceStateModel } from './collection-device-state.model';

export class CollectionVehicleConverter extends CommonModelConverter<
  CollectionDeviceStateModel,
  GarbageCollectionEventRecord
> {
  Convert(source: CommonModelSource, ...res: any[]): CollectionDeviceStateModel {
    if (source instanceof GarbageCollectionEventRecord) {
      return this._fromGarbageCollectionEventRecord(source);
    }
    throw new TypeError('类型出错');
  }

  private _fromGarbageCollectionEventRecord(
    record: GarbageCollectionEventRecord
  ) {
    let model = new CollectionDeviceStateModel();
    model.VehicleName = record.Data.VehicleName;
    model.MemberName = record.Data.MemberName ?? '';

    return model;
  }
}
