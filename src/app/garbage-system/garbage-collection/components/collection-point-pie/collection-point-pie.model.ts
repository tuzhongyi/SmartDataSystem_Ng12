import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';

export interface ICollectionPointPieSearchInfo {
  DivisionIds?: string[];
  Classifications?: CollectionPointClassification[];
}
