import { Injectable } from '@angular/core';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { CollectionPoint } from 'src/app/network/model/collection-point.model';
import { DivisionGarbageWeight } from 'src/app/network/model/division-garbage-weight.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { CollectionMember } from 'src/app/network/model/member.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { Language } from '../../tools/language';
import { CommonStatisticCardModel } from './common-statistic-card.model';

@Injectable({
  providedIn: 'root',
})
export class CommonStatisticCardConverter extends AbstractCommonModelConverter<CommonStatisticCardModel> {
  Convert(source: modelSource, ...res: any[]) {
    if (source instanceof PagedList) {
      if (this._isGarbageVehicle(source.Data)) {
        return this._fromGarbageVehicle(source);
      } else if (this._isCollectionMember(source.Data)) {
        return this._fromCollectionMember(source);
      } else if (this._isCollectionPoint(source.Data)) {
        return this._fromCollectionPoint(source);
      }
    } else if (source instanceof DivisionGarbageWeight) {
      return this._fromDivisionGarbageWeight(source);
    }

    throw new TypeError();
  }

  private _fromGarbageVehicle(source: PagedList<GarbageVehicle>) {
    let model = new CommonStatisticCardModel();
    model.title = '垃圾清运车数量';
    model.content = '20';
    return model;
  }

  private _fromCollectionMember(source: PagedList<CollectionMember>) {
    let model = new CommonStatisticCardModel();
    model.title = '垃圾清运车数量';
    model.content = '20';
    return model;
  }

  private _fromCollectionPoint(source: PagedList<CollectionPoint>) {
    let model = new CommonStatisticCardModel();
    model.title = '垃圾清运车数量';
    model.content = '20';
    return model;
  }
  private _fromDivisionGarbageWeight(source: DivisionGarbageWeight) {
    let model = new CommonStatisticCardModel();
    model.title = '垃圾清运车数量';
    model.content = '20';
    return model;
  }

  private _isGarbageVehicle(
    data: CommonModelSource[]
  ): data is GarbageVehicle[] {
    return data.length == 0 || data[0] instanceof GarbageVehicle;
  }
  private _isCollectionMember(
    data: CommonModelSource[]
  ): data is CollectionMember[] {
    return data.length == 0 || data[0] instanceof CollectionMember;
  }
  private _isCollectionPoint(
    data: CommonModelSource[]
  ): data is CollectionPoint[] {
    return data.length == 0 || data[0] instanceof CollectionPoint;
  }
}
