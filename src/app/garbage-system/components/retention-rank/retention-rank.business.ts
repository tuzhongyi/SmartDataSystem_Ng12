import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { RetentionType } from 'src/app/enum/retention-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParams,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParams,
} from 'src/app/network/request/station/garbage-station-request.params';
import { StationRequestService } from 'src/app/network/request/station/garbage-station-request.service';
import { RankModel } from 'src/app/view-model/rank.model';

@Injectable()
export class RetentionRankBusiness {
  constructor(
    private divisionRequest: DivisionRequestService,
    private stationRequest: StationRequestService
  ) {}

  async getCurrentDivision(id: string) {
    let data = await this.divisionRequest.get(id);
    return data;
  }
  async stations(divisionId: string) {
    const stationParams = new GetGarbageStationsParams();
    stationParams.PageIndex = 1;
    stationParams.PageSize = 9999;
    stationParams.DivisionId = divisionId;
    const res = await this.stationRequest.list(stationParams);
    console.log(res);
  }
  async statistic(
    divisionId: string,
    divisionType: DivisionType,
    childType: UserResourceType
  ): Promise<
    DivisionNumberStatistic[] | GarbageStationNumberStatistic[] | null
  > {
    if (
      (divisionType == DivisionType.City ||
        divisionType == DivisionType.County) &&
      childType != UserResourceType.Station
    ) {
      const divisionParams = new GetDivisionsParams();
      divisionParams.AncestorId = divisionId;
      divisionParams.DivisionType = EnumHelper.Convert(childType);
      let res = await this.divisionRequest.list(divisionParams);
      let ids = res.Data.map((division) => division.Id);
      const divisionStatisticParams = new GetDivisionStatisticNumbersParams();
      divisionStatisticParams.Ids = ids;
      let res2 = await this.divisionRequest.statistic.number.list(
        divisionStatisticParams
      );
      return res2.Data;
    }
    if (
      divisionType == DivisionType.Committees ||
      childType == UserResourceType.Station
    ) {
      const stationParams = new GetGarbageStationsParams();
      stationParams.PageIndex = 1;
      stationParams.PageSize = 9999;
      stationParams.DivisionId = divisionId;
      const res = await this.stationRequest.list(stationParams);
      console.log('垃圾厢房', res);
      let ids = res.Data.map((item) => item.Id);
      if (ids.length == 0) return [];
      let stationStatisticParams =
        new GetGarbageStationStatisticNumbersParams();
      stationStatisticParams.Ids = ids;
      let res2 = await this.stationRequest.statistic.number.list(
        stationStatisticParams
      );
      return res2.Data;
    }
    return null;
  }
  toRank<T>(data: T[], type: RetentionType): any {
    // 先提取rank数据
    let rawData = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item instanceof DivisionNumberStatistic) {
        let obj = {
          id: item.Id,
          name: item.Name,
          statistic: 0,
        };
        if (type == RetentionType.GarbageTime) {
          obj.statistic = (item.CurrentGarbageTime ?? 0) >> 0;
        } else if (type == RetentionType.GarbageDropStationNumber) {
          obj.statistic = (item.GarbageDropStationNumber ?? 0) >> 0;
        }
        rawData.push(obj);
      } else if (item instanceof GarbageStationNumberStatistic) {
        let obj = {
          id: item.Id,
          name: item.Name,
          statistic: 0,
        };
        if (type == RetentionType.GarbageTime) {
          obj.statistic = (item.CurrentGarbageTime ?? 0) >> 0;
        } else if (type == RetentionType.GarbageDropStationNumber) {
          obj.statistic = (item.MaxGarbageCount ?? 0) >> 0;
        }

        rawData.push(obj);
      }
    }
    // console.log(rawData);
    rawData.sort(function (a, b) {
      return b.statistic - a.statistic;
    });
    // console.log(rawData);
    let temp = rawData.map((item) => {
      let model = new RankModel();
      model.id = item.id;
      model.name = item.name;
      if (type == RetentionType.GarbageTime) {
        model.statistic = this.transformTime(item.statistic);
      } else if (type == RetentionType.GarbageDropStationNumber) {
        model.statistic = item.statistic + '';
        model.unit = '个';
      }

      return model;
    });
    let len = temp.length;
    if (len < 6) {
      for (let i = 0; i < 6 - len; i++) {
        let model = new RankModel();
        model.name = '-';
        model.statistic = '0';
        if (type == RetentionType.GarbageTime) {
          model.unit = '分钟';
        } else if (type == RetentionType.GarbageDropStationNumber) {
          model.unit = '个';
        }

        temp.push(model);
      }
    }
    return temp;
  }

  transformTime(time: number) {
    let hour = Math.floor(time / 60);
    let minute = time - hour * 60;
    let res = hour == 0 ? minute + '分钟' : hour + '小时' + minute + '分钟';
    return res;
  }
}
