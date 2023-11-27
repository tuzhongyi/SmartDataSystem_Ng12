import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { Medium } from 'src/app/common/tools/medium';
import { GarbageStationModelConverter } from 'src/app/converter/view-models/garbage-station.model.converter';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParams,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import {
  AuditGarbageStationTableArgs,
  AuditGarbageStationTableModel,
} from './audit-garbage-station-table.model';

@Injectable()
export class AuditGarbageStationTableBusiness
  implements
    IBusiness<
      PagedList<GarbageStation>,
      PagedList<AuditGarbageStationTableModel>
    >
{
  constructor(
    private service: GarbageStationRequestService,
    private converter: GarbageStationModelConverter
  ) {}

  async load(
    index: number,
    size: number,
    args: AuditGarbageStationTableArgs
  ): Promise<PagedList<AuditGarbageStationTableModel>> {
    let drops = await this.statistic(args);
    let data = await this.getData(index, size, args, drops);
    let paged = new PagedList<AuditGarbageStationTableModel>();
    paged.Page = data.Page;
    paged.Data = data.Data.map((x) => this.convert(x, drops));
    return paged;
  }
  async getData(
    index: number,
    size: number,
    args: AuditGarbageStationTableArgs,
    drops: GarbageStationNumberStatistic[]
  ): Promise<PagedList<GarbageStation>> {
    let params = new GetGarbageStationsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.Name = args.name;

    params.DivisionId = args.divisionId;

    if (args.state != undefined) {
      if (args.state === 0) {
        params.StationState = args.state;
      } else {
        let state = '1';
        state = state.padEnd(args.state, '0');
        params.StationState = parseInt(state, 2);
      }
    }

    if (args.drop) {
      params.Ids = drops.map((x) => x.Id);
    }

    return this.service.list(params);
  }

  async statistic(args: AuditGarbageStationTableArgs) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.GarbageDrop = true;
    params.DivisionId = args.divisionId;

    let paged = await this.service.statistic.number.list(params);
    return paged.Data;
  }

  convert(source: GarbageStation, drops: GarbageStationNumberStatistic[]) {
    let model = this.converter.Convert(source, AuditGarbageStationTableModel);
    model.urls = new Promise((resolve) => {
      if (model.Cameras) {
        let all = model.Cameras.filter(
          (x) => !EnumHelper.CameraIgnore(x.Classification)
        ).map((x) => Medium.img(x.ImageUrl));
        resolve(Promise.all(all));
      }
    });
    let index = drops.findIndex((x) => x.Id === model.Id);
    if (index >= 0) {
      model.drop = drops[index];
    }
    return model;
  }
}
