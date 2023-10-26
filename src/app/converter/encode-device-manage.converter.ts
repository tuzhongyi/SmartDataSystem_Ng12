import { Injectable } from '@angular/core';
import { Language } from '../common/tools/language';
import { EncodedDeviceType } from '../enum/device-type.enum';
import { ProtocolType } from '../enum/protocol-type.enum';
import { EncodeDevice } from '../network/model/garbage-station/encode-device';
import { EncodeDeviceManageModel } from '../view-model/encode-device-manage.model';
import { AbstractCommonModelConverter } from './common-model.converter';

type EncodeDeviceManageSource = EncodeDevice;

@Injectable({
  providedIn: 'root',
})
export class EncodeDeviceManageConverter extends AbstractCommonModelConverter<EncodeDeviceManageModel> {
  Convert(source: EncodeDeviceManageSource) {
    if (source instanceof EncodeDevice) {
      return this._fromEncodeDevice(source);
    }
    throw new Error('Error');
  }

  private _fromEncodeDevice(item: EncodeDevice) {
    let model = new EncodeDeviceManageModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.IPAddress = item.Url;
    model.ProtocolType = item.ProtocolType ?? ProtocolType.None;
    model.OnlineStatus = Language.OnlineStatus(item.OnlineStatus);
    model.DeviceType = item.DeviceType ?? EncodedDeviceType.None;
    model.Labels = item.Labels || [];
    return model;
  }
}
