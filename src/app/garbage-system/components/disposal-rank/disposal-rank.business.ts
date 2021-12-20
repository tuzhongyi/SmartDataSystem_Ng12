import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import {
  ISubscription,
  SubscriptionService,
} from 'src/app/common/interfaces/subscribe.interface';
import { RankConverter } from 'src/app/converter/rank.converter';
import { StoreService } from 'src/app/global/service/store.service';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParams,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { RankModel } from 'src/app/view-model/rank.model';
import { DisposalRankConverter } from './disposal-rank.converter';

@Injectable()
export class DisposalRankBusiness
  implements IBusiness<GarbageStationNumberStatistic[], RankModel[]>
{
  constructor(
    private divisionRequest: DivisionRequestService,
    private stationRequest: GarbageStationRequestService,
    public subscription: SubscriptionService,
    private storeService: StoreService
  ) {}
  Converter: IConverter<GarbageStationNumberStatistic[], RankModel[]> =
    new DisposalRankConverter();

  async getStations(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let response = await this.stationRequest.cache.list(params);
    return response.Data;
  }

  async load(): Promise<RankModel[]> {
    let data = await this.getData(this.storeService.divisionId);
    debugger;
    while (data.length < 6) {
      let item = new GarbageStationNumberStatistic();
      item.Name = '-';
      data.push(item);
    }
    let result = this.Converter.Convert(data);
    return result.sort((a, b) => {
      return a.value - b.value;
    });
  }
  async getData(divisionId: string): Promise<GarbageStationNumberStatistic[]> {
    let stations = await this.getStations(divisionId);
    let params = new GetGarbageStationStatisticNumbersParams();
    params.Ids = stations.map((x) => x.Id);
    let response = await this.stationRequest.statistic.number.list(params);
    return response.Data;
  }

  // async getCurrentDivision(id: string) {
  //   let data = await this.divisionRequest.cache.get(id);
  //   return data;
  // }

  // async statistic(
  //   divisionId: string
  // ): Promise<GarbageStationNumberStatistic[]> {
  //   const stationParams = new GetGarbageStationsParams();
  //   stationParams.PageIndex = 1;
  //   stationParams.PageSize = 9999;
  //   stationParams.DivisionId = divisionId;
  //   const res = await this.stationRequest.cache.list(stationParams);
  //   // console.log('垃圾厢房', res);
  //   let ids = res.Data.map((item) => item.Id);
  //   if (ids.length == 0) return [];
  //   let stationStatisticParams = new GetGarbageStationStatisticNumbersParams();
  //   stationStatisticParams.Ids = ids;
  //   let res2 = await this.stationRequest.statistic.number.list(
  //     stationStatisticParams
  //   );
  //   return res2.Data;
  // }

  // toRank<T>(data: T[]): any {
  //   // 先提取rank数据
  //   let rawData = [];
  //   for (let i = 0; i < data.length; i++) {
  //     let item = data[i];
  //     if (item instanceof GarbageStationNumberStatistic) {
  //       let obj = {
  //         id: item.Id,
  //         name: item.Name,
  //         statistic: 0,
  //         unit: '分',
  //       };
  //       obj.statistic = item.GarbageRatio ?? 0;
  //       rawData.push(obj);
  //     }
  //   }
  //   // console.log(rawData);
  //   rawData.sort(function (a, b) {
  //     return a.statistic - b.statistic;
  //   });
  //   // console.log(rawData);
  //   let temp = rawData.map((item) => {
  //     let model = new RankModel();
  //     model.id = item.id;
  //     model.name = item.name;
  //     model.statistic =
  //       item.statistic == 100
  //         ? item.statistic.toString()
  //         : item.statistic.toFixed(2);
  //     model.unit = item.unit;

  //     return model;
  //   });
  //   let len = temp.length;
  //   if (len < 6) {
  //     for (let i = 0; i < 6 - len; i++) {
  //       let model = new RankModel();
  //       model.name = '-';
  //       model.statistic = '0';
  //       model.unit = '分';

  //       temp.push(model);
  //     }
  //   }
  //   return temp;
  // }
}
