import { Injectable } from '@angular/core';
import { DisposalCountConverter } from 'src/app/converter/disposal-count.converter';
import { DisposalCountType } from 'src/app/enum/disposal-count.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Language } from 'src/app/global/tool/language';
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
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DisposalCountModel } from 'src/app/view-model/disposal-count.model';

@Injectable()
export class DisposalCountBusiness implements DisposalCountConverter {
  constructor(
    private divisionRequest: DivisionRequestService,
    private stationRequest: GarbageStationRequestService
  ) {}

  // 当前区划信息
  async getCurrentDivision(id: string) {
    let data = await this.divisionRequest.cache.get(id);
    return data;
  }

  // 当前区划统计信息
  async getCurrentDivisionStatistic(id: string) {
    let res = await this.divisionRequest.statistic.number.get(id);
    return res;
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
      divisionParams.DivisionType =
        EnumHelper.ConvertUserResourceToDivision(childType);
      let res = await this.divisionRequest.cache.list(divisionParams);

      // console.log('dd', res);
      let ids = res.Data.map((division) => division.Id);
      // console.log(ids);
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
      const res = await this.stationRequest.cache.list(stationParams);
      // console.log('垃圾厢房', res);
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

  toDisposalCount<T>(data: T[]): any {
    let disposalCountData: Array<DisposalCountModel> = [];

    // data.map 可能返回 undefined,不使用
    for (let i = 0; i < data.length; i++) {
      let item = data[i];

      if (
        item instanceof DivisionNumberStatistic ||
        item instanceof GarbageStationNumberStatistic
      ) {
        let totalCount = 0;
        let handledCount = 0;
        let timeoutCount = 0;
        let unhandledCount = 0;

        let disposalCountModel = new DisposalCountModel();
        disposalCountModel.id = item.Id;
        disposalCountModel.name = item.Name;

        if (item.TodayEventNumbers) {
          let len = item.TodayEventNumbers.length;
          for (let i = 0; i < len; i++) {
            let eventNumer = item.TodayEventNumbers[i];
            if (eventNumer.EventType == EventType.GarbageRetention) {
              totalCount = eventNumer.DayNumber;
            }
            if (eventNumer.EventType == EventType.GarbageRetentionHandled) {
              handledCount = eventNumer.DayNumber;
            }
            if (eventNumer.EventType == EventType.GarbageRetentionTimeout) {
              timeoutCount = eventNumer.DayNumber;
            }
          }
        }

        unhandledCount = totalCount - handledCount;
        disposalCountModel.disposalCountArray = [
          {
            label: Language.DisposalCountType(DisposalCountType.total),
            count: totalCount,
            tag: DisposalCountType.total,
          },
          {
            label: Language.DisposalCountType(DisposalCountType.unhandled),
            count: unhandledCount,
            tag: DisposalCountType.unhandled,
          },
          {
            label: Language.DisposalCountType(DisposalCountType.timeout),
            count: timeoutCount,
            tag: DisposalCountType.timeout,
          },
        ];
        disposalCountModel.handledPercentage =
          ((handledCount / totalCount) * 100) >> 0;

        disposalCountData.push(disposalCountModel);
      }
    }
    if (this.localeCompareSupportsLocales()) {
      console.log('支持 Internationalization API');

      let collator = new Intl.Collator('zh-CN', {
        caseFirst: 'upper',
        sensitivity: 'variant',
        numeric: true,
      });
      disposalCountData.sort(function (referenceObj, compareObj) {
        return collator.compare(referenceObj.id, compareObj.id);
      });
    } else {
      disposalCountData.sort(function (referenceObj, compareObj) {
        // 返回值 < 0,referenceObj 在前面
        return (
          referenceObj.id.length - compareObj.id.length ||
          referenceObj.id.localeCompare(compareObj.id)
        );
      });
    }
    // disposalCountData.length = 3;
    return disposalCountData;
  }

  private localeCompareSupportsLocales() {
    try {
      'foo'.localeCompare('bar', 'i');
    } catch (e: any) {
      return e.name === 'RangeError';
    }
    return false;
  }
}
