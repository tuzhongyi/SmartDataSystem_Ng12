import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { GarbageStationConverter } from 'src/app/converter/garbage-station.converter';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Camera } from 'src/app/network/model/camera.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationCamerasParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { MediumRequestService } from 'src/app/network/request/medium/medium-request.service';
import { DeviceListTableFilter } from './device-list-table.component';
import { DeviceViewModel } from './device.model';

@Injectable()
export class DeviceListTableBusiness
  implements IBusiness<PagedList<Camera>, PagedList<DeviceViewModel>>
{
  constructor(
    private storeService: StoreService,
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService
  ) {}
  Converter: IPromiseConverter<PagedList<Camera>, PagedList<DeviceViewModel>> =
    new DevicePagedConverter();

  loading?: EventEmitter<void> | undefined;
  async load(
    page: PagedParams,
    status?: OnlineStatus,
    name?: string
  ): Promise<PagedList<DeviceViewModel>> {
    let data = await this.getData(
      this.storeService.divisionId,
      page,
      status,
      name
    );
    let model = await this.Converter.Convert(data, {
      station: (id: string) => {
        return this.stationService.cache.get(id);
      },
      division: (id: string) => {
        return this.divisionService.cache.get(id);
      },
    });
    return model;
  }
  getData(
    divisionId: string,
    page: PagedParams,
    status?: OnlineStatus,
    name?: string
  ): Promise<PagedList<Camera>> {
    let params = new GetGarbageStationCamerasParams();
    params = Object.assign(params, page);
    params.OnlineStatus = status;
    params.Name = name;
    params.DivisionIds = [divisionId];
    return this.stationService.camera.list(params);
  }
}

class DevicePagedConverter
  implements IPromiseConverter<PagedList<Camera>, PagedList<DeviceViewModel>>
{
  private converter = {
    item: new DeviceConverter(),
  };
  async Convert(
    source: PagedList<Camera>,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<PagedList<DeviceViewModel>> {
    let array: DeviceViewModel[] = [];

    for (let i = 0; i < source.Data.length; i++) {
      let item = await this.converter.item.Convert(source.Data[i], getter);

      array.push(item);
    }

    return {
      Page: source.Page,
      Data: array,
    };
  }
}

class DeviceConverter implements IPromiseConverter<Camera, DeviceViewModel> {
  converter = {
    station: new GarbageStationConverter(),
    image: new ImageControlConverter(),
  };
  async Convert(
    source: Camera,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<DeviceViewModel> {
    let model = new DeviceViewModel();
    model = Object.assign(model, source);

    let station = await getter.station(source.GarbageStationId);
    model.GarbageStation = await this.converter.station.Convert(
      station,
      getter.division
    );

    model.image = this.converter.image.Convert(source);

    return model;
  }
}
