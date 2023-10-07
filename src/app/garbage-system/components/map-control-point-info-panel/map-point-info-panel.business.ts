import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';

import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { MapPointInfoPanelConverter } from './map-point-info-panel.converter';
import { MapPointInfoPanelModel } from './map-point-info-panel.model';

@Injectable()
export class MapPointInfoPanelBusiness
  implements IBusiness<GarbageStation, MapPointInfoPanelModel>
{
  constructor(
    private service: GarbageStationRequestService,
    private converter: MapPointInfoPanelConverter
  ) {}

  async load(source: GarbageStation): Promise<MapPointInfoPanelModel> {
    let model = this.converter.Convert(source);
    return model;
  }
  getData(...args: any): Promise<GarbageStation> {
    throw new Error('Method not implemented.');
  }
}
