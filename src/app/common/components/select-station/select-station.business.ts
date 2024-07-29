import { Injectable } from '@angular/core';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { LocaleCompare } from '../../tools/locale-compare';
import { SelectStationArgs } from './select-station.model';

@Injectable()
export class SelectStationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  async load(args: SelectStationArgs) {
    let datas = await this.loadData(args);
    return datas.sort((a, b) => {
      return LocaleCompare.compare(a.Name, b.Name);
    });
  }

  private loadData(args: SelectStationArgs) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = args.divisionId;
    return this.service.all(params);
  }
}
