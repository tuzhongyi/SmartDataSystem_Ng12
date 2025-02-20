import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import {
  DeviceStateCountType,
  DeviceStateRatioType,
} from 'src/app/enum/device-state-count.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DeviceStateCountModel } from 'src/app/view-model/device-state-count.model';

@Injectable()
export class DeviceStateBusiness
  implements IBusiness<DivisionNumberStatistic, DeviceStateCountModel>
{
  constructor(
    private divisionRequest: DivisionRequestService,
    private storeService: GlobalStorageService,
    private stationRequest: GarbageStationRequestService
  ) {
    this.Converter = new DeviceStateConverter(this.stationRequest);
  }
  Converter: IPromiseConverter<DivisionNumberStatistic, DeviceStateCountModel>;

  async load(): Promise<DeviceStateCountModel> {
    let division = await this.storeService.division.selected;
    let data = await this.getData(division.Id);
    let model = await this.Converter.Convert(data);
    return model;
  }
  getData(divisionId: string): Promise<DivisionNumberStatistic> {
    return this.divisionRequest.statistic.number.cache.get(divisionId);
  }
}

export class DeviceStateConverter
  implements IPromiseConverter<DivisionNumberStatistic, DeviceStateCountModel>
{
  constructor(private station: GarbageStationRequestService) {}

  async station_online(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let stations = await this.station.all(params);
    let normal = stations.filter((x) => {
      switch (x.StationState) {
        case StationState.Error:
        case StationState.Smoke:
        case StationState.PanicButton:
          return false;
        default:
          return true;
      }
    });
    return normal.length;
  }

  async Convert(
    source: DivisionNumberStatistic,
    ...res: any[]
  ): Promise<DeviceStateCountModel> {
    let model = new DeviceStateCountModel();

    let station_count = source.StationNumber;
    let station_online = await this.station_online(source.Id);
    let camera_online = source.CameraNumber - source.OfflineCameraNumber;

    let percent = 0;

    // 除数不能为0
    if (station_count == 0) {
      percent = 100;
    } else {
      percent = (station_online / station_count) * 100;
    }
    model.onlineRatio = percent >> 0;
    if (model.onlineRatio < 80) {
      model.state = DeviceStateRatioType.bad;
    } else if (model.onlineRatio >= 80 && model.onlineRatio < 90) {
      model.state = DeviceStateRatioType.mild;
    } else {
      model.state = DeviceStateRatioType.good;
    }

    model.stateCls = DeviceStateRatioType[model.state];
    model.stateDes = Language.DeviceStateRatioType(model.state);

    model.deviceStateArr = [
      {
        label: '全部投放点',
        count: station_count,
        tagCls: DeviceStateCountType[DeviceStateCountType.all],
      },
      {
        label: '在线投放点',
        count: station_online,
        tagCls: DeviceStateCountType[DeviceStateCountType.onLine],
        status: OnlineStatus.Online,
      },
      {
        label: '在线设备',
        count: camera_online,
        tagCls: DeviceStateCountType[DeviceStateCountType.offLine],
        status: OnlineStatus.Offline,
      },
    ];

    return model;
  }
}
