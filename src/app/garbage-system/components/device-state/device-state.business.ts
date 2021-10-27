import { isNgContent } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { IDeviceStateConverter } from 'src/app/converter/IDeviceStateConverter.interface';
import { DeviceStateCountType } from 'src/app/enum/device-state-count.enum';
import { Language } from 'src/app/global/tool/language';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  DeviceStateCountModule,
  IDeviceStateDes,
} from 'src/app/view-model/device-state-count.model';

@Injectable()
export class DeviceStateBusiness implements IDeviceStateConverter {
  constructor(private divisionRequest: DivisionRequestService) {}
  async statistic(divisionId: string) {
    const divisionParams = new GetDivisionsParams();
    divisionParams.Ids = [divisionId];
    divisionParams.Ids = ['310109011002', '310109011003'];
    let res = await this.divisionRequest.statistic.number.list(divisionParams);
    return res.Data;
  }
  toDeviceState<T>(data: T[]): DeviceStateCountModule[] {
    let len = data.length;
    let res: DeviceStateCountModule[] = [];

    for (let i = 0; i < len; i++) {
      let item = data[i];
      let deviceStateModel = new DeviceStateCountModule();
      if (item instanceof DivisionNumberStatistic) {
        let totalCameraNum = item.CameraNumber;
        let offLineCameraNum = item.OfflineCameraNumber;
        let onLineCameraNum = totalCameraNum - offLineCameraNum;

        let percent = 0;

        // 除数不能为0
        if (totalCameraNum == 0) {
          percent = 100;
        } else {
          percent = (onLineCameraNum / totalCameraNum) * 100;
        }
        deviceStateModel.onLinePercentage =
          percent == percent >> 0 ? percent.toFixed(0) : percent.toFixed(2);

        deviceStateModel.deviceStateArr = [
          {
            label: Language.DeviceStateCountType(DeviceStateCountType.all),
            count: totalCameraNum,
            tag: DeviceStateCountType.all,
          },
          {
            label: Language.DeviceStateCountType(DeviceStateCountType.onLine),
            count: onLineCameraNum,
            tag: DeviceStateCountType.onLine,
          },
          {
            label: Language.DeviceStateCountType(DeviceStateCountType.offLine),
            count: offLineCameraNum,
            tag: DeviceStateCountType.offLine,
          },
        ];
      }
      res.push(deviceStateModel);
    }
    return res;
  }
}
