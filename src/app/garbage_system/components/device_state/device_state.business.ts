import { Injectable } from '@angular/core';
import { IDeviceStateConverter } from 'src/app/converter/IDeviceStateConverter.interface';
import {
  DeviceStateCountType,
  DeviceStateRatioType,
} from 'src/app/enum/device_state_count.enum';
import { Language } from 'src/app/global/tool/language';
import { DivisionNumberStatistic } from 'src/app/network/model/division_number_statistic.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division_request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division_request.service';
import {
  DeviceStateCountModule,
  IDeviceStateDes,
} from 'src/app/view-model/device_state_count.model';

@Injectable()
export class DeviceStateBusiness implements IDeviceStateConverter {
  constructor(private divisionRequest: DivisionRequestService) {}
  async statistic(divisionId: string) {
    const divisionParams = new GetDivisionsParams();
    divisionParams.Ids = [divisionId];
    // divisionParams.Ids = ['310109011022', '310109011034'];
    let res = await this.divisionRequest.statistic.number.list(divisionParams);
    return res.Data;
  }
  toDeviceState<T>(
    data: T[]
  ): DeviceStateCountModule[] | DeviceStateCountModule {
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
        deviceStateModel.onLineRatio = percent >> 0;
        if (deviceStateModel.onLineRatio < 80) {
          deviceStateModel.state = DeviceStateRatioType.bad;
        } else if (
          deviceStateModel.onLineRatio >= 80 &&
          deviceStateModel.onLineRatio < 90
        ) {
          deviceStateModel.state = DeviceStateRatioType.mild;
        } else {
          deviceStateModel.state = DeviceStateRatioType.good;
        }

        deviceStateModel.stateCls =
          DeviceStateRatioType[deviceStateModel.state];
        deviceStateModel.stateDes = Language.DeviceStateRatioType(
          deviceStateModel.state
        );

        deviceStateModel.deviceStateArr = [
          {
            label: Language.DeviceStateCountType(DeviceStateCountType.all),
            count: totalCameraNum,
            tagCls: DeviceStateCountType[DeviceStateCountType.all],
          },
          {
            label: Language.DeviceStateCountType(DeviceStateCountType.onLine),
            count: onLineCameraNum,
            tagCls: DeviceStateCountType[DeviceStateCountType.onLine],
          },
          {
            label: Language.DeviceStateCountType(DeviceStateCountType.offLine),
            count: offLineCameraNum,
            tagCls: DeviceStateCountType[DeviceStateCountType.offLine],
          },
        ];
      }
      res.push(deviceStateModel);
    }
    return res[0];
  }
}
