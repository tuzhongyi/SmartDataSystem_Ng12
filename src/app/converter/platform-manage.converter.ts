import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { IConverter } from "../common/interfaces/converter.interface";
import { Platform } from "../network/model/platform.model";
import { PlatformManageModel } from "../view-model/platform-manage.model";

type PlatformManageModelSource = Platform;

@Injectable({
  providedIn: "root"
})
export class PlatformManageConverter implements IConverter<PlatformManageModelSource, PlatformManageModel>{
  constructor(private _datePipe: DatePipe) { }
  Convert(source: PlatformManageModelSource) {
    if (source instanceof Platform) {
      return this._fromPlatform(source)
    }
    throw new Error('Error');
  }

  iterateToModel<T extends Array<Platform>>(data: T) {
    let res: Array<PlatformManageModel> = [];

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = this.Convert(item);
      res.push(model)
    }

    return res;
  }
  private _fromPlatform(item: Platform) {
    let model = new PlatformManageModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.Url = item.Url;
    model.ProtocolType = item.ProtocolType
    model.State = item.State == 0 ? '正常' : '故障';
    model.UpdateTime = this._datePipe.transform(item.UpdateTime, 'yyyy-MM-dd HH:mm:ss') ?? ''
    return model;
  }


}