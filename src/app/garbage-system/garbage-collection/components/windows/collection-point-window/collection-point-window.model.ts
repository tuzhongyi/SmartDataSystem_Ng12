import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';

export class CollectionPointWindowModel<T = any> {
  Id!: string;

  Name!: string;

  DivisionName!: string;

  Classification!: string;

  Address!: string;

  RawData?: T;
}

export interface ICollectionPointWindowSearchInfo {
  DivisionIds: string[];
  PageIndex: number;
  PageSize: number;
  Condition: string;
  Type: CollectionPointClassification | '';
}
