import {
  AbstractCommonModelConverter,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { GarbageCollectionEventRecord } from 'src/app/network/model/vehicle-event-record.model';
import { CollectionListWindowModel } from './collection-list-window.model';

export class CollectionListWindowConverter extends AbstractCommonModelConverter<CollectionListWindowModel> {
  Convert(source: modelSource, ...res: any[]): CollectionListWindowModel {
    if (source instanceof GarbageCollectionEventRecord) {
      return this._fromGarbageCollectionEventRecord(source);
    }
    throw new TypeError('类型出错');
  }

  private _fromGarbageCollectionEventRecord(
    source: GarbageCollectionEventRecord
  ) {
    let model = new CollectionListWindowModel();
    model.Id = source.EventId;
    model.CollectionPointName = source.Data.CollectionPointName ?? '未知';

    model.DivisionName = source.Data.DivisionName ?? '未知';
    model.MemberName = source.Data.MemberName ?? '未知';
    model.TrashCanName = source.Data.TrashCanName ?? '未知';
    model.VehicleName = source.Data.VehicleName ?? '未知';
    model.RawData = source;

    return model;
  }
}
