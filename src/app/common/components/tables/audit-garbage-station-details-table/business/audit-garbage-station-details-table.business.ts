import { Injectable } from '@angular/core';
import { Flags } from 'src/app/common/tools/flags';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { AuditGarbageStationDetailsTableConverter } from '../audit-garbage-station-details-table.converter';
import {
  AuditGarbageStationDetailsTableArgs,
  AuditGarbageStationDetailsTableConfig,
  AuditGarbageStationDetailsTableItem,
  IAuditGarbageStationDetailsTableBusiness,
} from '../audit-garbage-station-details-table.model';
import { AuditGarbageStationDetailsTableConfigBusiness } from './audit-garbage-station-details-table-config.business';

@Injectable()
export class AuditGarbageStationDetailsTableBusiness
  implements IAuditGarbageStationDetailsTableBusiness
{
  constructor(
    private service: GarbageStationRequestService,
    private converter: AuditGarbageStationDetailsTableConverter,
    public config: AuditGarbageStationDetailsTableConfigBusiness
  ) {}

  async load(
    index: number,
    size: number,
    args: AuditGarbageStationDetailsTableArgs,
    config: AuditGarbageStationDetailsTableConfig
  ) {
    let datas = await this.getData(index, size, args);
    let models = datas.Data.map((x) => {
      return this.converter.convert(x, config);
    });
    let paged = new PagedList<AuditGarbageStationDetailsTableItem>();
    paged.Page = datas.Page;
    paged.Data = models;
    return paged;
  }

  getData(
    index: number,
    size: number,
    args: AuditGarbageStationDetailsTableArgs
  ) {
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

        if (args.nb.hour != undefined) {
          params.NBHours = args.nb.hour;
        }
      }
    }

    return this.service.list(params);
  }
}
