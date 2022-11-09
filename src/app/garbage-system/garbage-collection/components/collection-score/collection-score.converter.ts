import { AbstractCommonModelConverter } from 'src/app/converter/common-model.converter';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { GarbageCollectionEventRecord } from 'src/app/network/model/vehicle-event-record.model';
import { CollectionScoreModel } from './collection-score.model';

export class CollectionScoreConverter extends AbstractCommonModelConverter<CollectionScoreModel> {
  Convert(source: GarbageCollectionEventRecord[], type: CollectionPointScore) {
    let model = new CollectionScoreModel();

    model.chartData = source.map((item) => {
      if (item.Data.Score == type) {
        return item.Data.Weight ? item.Data.Weight / 1000 : 0;
      }
      return 0;
    });
    return model;
  }
}
