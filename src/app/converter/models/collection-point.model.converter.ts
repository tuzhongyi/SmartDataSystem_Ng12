import { Injectable } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { IConverter } from '../../common/interfaces/converter.interface';
import { CollectionPoint } from '../../network/model/collection-point.model';
import { CollectionPointModel } from '../../network/view-model/collection-point.view-model';

@Injectable({
  providedIn: 'root',
})
export class CollectionPointModelConverter
  implements IConverter<CollectionPoint, CollectionPointModel>
{
  constructor(private service: CollectionDivisionRequestService) {}
  Convert(source: CollectionPoint, ...res: any[]): CollectionPointModel {
    let plain = classToPlain(source);
    let model = plainToClass(CollectionPointModel, plain);
    if (source.DivisionId) {
      model.Division = this.service.get(source.DivisionId);
    }
    return model;
  }
}
