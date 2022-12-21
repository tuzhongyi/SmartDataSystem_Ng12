import { Injectable } from '@angular/core';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
  modelSource,
} from 'src/app/converter/common-model.converter';
import {
  CollectionMemberWindowComponent,
  CollectionPointWindowComponent,
  CollectionVehicleWindowComponent,
  CollectionRecordWindowComponent,
} from 'src/app/garbage-system/garbage-collection/components/windows';
import { CollectionDivisionStatisticNumber } from 'src/app/network/model/collection-division-statistic-number.model';
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
export class CommonStatisticCardConverter extends AbstractCommonModelConverter<
  CommonStatisticCardModel | CommonStatisticCardModel[]
> {
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
    } else if (source instanceof CollectionDivisionStatisticNumber) {
      return this._fromCollectionDivisionStatisticNumber(source);
    }

    throw new TypeError();
  }

  private _fromGarbageVehicle(source: PagedList<GarbageVehicle>) {
    let model = new CommonStatisticCardModel();
    model.componentExpression = CollectionVehicleWindowComponent;
    model.Title = '垃圾清运车数量';
    model.Content = source.Data.length.toString();
    return model;
  }
  private _fromDivisionGarbageWeight(source: DivisionGarbageWeight) {
    let model = new CommonStatisticCardModel();
    model.Title = '垃圾清运数量(吨)';

    if (source.Weights) {
      let total = source.Weights.reduce((prev: number, cur) => {
        return cur.Weight + prev;
      }, 0);

      // 遍历数组获得值
      model.Content = total.toString();
    }
    // 直接使用属性值
    model.Content = source.TotalWeight.toString();

    model.componentExpression = CollectionRecordWindowComponent;
    return model;
  }
  private _fromCollectionMember(source: PagedList<CollectionMember>) {
    let model = new CommonStatisticCardModel();
    model.Title = '清运人员';
    model.Content = source.Data.length.toString();
    model.componentExpression = CollectionMemberWindowComponent;
    return model;
  }

  private _fromCollectionPoint(source: PagedList<CollectionPoint>) {
    let model = new CommonStatisticCardModel();
    model.Title = '垃圾收运点位';
    model.Content = source.Data.length.toString();
    model.componentExpression = CollectionPointWindowComponent;
    return model;
  }

  private _fromCollectionDivisionStatisticNumber(
    source: CollectionDivisionStatisticNumber
  ) {
    let res: CommonStatisticCardModel[] = [];

    let model = new CommonStatisticCardModel();
    model.Title = '垃圾清运车数量';
    model.componentExpression = CollectionVehicleWindowComponent;
    model.Content = source.GarbageVehicleNumber
      ? source.GarbageVehicleNumber.toString()
      : '0';
    res.push(model);

    model = new CommonStatisticCardModel();
    model.Title = '垃圾清运数量(吨)';
    model.componentExpression = CollectionRecordWindowComponent;
    model.Content = source.Weight ? source.Weight.toString() : '0';
    res.push(model);

    model = new CommonStatisticCardModel();
    model.Title = '清运人员';
    model.componentExpression = CollectionMemberWindowComponent;
    model.Content = source.MemberNumber ? source.MemberNumber.toString() : '0';
    res.push(model);

    model = new CommonStatisticCardModel();
    model.Title = '垃圾收运点位';
    model.componentExpression = CollectionPointWindowComponent;
    model.Content = source.CollectionPointNumber
      ? source.CollectionPointNumber.toString()
      : '0';
    res.push(model);

    return res;
  }

  private _isGarbageVehicle(
    data: CommonModelSource[]
  ): data is GarbageVehicle[] {
    return data.length > 0 && data[0] instanceof GarbageVehicle;
  }
  private _isCollectionMember(
    data: CommonModelSource[]
  ): data is CollectionMember[] {
    return data.length > 0 && data[0] instanceof CollectionMember;
  }
  private _isCollectionPoint(
    data: CommonModelSource[]
  ): data is CollectionPoint[] {
    return data.length > 0 && data[0] instanceof CollectionPoint;
  }
}
