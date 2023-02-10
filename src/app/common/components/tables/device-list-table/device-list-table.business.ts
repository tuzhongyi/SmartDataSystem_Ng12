import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';

import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Camera } from 'src/app/network/model/camera.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationCamerasParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { DevicePagedConverter } from './device-list-table.converter';
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
    page: PagedParams,
    status?: OnlineStatus,
    opts?: SearchOptions
  ): Promise<PagedList<DeviceViewModel>> {
    let data = await this.getData(
      this.storeService.divisionId,
      page,
      status,
      opts
    );
    let model = await this.Converter.Convert(data, {
      station: (id: string) => {
        return this.stationService.cache.get(id);
      },
    });
    return model;
  }
  getData(
    divisionId: string,
    page: PagedParams,
    status?: OnlineStatus,
    opts?: SearchOptions
  ): Promise<PagedList<Camera>> {
    let params = new GetGarbageStationCamerasParams();
    params = Object.assign(params, page);
    params.OnlineStatus = status;
    if (opts) {
      (params as any)[opts.propertyName] = opts.text;
    }
    params.DivisionIds = [divisionId];
    return this.stationService.camera.list(params);
  }
}
