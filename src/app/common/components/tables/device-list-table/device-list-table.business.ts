import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';

import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationCamerasParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DevicePagedConverter } from './device-list-table.converter';
import { DeviceListTableArgs } from './device-list-table.model';
import { DeviceViewModel } from './device.model';

@Injectable()
export class DeviceListTableBusiness
  implements IBusiness<PagedList<Camera>, PagedList<DeviceViewModel>>
{
  constructor(
    private storeService: GlobalStorageService,
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService,
    public Converter: DevicePagedConverter
  ) {}

  loading?: EventEmitter<void> | undefined;
  async load(
    index: number,
    size: number,
    args: DeviceListTableArgs
  ): Promise<PagedList<DeviceViewModel>> {
    let data = await this.getData(
      index,
      size,
      args,
      args.divisionId || this.storeService.divisionId
    );
    let model = await this.Converter.Convert(data, {
      station: (id: string) => {
        return this.stationService.cache.get(id);
      },
    });
    return model;
  }
  getData(
    index: number,
    size: number,
    args: DeviceListTableArgs,
    divisionId?: string
  ): Promise<PagedList<Camera>> {
    let params = new GetGarbageStationCamerasParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.OnlineStatus = args.status;
    params.Name = args.name;
    if (divisionId) {
      params.DivisionIds = [divisionId];
    }
    return this.stationService.camera.list(params);
  }
}
