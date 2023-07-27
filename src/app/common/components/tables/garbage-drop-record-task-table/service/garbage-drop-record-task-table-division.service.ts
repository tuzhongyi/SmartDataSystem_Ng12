import { TimeUnit } from 'src/app/enum/time-unit.enum';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParamsV2,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationStatisticNumbersParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import {
  SearchOptionKey,
  SearchOptions,
} from 'src/app/view-model/search-options.model';
import { GarbageDropRecordFilter } from '../../garbage-drop-record-table/garbage-drop-record.model';
import { IDivision } from '../garbage-drop-record-task-table.model';

export class GarbageDropRecordTaskTableDivisionService {
  constructor(private service: DivisionRequestService) {}

  async history(division: IDivision, args: GarbageDropRecordFilter) {
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    params.TimeUnit = TimeUnit.Day;
    let divisions = await this.list(args.opts, division.Id);
    params.DivisionIds = divisions.map((x) => x.Id);

    return this.service.statistic.number.history.list(params);
  }

  async today(division: IDivision, args: GarbageDropRecordFilter) {
    let params = new GetGarbageStationStatisticNumbersParams();
    let stations = await this.list(args.opts, division.Id);
    params.Ids = stations.map((x) => x.Id);
    let paged = await this.service.statistic.number.list(params);
    return paged.Data;
  }

  async list(opts: SearchOptions, parentId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;
    if (opts.text) {
      switch (opts.propertyName) {
        case SearchOptionKey.name:
          params.Name = opts.text;
          break;
        default:
          break;
      }
    }
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }
  get(divisionId: string) {
    return this.service.cache.get(divisionId);
  }
}
