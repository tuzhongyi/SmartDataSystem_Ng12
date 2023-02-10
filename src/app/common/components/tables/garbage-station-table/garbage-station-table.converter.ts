import { Injectable } from '@angular/core';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { ImageControlArrayConverter } from 'src/app/converter/image-control-array.converter';
import { GarbageStationModelConverter } from 'src/app/converter/view-models/garbage-station.model.converter';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageStationTableModel } from './garbage-station-table.model';

@Injectable()
export class GarbageStationPagedConverter
  implements
    IPromiseConverter<
      PagedList<GarbageStation>,
      PagedList<GarbageStationTableModel>
    >
{
  constructor(private item: GarbageStationTableConverter) {}

  async Convert(
    source: PagedList<GarbageStation>,
    getter: (id: string) => Promise<Division>
  ): Promise<PagedList<GarbageStationTableModel>> {
    let array: GarbageStationTableModel[] = [];
    for (let i = 0; i < source.Data.length; i++) {
      const item = source.Data[i];
      let model = await this.item.Convert(item, getter);
      array.push(model);
    }
    return {
      Page: source.Page,
      Data: array,
    };
  }
}

@Injectable()
export class GarbageStationTableConverter
  implements IPromiseConverter<GarbageStation, GarbageStationTableModel>
{
  constructor(private stationConverter: GarbageStationModelConverter) {}

  async Convert(
    source: GarbageStation,
    getter: (id: string) => Promise<Division>
  ): Promise<GarbageStationTableModel> {
    let model = new GarbageStationTableModel();
    model.GarbageStation = this.stationConverter.Convert(source, getter);
    if (model.GarbageStation) {
      if (model.GarbageStation.Cameras) {
        model.images = this.converter.image.Convert(
          model.GarbageStation.Cameras
        );
      }
    }
    return model;
  }
  converter = {
    image: new ImageControlArrayConverter(),
  };
}
