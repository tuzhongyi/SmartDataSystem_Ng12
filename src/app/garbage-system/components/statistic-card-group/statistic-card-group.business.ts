import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

import { StatisticCardConverter } from './statistic-card-group.converter';
import { StatisticCardItem } from './statistic-card-group.model';

@Injectable()
export class StatisticCardGroupBussiness
  implements IBusiness<DivisionNumberStatistic, StatisticCardItem[]>
{
  constructor(
    private divisionService: DivisionRequestService,
    private garbageStationService: GarbageStationRequestService,
    private storeService: GlobalStorageService
  ) {}

  Converter = new StatisticCardConverter();
  subscription?: ISubscription | undefined;
  async load(): Promise<StatisticCardItem[]> {
    let data = await this.getData(this.storeService.divisionId);

    let array: StatisticCardItem[] = [];
    let card: StatisticCardItem;

    card = this.Converter.stationcount(await this.stationcount());
    array.push(card);
    this.storeService.statistic.station.count = parseInt(card.value);

    card = this.Converter.stationdrop(data);
    array.push(card);
    this.storeService.statistic.station.drop = parseInt(card.value);

    card = this.Converter.stationfull(data);
    array.push(card);
    this.storeService.statistic.full = parseInt(card.value);

    card = this.Converter.illegaldrop(data);
    array.push(card);
    this.storeService.statistic.illegalDrop = parseInt(card.value);

    card = this.Converter.mixedinto(data);
    array.push(card);
    this.storeService.statistic.mixedInto = parseInt(card.value);

    card = this.Converter.task(data);
    array.push(card);

    return array;
  }

  init() {
    let array: StatisticCardItem[] = [];
    let card: StatisticCardItem;

    card = this.Converter.stationcount(0);
    array.push(card);
    this.storeService.statistic.station.count = parseInt(card.value);

    card = this.Converter.stationdrop();
    array.push(card);
    this.storeService.statistic.station.drop = parseInt(card.value);

    card = this.Converter.stationfull();
    array.push(card);
    this.storeService.statistic.full = parseInt(card.value);

    card = this.Converter.illegaldrop();
    array.push(card);
    this.storeService.statistic.illegalDrop = parseInt(card.value);

    card = this.Converter.mixedinto();
    array.push(card);
    this.storeService.statistic.mixedInto = parseInt(card.value);

    card = this.Converter.task();
    array.push(card);

    return array;
  }

  getData(divisionId: string): Promise<DivisionNumberStatistic> {
    return this.divisionService.statistic.number.cache.get(divisionId);
  }

  private async stationcount() {
    let params = new GetGarbageStationsParams();
    params.PageSize = 1;
    params.DivisionId = this.storeService.divisionId;
    let paged = await this.garbageStationService.cache.list(params);
    return paged.Page.TotalRecordCount;
  }
}
