import { Injectable } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import {
  AbstractCommonModelPromiseConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { CollectionMember } from 'src/app/network/model/garbage-station/member.model';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { CollectionMemberWindowModel } from './collection-member-window.model';

@Injectable()
export class CollectionMemberWindowConverter extends AbstractCommonModelPromiseConverter<CollectionMemberWindowModel> {
  private _divisonMap = new Map<string, Division>();

  constructor(
    private _collectionDivisionRequest: CollectionDivisionRequestService
  ) {
    super();
  }
  Convert(source: CommonModelSource, ...res: any[]) {
    if (source instanceof CollectionMember) {
      return this._fromCollectionMember(source);
    }
    throw new TypeError('类型出错');
  }

  private async _fromCollectionMember(source: CollectionMember) {
    let model = new CollectionMemberWindowModel();
    model.No = source.No;
    model.Id = source.Id;
    model.Name = source.Name;
    model.Gender = Language.Gender(source.Gender);
    model.MobileNo = source.MobileNo ?? Language.json.Unknow;
    model.MemberType = Language.CollectionMemberType(source.MemberType);
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
