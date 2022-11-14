import { Injectable } from '@angular/core';
import { Division } from 'src/app/network/model/division.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GlobalStorageService } from '../../service/global-storage.service';
import { LocaleCompare } from '../../tools/locale-compare';
import { ElementListConverter } from '../../../converter/element-list.converter';
import { ElementListModel, IElementListBusiness } from './element-list.model';

@Injectable()
export class ElementListBusiness implements IElementListBusiness<Division> {
  constructor(
    private _divisionRequest: DivisionRequestService,
    private _globalStorage: GlobalStorageService,
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
    return this._divisionRequest.get(id);
  }
  listChildren(parentId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;

    return this._divisionRequest.list(params);
  }
}
