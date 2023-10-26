import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import {
  StatisticCardViewModel,
  StatisticType,
} from '../../statistic-card/statistic-card.model';
import { GarbageStationWindowIndex } from '../../windows/garbage-station-window/garbage-station-window.component';
import { MonitorWindowBussiness } from './window.business';

@Injectable()
export class MonitorStatisticCardBussiness
  implements IBusiness<DivisionNumberStatistic, StatisticCardViewModel[]>
{
  constructor(
    private divisionService: DivisionRequestService,
    private garbageStationService: GarbageStationRequestService,
    private storeService: GlobalStorageService,
    private window: MonitorWindowBussiness
  ) {
    this.loading.subscribe(async (x) => {
      this.cards = await this.load();
    });
  }

  cards: StatisticCardViewModel[] = [];

  loading: EventEmitter<void> = new EventEmitter();

  Converter = new StatisticCardConverter();
  subscription?: ISubscription | undefined;
  async load(...args: any): Promise<StatisticCardViewModel[]> {
    let data = await this.getData(this.storeService.divisionId);
    let array = this.Converter.Convert(data);
    let params = new GetGarbageStationsParams();
    params.DivisionId = this.storeService.divisionId;
    let { Data: stations } = await this.garbageStationService.cache.list(
      params
    );
    let count = this.Converter.createGarbageStation(stations.length);
    array.unshift(count);

    this.storeService.statistic.station.count = array[0].value;
    this.storeService.statistic.station.drop = array[1].value;
    this.storeService.statistic.full = array[2].value;
    this.storeService.statistic.illegalDrop = array[3].value;
    this.storeService.statistic.mixedInto = array[4].value;

    return array;
  }
  getData(divisionId: string): Promise<DivisionNumberStatistic> {
    return this.divisionService.statistic.number.cache.get(divisionId);
  }

  onclick(model: StatisticCardViewModel) {
    switch (model.type) {
      case StatisticType.stationCount:
        this.window.station.stationId = undefined;
        this.window.station.index = GarbageStationWindowIndex.station;
        this.window.station.show = true;
        break;
      case StatisticType.stationDrop:
        this.window.drop.args = {};
        this.window.drop.show = true;
        break;
      case StatisticType.stationFull:
        this.window.full.show = true;
        break;
      case StatisticType.illegalDropRecord:
        this.window.record.type = EventType.IllegalDrop;
        this.window.record.count = model.value;
        this.window.record.stationId = undefined;
        this.window.record.divisionId = undefined;
        this.window.record.show = true;
        break;
      case StatisticType.mixedIntoRecord:
        this.window.record.type = EventType.MixedInto;
        this.window.record.count = model.value;
        this.window.record.stationId = undefined;
        this.window.record.divisionId = undefined;
        this.window.record.show = true;
        break;
      default:
        break;
    }
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
    let card = new StatisticCardViewModel(StatisticType.stationCount, count);
    card.title =
      Language.json.garbage + Language.json.station + Language.json.number;
    card.value = count;
    card.class = 'sky-blue-text2';
    return card;
  }

  createRetentionStation(input: DivisionNumberStatistic) {
    let card = new StatisticCardViewModel(StatisticType.stationDrop, input);
    card.title =
      Language.json.garbage + Language.json.stay + Language.json.station;
    card.value = input.GarbageDropStationNumber ?? 0;
    card.class = 'orange-red-text';
    return card;
  }
  createFullStation(input: DivisionNumberStatistic) {
    let card = new StatisticCardViewModel(StatisticType.stationFull, input);
    card.title =
      Language.json.did +
      Language.json.full +
      Language.json.station +
      Language.json.number;
    card.value = input.DryFullStationNumber + input.WetFullStationNumber;
    card.class = 'orange-text';
    return card;
  }
  createEvent(
    input: DivisionNumberStatistic,
    type: { event: EventType; statistic: StatisticType }
  ) {
    let card = new StatisticCardViewModel(type.statistic, input);
    if (input.TodayEventNumbers) {
      let number = input.TodayEventNumbers.find(
        (x) => x.EventType === type.event
      );
      if (number) {
        card.value = number.DayNumber;
      }
    }
    return card;
  }
  createIllegalDrop(input: DivisionNumberStatistic) {
    let card = this.createEvent(input, {
      event: EventType.IllegalDrop,
      statistic: StatisticType.illegalDropRecord,
    });
    card.title = Language.json.EventType.IllegalDrop + Language.json.event;
    card.class = 'powder-red-text';
    return card;
  }
  createMixedInto(input: DivisionNumberStatistic) {
    let card = this.createEvent(input, {
      event: EventType.MixedInto,
      statistic: StatisticType.mixedIntoRecord,
    });
    card.title = Language.json.EventType.MixedInto + Language.json.event;
    card.class = 'light-purple-text';
    return card;
  }
}
