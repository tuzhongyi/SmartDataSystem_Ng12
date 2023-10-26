import { Injectable } from '@angular/core';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { Medium } from 'src/app/common/tools/medium';
import { ImageControlArrayConverter } from 'src/app/converter/image-control-array.converter';
import { GarbageStationModelConverter } from 'src/app/converter/view-models/garbage-station.model.converter';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
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
    source: PagedList<GarbageStationNumberStatistic>
  ): Promise<PagedList<GarbageDropStationTableModel>> {
    let array: GarbageDropStationTableModel[] = [];
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
export class GarbageDropStationTableConverter
  implements
    IPromiseConverter<
      GarbageStationNumberStatistic,
      GarbageDropStationTableModel
    >
{
  constructor(
    private stationConverter: GarbageStationModelConverter,
    private service: GarbageStationRequestService
  ) {}
  converter = {
    image: new ImageControlArrayConverter(),
  };

  async Convert(
    source: GarbageStationNumberStatistic
  ): Promise<GarbageDropStationTableModel> {
    let model = new GarbageDropStationTableModel();
    model.GarbageCount = source.GarbageCount ?? 0;

    if (source.CurrentGarbageTime) {
      model.GarbageDuration = new Date(source.CurrentGarbageTime * 60 * 1000);
    }
    if (source.MaxGarbageTime) {
      model.MaxGarbageDuration = new Date(source.MaxGarbageTime * 60 * 1000);
    }
    model.GarbageStation = this.service.get(source.Id).then((station) => {
      return this.stationConverter.Convert(station);
    });

    model.members = model.GarbageStation.then((station) => {
      return (station.Members ?? []).map((x) => {
        let model = new MemberViewModel();
        model = Object.assign(model, x);
        model.view = x.Name;
        if (model.MobileNo) {
          model.view += `（${model.MobileNo}）`;
        }
        return model;
      });
    });

    model.urls = model.GarbageStation.then((station) => {
      if (station.Cameras) {
        return station.Cameras.filter((x) => !!x.ImageUrl).map((x) =>
          Medium.jpg(x.ImageUrl!)
        );
      }
      return [];
    });

    return model;
  }
}
