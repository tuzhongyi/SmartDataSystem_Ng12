import { Injectable } from '@angular/core';
import { IConverter } from '../common/interfaces/converter.interface';
import { CollectionPoint } from '../network/model/collection-point.model';
import { CollectionPointModel } from '../network/view-model/collection-point.view-model';

@Injectable({
  providedIn: 'root',
})
export class CollectionPointConverter
  implements IConverter<CollectionPoint, CollectionPointModel>
{
  Convert(source: CollectionPoint, ...res: any[]): CollectionPointModel {
    throw new Error('Method not implemented.');
  }
}
