import { Injectable } from '@angular/core';
import { Flags } from 'src/app/common/tools/flags';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { AuditGarbageStationDetailsTableArgs } from '../audit-garbage-station-details-table.model';

@Injectable()
export class AuditGarbageStationDetailsTableStationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  load(index: number, size: number, args: AuditGarbageStationDetailsTableArgs) {
    let params = new GetGarbageStationsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.AncestorId = args.divisionId;
    params.Name = args.name;

    if (args.type) {
      params.StationType = args.type;
    }
    if (args.state) {
      let flags = new Flags(args.state);
      params.StationState = flags.value;
    }

    let capabilities = [];

    switch (args.gcha) {
      case 0:
        capabilities.push(1);
        break;
      case 1:
        params.GCHAOnlineStatus = 0;
        break;
      case 2:
        params.GCHAOnlineStatus = 1;
        break;

      default:
        break;
    }

    switch (args.door) {
      case 0:
        capabilities.push(2);
        break;
      case 1:
        params.DeviceOnlineStatus = 0;
        break;
      case 2:
        params.DeviceOnlineStatus = 1;
        break;

      default:
        break;
    }

    if (capabilities.length > 0) {
      params.Capabilities = Flags.parse(capabilities);
    }

    if (args.nb) {
      if (args.nb.state != undefined) {
        params.NBState = args.nb.state;
      }
      if (args.nb.hour) {
        params.NBHours = args.nb.hour;
      }
    }

    return this.service.list(params);
  }

  async all(args: AuditGarbageStationDetailsTableArgs) {
    let datas: GarbageStation[] = [];
    let index = 1;
    let paged: PagedList<GarbageStation>;
    do {
      paged = await this.load(index, 1000, args);
      datas = datas.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return datas;
  }
}
