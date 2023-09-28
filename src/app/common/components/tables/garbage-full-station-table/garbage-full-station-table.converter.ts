import { Injectable } from '@angular/core';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { Flags } from 'src/app/common/tools/flags';
import { ImageControlArrayConverter } from 'src/app/converter/image-control-array.converter';
import { GarbageStationModelConverter } from 'src/app/converter/view-models/garbage-station.model.converter';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageFullStationTableModel } from './garbage-full-station-table.model';

@Injectable()
export class GarbageFullStationPagedTableConverter
  implements
    IPromiseConverter<
      PagedList<GarbageStationNumberStatistic>,
      PagedList<GarbageFullStationTableModel>
    >
{
  constructor(private item: GarbageFullStationTableConverter) {}

  async Convert(
    source: PagedList<GarbageStationNumberStatistic>
  ): Promise<PagedList<GarbageFullStationTableModel>> {
    let array: GarbageFullStationTableModel[] = [];
    for (let i = 0; i < source.Data.length; i++) {
      let item = await this.item.Convert(source.Data[i]);

      array.push(item);
    }
    return {
      Page: source.Page,
      Data: array,
    };
  }
}

@Injectable()
export class GarbageFullStationTableConverter
  implements
    IPromiseConverter<
      GarbageStationNumberStatistic,
      GarbageFullStationTableModel
    >
{
  constructor(
    private service: GarbageStationRequestService,
    private stationConverter: GarbageStationModelConverter
  ) {}
  converter = {
    image: new ImageControlArrayConverter(),
  };

  async Convert(
    source: GarbageStationNumberStatistic
  ): Promise<GarbageFullStationTableModel> {
    let model = new GarbageFullStationTableModel();

    if (source.FullDuration) {
      model.FullDuration = new Date(source.FullDuration * 1000 * 60);
    }

    model.GarbageStation = this.service.cache.get(source.Id).then((station) => {
      return this.stationConverter.Convert(station);
    });

    model.images = new Promise((resolve) => {
      model.GarbageStation.then((station) => {
        if (station.Cameras) {
          let cameras = station.Cameras.filter((x) => {
            let flags = new Flags(x.CameraUsage);
            return flags.contains(CameraUsage.GarbageFull);
          });

          resolve(this.converter.image.Convert(cameras));
        }
      });
    });

    return model;
  }
}
