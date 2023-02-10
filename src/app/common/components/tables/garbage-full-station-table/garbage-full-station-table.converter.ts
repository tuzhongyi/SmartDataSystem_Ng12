import { Injectable } from '@angular/core';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { Flags } from 'src/app/common/tools/flags';
import { ImageControlArrayConverter } from 'src/app/converter/image-control-array.converter';
import { GarbageStationModelConverter } from 'src/app/converter/view-models/garbage-station.model.converter';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
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
    source: PagedList<GarbageStationNumberStatistic>,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<PagedList<GarbageFullStationTableModel>> {
    let array: GarbageFullStationTableModel[] = [];
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
export class GarbageFullStationTableConverter
  implements
    IPromiseConverter<
      GarbageStationNumberStatistic,
      GarbageFullStationTableModel
    >
{
  constructor(private stationConverter: GarbageStationModelConverter) {}
  converter = {
    image: new ImageControlArrayConverter(),
  };

  async Convert(
    source: GarbageStationNumberStatistic,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<GarbageFullStationTableModel> {
    let model = new GarbageFullStationTableModel();

    if (source.FullDuration) {
      model.FullDuration = new Date(source.FullDuration * 1000 * 60);
    }
    let station = await getter.station(source.Id);
    model.GarbageStation = await this.stationConverter.Convert(
      station,
      getter.division
    );
    if (model.GarbageStation) {
      if (model.GarbageStation.Cameras) {
        let cameras = model.GarbageStation.Cameras.filter((x) => {
          let flags = new Flags(x.CameraUsage);
          return flags.contains(CameraUsage.GarbageFull);
        });

        model.images = this.converter.image.Convert(cameras);
      }
    }
    return model;
  }
}
