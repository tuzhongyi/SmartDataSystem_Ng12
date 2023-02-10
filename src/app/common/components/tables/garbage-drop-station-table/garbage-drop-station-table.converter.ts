import { Injectable } from '@angular/core';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { ImageControlArrayConverter } from 'src/app/converter/image-control-array.converter';
import { GarbageStationModelConverter } from 'src/app/converter/view-models/garbage-station.model.converter';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import {
  GarbageDropStationTableModel,
  MemberViewModel,
} from './garbage-drop-station-table.model';

@Injectable()
export class GarbageDropStationPagedTableConverter
  implements
    IPromiseConverter<
      PagedList<GarbageStationNumberStatistic>,
      PagedList<GarbageDropStationTableModel>
    >
{
  constructor(private item: GarbageDropStationTableConverter) {}

  async Convert(
    source: PagedList<GarbageStationNumberStatistic>,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<PagedList<GarbageDropStationTableModel>> {
    let array: GarbageDropStationTableModel[] = [];
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
export class GarbageDropStationTableConverter
  implements
    IPromiseConverter<
      GarbageStationNumberStatistic,
      GarbageDropStationTableModel
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
  ): Promise<GarbageDropStationTableModel> {
    let model = new GarbageDropStationTableModel();
    model.GarbageCount = source.GarbageCount ?? 0;

    if (source.CurrentGarbageTime) {
      model.GarbageDuration = new Date(source.CurrentGarbageTime * 60 * 1000);
    }
    if (source.MaxGarbageTime) {
      model.MaxGarbageDuration = new Date(source.MaxGarbageTime * 60 * 1000);
    }
    let station = await getter.station(source.Id);
    model.GarbageStation = await this.stationConverter.Convert(station);
    if (model.GarbageStation) {
      model.members = (model.GarbageStation.Members ?? []).map((x) => {
        let model = new MemberViewModel();
        model = Object.assign(model, x);
        model.view = x.Name;
        if (model.MobileNo) {
          model.view += `（${model.MobileNo}）`;
        }
        return model;
      });
      if (model.GarbageStation.Cameras) {
        model.images = this.converter.image.Convert(
          model.GarbageStation.Cameras
        );
      }
    }
    return model;
  }
}
