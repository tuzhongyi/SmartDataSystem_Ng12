import { Injectable } from "@angular/core";
import { SRServer } from "../network/model/sr-server";
import { SRServerManageModel } from "../view-model/sr-server-manage.model";
import { CommonModelConverter, CommonModelSource } from "./common-model.converter";

@Injectable({
  providedIn: 'root'
})
export class SRServerManageConverter extends CommonModelConverter<SRServerManageModel> {
  Convert(source: CommonModelSource, ...res: any[]): SRServerManageModel {
    if (source instanceof SRServer) {
      return this._fromSRServer(source)
    }
    throw new Error('Error');
  }
  private _fromSRServer(item: SRServer) {
    let model = new SRServerManageModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.ProtocolType = item.ProtocolType;
    model.Username = item.Username ?? '';
    model.Password = item.Password ?? '';

    return model;
  }
}