// EncodeDeviceManageModel

import { Injectable } from "@angular/core";
import { IConverter } from "../common/interfaces/converter.interface";
import { EncodeDevice } from "../network/model/encode-device";
import { EncodeDeviceManageModel } from "../view-model/encode-device-manage.model";


type EncodeDeviceManageSource = EncodeDevice;

@Injectable({
  providedIn: 'root'
})
export class EncodeDeviceManageConverter implements IConverter<EncodeDeviceManageSource, EncodeDeviceManageModel>{

  Convert(source: EncodeDeviceManageSource) {
    if (source instanceof EncodeDevice) {
      return this._fromEncodeDevice(source)
    }
    throw new Error('Error');
  }

  iterateToModel<T extends Array<EncodeDeviceManageSource>>(data: T) {
    let res: Array<EncodeDeviceManageModel> = [];

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = this.Convert(item);
      res.push(model)
    }

    return res;
  }
  private _fromEncodeDevice(item: EncodeDevice) {
    let model = new EncodeDeviceManageModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.IPAddress = item.Url;
    model.ProtocolType = item.ProtocolType ?? '';
    model.OnlineStatus = item.OnlineStatus == 0 ? '正常' : '离线';
    model.DeviceType = item.DeviceType ?? '';
    model.Labels = item.Labels || [];
    return model
  }
}