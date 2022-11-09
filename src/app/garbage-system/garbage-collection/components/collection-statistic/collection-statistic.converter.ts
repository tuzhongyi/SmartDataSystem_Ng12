import { AbstractCommonModelConverter } from 'src/app/converter/common-model.converter';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { GarbageCollectionEventRecord } from 'src/app/network/model/vehicle-event-record.model';
import { CollectionStatisticModel } from './collection-statistic.model';

export class CollectionStatisticConverter extends AbstractCommonModelConverter<CollectionStatisticModel> {
  Convert(source: GarbageCollectionEventRecord[], type: TrashCanType) {
    let model = new CollectionStatisticModel();

    model.ChartData = source.map((item) => {
      if (item.Data.TrashCanType == type) {
        return item.Data.Weight ?? 0;
      }
      return 0;
    });
    let tmp = [];
    for (let i = 0; i < 25; i++) {
      tmp.push((Math.random() * 20) >> 0);
    }
    model.ChartData = tmp;
    return model;
  }
}
