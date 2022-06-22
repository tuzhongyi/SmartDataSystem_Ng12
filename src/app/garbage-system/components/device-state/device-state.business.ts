import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import {
  ISubscription,
  SubscriptionService,
} from 'src/app/common/interfaces/subscribe.interface';
import {
  DeviceStateCountType,
  DeviceStateRatioType,
} from 'src/app/enum/device-state-count.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { StoreService } from 'src/app/common/service/store.service';
import { Language } from 'src/app/common/tools/language';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  DeviceStateCountModel,
  IDeviceStateDes,
} from 'src/app/view-model/device-state-count.model';

@Injectable()
export class DeviceStateBusiness
  implements IBusiness<DivisionNumberStatistic, DeviceStateCountModel>
{
  constructor(
    private divisionRequest: DivisionRequestService,
    private storeService: StoreService,
    public subscription: SubscriptionService
  ) {}
  Converter: IConverter<DivisionNumberStatistic, DeviceStateCountModel> =
    new DeviceStateConverter();

  async load(): Promise<DeviceStateCountModel> {
    let data = await this.getData(this.storeService.divisionId);
    let model = this.Converter.Convert(data);
    return model;
  }
  getData(divisionId: string): Promise<DivisionNumberStatistic> {
    return this.divisionRequest.statistic.number.cache.get(divisionId);
  }
}

export class DeviceStateConverter
  implements IConverter<DivisionNumberStatistic, DeviceStateCountModel>
{
  Convert(
    source: DivisionNumberStatistic,
    ...res: any[]
  ): DeviceStateCountModel {
    let model = new DeviceStateCountModel();

    let totalCameraNum = source.CameraNumber;
    let offLineCameraNum = source.OfflineCameraNumber;
    let onLineCameraNum = totalCameraNum - offLineCameraNum;

    let percent = 0;

    // 除数不能为0
    if (totalCameraNum == 0) {
      percent = 100;
    } else {
      percent = (onLineCameraNum / totalCameraNum) * 100;
    }
    model.onLineRatio = percent >> 0;
    if (model.onLineRatio < 80) {
      model.state = DeviceStateRatioType.bad;
    } else if (model.onLineRatio >= 80 && model.onLineRatio < 90) {
      model.state = DeviceStateRatioType.mild;
    } else {
      model.state = DeviceStateRatioType.good;
    }

    model.stateCls = DeviceStateRatioType[model.state];
    model.stateDes = Language.DeviceStateRatioType(model.state);

    model.deviceStateArr = [
      {
        label: Language.DeviceStateCountType(DeviceStateCountType.all),
        count: totalCameraNum,
        tagCls: DeviceStateCountType[DeviceStateCountType.all],
      },
      {
        label: Language.DeviceStateCountType(DeviceStateCountType.onLine),
        count: onLineCameraNum,
        tagCls: DeviceStateCountType[DeviceStateCountType.onLine],
        status: OnlineStatus.Online,
      },
      {
        label: Language.DeviceStateCountType(DeviceStateCountType.offLine),
        count: offLineCameraNum,
        tagCls: DeviceStateCountType[DeviceStateCountType.offLine],
        status: OnlineStatus.Offline,
      },
    ];

    return model;
  }
}
