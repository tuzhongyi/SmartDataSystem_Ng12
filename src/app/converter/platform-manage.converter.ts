import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { IConverter } from "../common/interfaces/converter.interface";
import { HwPlatform } from "../network/model/platform.model";
import { PlatformManageModel } from "../view-model/platform-manage.model";

type PlatformManageModelSource = HwPlatform;

@Injectable({
  providedIn: "root"
})
export class PlatformManageConverter implements IConverter<HwPlatform, PlatformManageModel>{
  constructor(private _datePipe: DatePipe) { }
  Convert(source: PlatformManageModelSource) {
    if (source instanceof HwPlatform) {
      return this._fromHwPlatform(source)
    }
    throw new Error('Error');
  }

  iterateToModel<T extends Array<HwPlatform>>(data: T) {
    let res: Array<PlatformManageModel> = [];

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = this.Convert(item);
      res.push(model)
    }

    return res;
  }
  private _fromHwPlatform(item: HwPlatform) {
    let res = new PlatformManageModel(item.Id, item.Name, item.Url, item.ProtocolType,);
    res.State = item.State == 0 ? '正常' : '故障';
    res.UpdateTime = this._datePipe.transform(item.UpdateTime, 'yyyy-MM-dd HH:mm:ss') ?? ''
    return res;
  }


}