import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GarbageStationModelConverter } from 'src/app/converter/view-models/garbage-station.model.converter';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationModel } from 'src/app/view-model/garbage-station.model';
import { AIOPGarbageStationTableArgs } from './aiop-garbage-station-table.model';
import { AIOPGarbageStationTableService } from './aiop-garbage-station-table.service';

@Injectable()
export class AIOPGarbageStationTableBusiness
  implements
    IBusiness<PagedList<GarbageStation>, PagedList<GarbageStationModel>>
{
  constructor(
    private service: AIOPGarbageStationTableService,
    private converter: GarbageStationModelConverter
  ) {}
  async load(
    index: number,
    size: number,
    args: AIOPGarbageStationTableArgs
  ): Promise<PagedList<GarbageStationModel>> {
    let data = await this.getData(index, size, args);
    let paged = new PagedList<GarbageStationModel>();
    paged.Page = data.Page;
    paged.Data = data.Data.map((x) => this.converter.Convert(x));
    return paged;
  }
  getData(
    index: number,
    size: number,
    args: AIOPGarbageStationTableArgs
  ): Promise<PagedList<GarbageStation>> {
    let params = new GetGarbageStationsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.AncestorId = args.divisionId;
    params.Name = args.name;
    return this.service.station.list(params);
  }
}
