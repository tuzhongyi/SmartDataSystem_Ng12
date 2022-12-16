import { Injectable } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import {
  AbstractCommonModelConverter,
  AbstractCommonModelPromiseConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { CollectionPoint } from 'src/app/network/model/collection-point.model';
import { Division } from 'src/app/network/model/division.model';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { CollectionPointWindowModel } from './collection-point-window.model';

@Injectable()
export class CollectionPointWindowConverter extends AbstractCommonModelPromiseConverter<CollectionPointWindowModel> {
  private _divisonMap = new Map<string, Division>();

  constructor(
    private _collectionDivisionRequest: CollectionDivisionRequestService
  ) {
    super();
  }
  Convert(source: CommonModelSource, ...res: any[]) {
    if (source instanceof CollectionPoint) {
      return this._fromCollectionPoint(source);
    }
    throw new TypeError('类型出错');
  }

  private async _fromCollectionPoint(source: CollectionPoint) {
    let model = new CollectionPointWindowModel();
    model.Id = source.Id;
    model.Name = source.Name;
    model.Address = source.Address ?? Language.json.Unknow;
    model.Classification = Language.CollectionPointClassification(
      source.Classification
    );
    model.DivisionName = Language.json.Unknow;

    if (source.DivisionId) {
      if (this._divisonMap.has(source.DivisionId)) {
        let division = this._divisonMap.get(source.DivisionId)!;
        model.DivisionName = division.Name;
      } else {
        let division = await this._collectionDivisionRequest.get(
          source.DivisionId
        );
        model.DivisionName = division.Name;

        this._divisonMap.set(source.DivisionId, division);
      }
    }
    model.RawData = source;

    return model;
  }
}
