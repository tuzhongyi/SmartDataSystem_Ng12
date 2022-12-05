import { Injectable } from '@angular/core';
import { IService } from 'src/app/business/Ibusiness';
import {
  CommonElementListModel,
  ICommonElementListBusiness,
} from 'src/app/common/components/common-element-list/common-element-list.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { CommonElementListConverter } from 'src/app/common/components/common-element-list/common-element-list.converter';
import { Division } from 'src/app/network/model/division.model';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/division-request.service';
import { GetDivisionsParams } from 'src/app/network/request/garbage_vehicles/divisions/division-request.params';

@Injectable()
export class CollectionDivisionListBusiness
  implements ICommonElementListBusiness<Division>
{
  constructor(
    private _globalStorage: GlobalStorageService,
    private _collectionDivisionRequest: CollectionDivisionRequestService,
    private _converter: CommonElementListConverter
  ) {}
  async init(...args: any): Promise<CommonElementListModel<Division>> {
    let id = this._globalStorage.divisionId;
    let current = await this.getCurrent(id);

    let model = this._converter.Convert(current);

    let { Data: children } = await this.listChildren(model.Id);

    children.sort((a, b) => LocaleCompare.compare(a.Name, b.Name, true));

    model.Children = this._converter.iterateToModel(children);

    return model;
  }
  getCurrent(id: string) {
    return this._collectionDivisionRequest.get(id);
  }
  listChildren(parentId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;

    return this._collectionDivisionRequest.list(params);
  }
  notifyMessage(msg: Division) {
    this._globalStorage.divisionId = msg.Id;
    this._globalStorage.divisionType = msg.DivisionType;
    this._globalStorage.collectionStatusChange.emit();
  }
}
