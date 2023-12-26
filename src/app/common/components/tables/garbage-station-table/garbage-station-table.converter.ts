import { Injectable } from '@angular/core';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { Flags } from 'src/app/common/tools/flags';
import { Medium } from 'src/app/common/tools/medium';
import { GarbageStationModelConverter } from 'src/app/converter/view-models/garbage-station.model.converter';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
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
    source: PagedList<GarbageStation>
  ): Promise<PagedList<GarbageStationTableModel>> {
    let array: GarbageStationTableModel[] = [];
    for (let i = 0; i < source.Data.length; i++) {
      const item = source.Data[i];
      let model = await this.item.Convert(item);
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

  async Convert(source: GarbageStation): Promise<GarbageStationTableModel> {
    let model = new GarbageStationTableModel();
    model.GarbageStation = this.stationConverter.Convert(source);
    if (model.GarbageStation) {
      let flags = new Flags(model.GarbageStation.StationState);
      model.states = flags.getValues();
      if (!model.states || model.states.length == 0) {
        model.states = [0];
      }
      model.urls = new Promise((resolve) => {
        if (model.GarbageStation.Cameras) {
          let all = model.GarbageStation.Cameras.filter(
            (x) => !EnumHelper.CameraIgnore(x.Classification)
          ).map((x) => Medium.img(x.ImageUrl));
          resolve(Promise.all(all));
        }
      });
    }

    return model;
  }
}
