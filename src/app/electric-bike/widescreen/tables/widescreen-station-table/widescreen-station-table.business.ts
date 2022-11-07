import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { WidescreenStationTableConverter } from './widescreen-station-table.converter';
import { WidescreenStationModel } from './widescreen-station-table.model';

@Injectable()
export class WidescreenStationTableBusiness
  implements IBusiness<GarbageStation[], WidescreenStationModel[]>
{
  constructor(private service: GarbageStationRequestService) {}
  Converter = new WidescreenStationTableConverter();

  async load(divisionId: string): Promise<WidescreenStationModel<any>[]> {
    let data = await this.getData(divisionId);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(divisionId: string): Promise<GarbageStation[]> {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let paged = await this.service.list(params);
    return paged.Data;
  }
}
