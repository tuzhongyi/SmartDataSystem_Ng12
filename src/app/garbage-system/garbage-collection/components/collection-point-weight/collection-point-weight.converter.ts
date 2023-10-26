import {
  AbstractCommonModelConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { GarbageCollectionEventRecord } from 'src/app/network/model/garbage-station/vehicle-event-record.model';
import { CollectionPointWeightModel } from './collection-point-weight.model';

export class CollectionPointWeightConverter extends AbstractCommonModelConverter<CollectionPointWeightModel> {
  Convert(
    source: CommonModelSource,
    ...res: any[]
  ): CollectionPointWeightModel {
    if (source instanceof GarbageCollectionEventRecord) {
      return this._fromGarbageCollectionEventRecord(source);
    }
    throw new TypeError('类型出错');
  }

  private _fromGarbageCollectionEventRecord(
    record: GarbageCollectionEventRecord
  ) {
    let model = new CollectionPointWeightModel();
    model.CollectionPointName = record.Data.CollectionPointName ?? '';
    model.Weight = record.Data.Weight ?? 0;
    model.EventTime = record.EventTime;

    return model;
  }
}
