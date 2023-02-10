import { Injectable } from '@angular/core';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { GarbageStationModelConverter } from 'src/app/converter/view-models/garbage-station.model.converter';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DeviceViewModel } from './device.model';

@Injectable()
export class DevicePagedConverter
  implements IPromiseConverter<PagedList<Camera>, PagedList<DeviceViewModel>>
{
  constructor(private item: DeviceConverter) {}

  async Convert(
    source: PagedList<Camera>,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
    }
  ): Promise<PagedList<DeviceViewModel>> {
    let array: DeviceViewModel[] = [];

    for (let i = 0; i < source.Data.length; i++) {
      let item = await this.item.Convert(source.Data[i], getter);

      array.push(item);
    }

    return {
      Page: source.Page,
      Data: array,
    };
  }
}
@Injectable()
export class DeviceConverter
  implements IPromiseConverter<Camera, DeviceViewModel>
{
  constructor(private stationConverter: GarbageStationModelConverter) {}
  converter = {
    image: new ImageControlConverter(),
  };
  async Convert(
    source: Camera,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
    }
  ): Promise<DeviceViewModel> {
    let model = new DeviceViewModel();
    model = Object.assign(model, source);

    let station = await getter.station(source.GarbageStationId);
    model.GarbageStation = await this.stationConverter.Convert(station);
    model.image = this.converter.image.Convert(source);

    return model;
  }
}
