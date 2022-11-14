import { Injectable } from '@angular/core';
import { IService } from 'src/app/business/Ibusiness';
import {
  ElementListModel,
  IElementListBusiness,
} from 'src/app/common/components/element-list/element-list.model';
import { ICollectionDivisionListBusiness } from 'src/app/common/interfaces/collection-division-list.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { ElementListConverter } from 'src/app/converter/element-list.converter';
import { Division } from 'src/app/network/model/division.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { GarbageVehicleDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/division-request.service';

@Injectable()
export class CollectionDivisionListBusiness
  implements IElementListBusiness<Division>
{
  constructor(
    private _globalStorage: GlobalStorageService,
    private _collectionDivisionRequest: GarbageVehicleDivisionRequestService,
    private _converter: ElementListConverter
  ) {}
  async init(...args: any): Promise<ElementListModel<Division>> {
    let id = this._globalStorage.divisionId;
    let current = await this.getCurrent(id);

    let model = this._converter.Convert(current);

    let { Data: children } = await this.listChildren(model.Id);

    children.sort((a, b) => LocaleCompare.compare(a.Name, b.Name, true));

    model.Children = this._converter.iterateToModel(children);

    console.log(model);
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
    this._globalStorage.statusChange.emit();
  }
}
