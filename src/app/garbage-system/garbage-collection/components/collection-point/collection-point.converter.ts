import { formatDate } from '@angular/common';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { GarbageCollectionEventRecord } from 'src/app/network/model/vehicle-event-record.model';
import { CollectionPointModel } from './collection-point.model';

export class CollectionPointConverter extends AbstractCommonModelConverter<CollectionPointModel> {
  Convert(source: CommonModelSource, ...res: any[]): CollectionPointModel {
    if (source instanceof GarbageCollectionEventRecord) {
      return this._fromGarbageCollectionEventRecord(source);
    }
    throw new TypeError('类型出错');
  }

  private _fromGarbageCollectionEventRecord(
    record: GarbageCollectionEventRecord
  ) {
    let model = new CollectionPointModel();
    model.CollectionPointName = record.Data.CollectionPointName ?? '';
    model.Weight = record.Data.Weight ?? 0;
    model.EventTime = record.EventTime;

    return model;
  }
}
