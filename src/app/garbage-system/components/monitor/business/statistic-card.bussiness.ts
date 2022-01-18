import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { Enum } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Language } from 'src/app/global/tool/language';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { GetDivisionStatisticNumbersParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { StatisticCardViewModel } from '../../statistic-card/statistic-card.model';

@Injectable()
export class StatisticCardBussiness
  implements IBusiness<DivisionNumberStatistic, StatisticCardViewModel[]>
{
  constructor(
    private divisionService: DivisionRequestService,
    private garbageStationService: GarbageStationRequestService,
    private storeService: StoreService
  ) {}
  Converter = new StatisticCardConverter();
  subscription?: ISubscription | undefined;
  async load(...args: any): Promise<StatisticCardViewModel[]> {
    let data = await this.getData(this.storeService.divisionId);
    let array = this.Converter.Convert(data);
    let stations = await this.garbageStationService.cache.all();
    let count = this.Converter.createGarbageStation(stations.length);
    array.unshift(count);
    return array;
  }
  getData(divisionId: string): Promise<DivisionNumberStatistic> {
    return this.divisionService.statistic.number.cache.get(divisionId);
  }
}

class StatisticCardConverter
  implements IConverter<DivisionNumberStatistic, StatisticCardViewModel[]>
{
  Convert(
    input: DivisionNumberStatistic,
    ...args: any[]
  ): StatisticCardViewModel[] {
    let array: StatisticCardViewModel[] = [];
    let card = this.createRetentionStation(input);
    array.push(card);
    card = this.createFullStation(input);
    array.push(card);
    card = this.createIllegalDrop(input);
    array.push(card);
    card = this.createMixedInto(input);
    array.push(card);
    return array;
  }

  createGarbageStation(count: number) {
    let card = new StatisticCardViewModel();
    card.title =
      Language.json.garbage + Language.json.station + Language.json.number;
    card.value = count;
    card.class = 'sky-blue-text2';
    return card;
  }

  createRetentionStation(input: DivisionNumberStatistic) {
    let card = new StatisticCardViewModel();
    card.title =
      Language.json.garbage + Language.json.stay + Language.json.station;
    card.value = input.GarbageDropStationNumber ?? 0;
    card.class = 'green-text';
    return card;
  }
  createFullStation(input: DivisionNumberStatistic) {
    let card = new StatisticCardViewModel();
    card.title =
      Language.json.did +
      Language.json.full +
      Language.json.station +
      Language.json.number;
    card.value = input.DryFullStationNumber + input.WetFullStationNumber;
    card.class = 'orange-text';
    return card;
  }
  createEvent(input: DivisionNumberStatistic, type: EventType) {
    let card = new StatisticCardViewModel();
    if (input.TodayEventNumbers) {
      let number = input.TodayEventNumbers.find((x) => x.EventType === type);
      if (number) {
        card.value = number.DayNumber;
      }
    }
    return card;
  }
  createIllegalDrop(input: DivisionNumberStatistic) {
    let card = this.createEvent(input, EventType.IllegalDrop);
    card.title = Language.json.EventType.IllegalDrop + Language.json.event;
    card.class = 'powder-red-text';
    return card;
  }
  createMixedInto(input: DivisionNumberStatistic) {
    let card = this.createEvent(input, EventType.MixedInto);
    card.title = Language.json.EventType.MixedInto + Language.json.event;
    card.class = 'light-purple-text';
    return card;
  }
}
