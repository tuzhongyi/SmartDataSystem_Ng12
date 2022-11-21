import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';

export interface ICollectionPointStatisticSearchInfo {
  DivisionIds?: string[];
  Classifications?: CollectionPointClassification[];
}
