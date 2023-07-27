import { TimeUnit } from 'src/app/enum/time-unit.enum';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import {
  SearchOptionKey,
  SearchOptions,
} from 'src/app/view-model/search-options.model';
import { GarbageDropRecordFilter } from '../../garbage-drop-record-table/garbage-drop-record.model';
import { IDivision } from '../garbage-drop-record-task-table.model';

export class GarbageDropRecordTaskTableStationService {
  constructor(private service: GarbageStationRequestService) {}
  async history(division: IDivision, args: GarbageDropRecordFilter) {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    if (args.duration) {
      params.BeginTime = args.duration.begin;
      params.EndTime = args.duration.end;
    }
    params.TimeUnit = TimeUnit.Day;
    let stations = await this.list(args.opts, division.Id);
    params.GarbageStationIds = stations.map((x) => x.Id);
    return this.service.statistic.number.history.list(params);
  }
  async today(division: IDivision, args: GarbageDropRecordFilter) {
    let params = new GetGarbageStationStatisticNumbersParams();

    let stations = await this.list(args.opts, division.Id);
    params.Ids = stations.map((x) => x.Id);

    let paged = await this.service.statistic.number.list(params);
    return paged.Data;
  }
  async list(opts: SearchOptions, divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    if (opts.text) {
      switch (opts.propertyName) {
        case SearchOptionKey.name:
          params.Name = opts.text;
          break;
        case SearchOptionKey.community:
          params.CommunityName = opts.text;
          break;
        default:
          break;
      }
    }
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }
}
