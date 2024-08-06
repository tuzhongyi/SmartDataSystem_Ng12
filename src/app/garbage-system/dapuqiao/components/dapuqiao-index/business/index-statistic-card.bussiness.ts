import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { StatisticCardViewModel } from 'src/app/garbage-system/components/statistic-card/statistic-card.model';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { IndexWindowBussiness } from './index-window.business';

@Injectable()
export class IndexStatisticCardBussiness
  implements IBusiness<DivisionNumberStatistic, StatisticCardViewModel[]>
{
  constructor(
    private divisionService: DivisionRequestService,
    private garbageStationService: GarbageStationRequestService,
    private storeService: GlobalStorageService,
    private window: IndexWindowBussiness
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
    let data = await this.getData(this.storeService.division.selected.Id);
    let array = this.Converter.Convert(data);
    let params = new GetGarbageStationsParams();
    params.DivisionId = this.storeService.division.selected.Id;
    let { Data: stations } = await this.garbageStationService.cache.list(
      params
    );
    let count = this.Converter.createGarbageStation(stations.length);
    array.unshift(count);

    this.storeService.statistic.station.count = parseInt(array[0].value);
    this.storeService.statistic.station.drop = parseInt(array[1].value);
    this.storeService.statistic.full = parseInt(array[2].value);
    this.storeService.statistic.illegalDrop = parseInt(array[3].value);
    this.storeService.statistic.mixedInto = parseInt(array[4].value);

    return array;
  }
  getData(divisionId: string): Promise<DivisionNumberStatistic> {
    return this.divisionService.statistic.number.cache.get(divisionId);
  }

  onclick(index: number) {
    let model = this.cards[index];
    switch (index) {
      case 0:
        this.window.station.clear();
        this.window.station.show = true;
        break;
      case 1:
        this.window.drop.clear();
        this.window.drop.show = true;
        break;
      case 2:
        this.window.full.clear();
        this.window.full.show = true;
        break;
      case 3:
        this.window.record.clear();
        this.window.record.type = EventType.IllegalDrop;
        this.window.record.count = parseInt(model.value);
        this.window.record.show = true;
        break;
      case 4:
        this.window.record.clear();
        this.window.record.type = EventType.MixedInto;
        this.window.record.count = parseInt(model.value);
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
    let card = new StatisticCardViewModel(count);
    card.title =
      Language.json.garbage + Language.json.station + Language.json.number;
    card.value = `${count}`;
    card.class = 'sky-blue-text2';
    return card;
  }

  createRetentionStation(input: DivisionNumberStatistic) {
    let card = new StatisticCardViewModel(input);
    card.title =
      Language.json.garbage + Language.json.stay + Language.json.station;
    card.value = `${input.GarbageDropStationNumber ?? 0}`;
    card.class = 'orange-red-text';
    return card;
  }
  createFullStation(input: DivisionNumberStatistic) {
    let card = new StatisticCardViewModel(input);
    card.title =
      Language.json.did +
      Language.json.full +
      Language.json.station +
      Language.json.number;
    card.value = `${input.DryFullStationNumber + input.WetFullStationNumber}`;
    card.class = 'orange-text';
    return card;
  }
  createEvent(input: DivisionNumberStatistic, type: EventType) {
    let card = new StatisticCardViewModel(input);
    if (input.TodayEventNumbers) {
      let number = input.TodayEventNumbers.find((x) => x.EventType === type);
      if (number) {
        card.value = `${number.DayNumber}`;
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
