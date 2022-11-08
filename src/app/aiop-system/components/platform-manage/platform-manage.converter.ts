import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { IConverter } from '../../../common/interfaces/converter.interface';
import { Platform } from '../../../network/model/platform.model';
import { PlatformManageModel } from '../../../view-model/platform-manage.model';
import { AbstractCommonModelConverter } from '../../../converter/common-model.converter';

type PlatformManageModelSource = Platform;

@Injectable({
  providedIn: 'root',
})
export class PlatformManageConverter extends AbstractCommonModelConverter<PlatformManageModel> {
  constructor(private _datePipe: DatePipe) {
    super();
  }
  Convert(source: PlatformManageModelSource) {
    if (source instanceof Platform) {
      return this._fromPlatform(source);
    }
    throw new Error('Error');
  }

  private _fromPlatform(item: Platform) {
    let model = new PlatformManageModel();
    model.Id = item.Id;
    model.Name = item.Name ?? '';
    model.Url = item.Url;
    model.ProtocolType = item.ProtocolType;
    model.State = item.State == 0 ? '正常' : '故障';
    model.UpdateTime =
      this._datePipe.transform(item.UpdateTime, 'yyyy-MM-dd HH:mm:ss') ?? '';
    return model;
  }
}
