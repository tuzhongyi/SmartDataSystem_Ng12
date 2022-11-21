import {
  AbstractCommonModelConverter,
  M,
} from 'src/app/converter/common-model.converter';
import { CollectionPointStatisticModel } from './collection-point-statistic.model';

export class CollectionPointStatisticConverter extends AbstractCommonModelConverter<CollectionPointStatisticModel> {
  Convert(source: M, ...res: any[]): CollectionPointStatisticModel {
    return new CollectionPointStatisticModel();
  }
}
