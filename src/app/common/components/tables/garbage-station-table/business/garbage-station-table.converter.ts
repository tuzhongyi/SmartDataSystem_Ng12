import { Injectable } from '@angular/core';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { Flags } from 'src/app/common/tools/flags';
import { Language } from 'src/app/common/tools/language';
import { GarbageStationConverter } from 'src/app/converter/garbage-station.converter';
import { ImageControlArrayConverter } from 'src/app/converter/image-control-array.converter';
import { StationState } from 'src/app/enum/station-state.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationTableModel } from '../garbage-station-table.model';

@Injectable()
export class GarbageStationPagedConverter {
  constructor(private service: DivisionRequestService) {}

  private converter = {
    item: new GarbageStationTableConverter(),
  };

  async Convert(source: GarbageStation[]): Promise<GarbageStationTableModel[]> {
    let array: GarbageStationTableModel[] = [];
    for (let i = 0; i < source.length; i++) {
      const item = source[i];
      let model = await this.converter.item.Convert(item, (id: string) => {
        return this.service.cache.get(id);
      });
      array.push(model);
    }
    return array;
  }
}

export class GarbageStationTableConverter
  implements IPromiseConverter<GarbageStation, GarbageStationTableModel>
{
  async Convert(
    source: GarbageStation,
    getter: (id: string) => Promise<Division>
  ): Promise<GarbageStationTableModel> {
    let model = new GarbageStationTableModel();
    model.GarbageStation = await this.converter.station.Convert(source, getter);
    if (model.GarbageStation) {
      if (model.GarbageStation.Cameras) {
        model.images = this.converter.image.Convert(
          model.GarbageStation.Cameras
        );
      }
      let flags = new Flags(source.StationState);
      model.stateClassName = 'status';
      if (flags.contains(StationState.Full)) {
        model.stateClassName += ' full';
      }
      if (flags.contains(StationState.Smoke)) {
        model.stateClassName += ' smoke';
      }
      if (flags.contains(StationState.Error)) {
        model.stateClassName += ' error';
      }
      model.stateName = Language.StationStateFlags(flags);
    }
    return model;
  }
  converter = {
    image: new ImageControlArrayConverter(),
    station: new GarbageStationConverter(),
  };
}
