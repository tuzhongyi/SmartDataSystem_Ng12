import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';

import { StatisticCardItem, StatisticType } from './statistic-card-group.model';

export class StatisticCardConverter {
  stationcount(count: number) {
    let card = new StatisticCardItem(count, StatisticType.stationcount);
    card.title = Language.json.garbage + Language.json.station;
    card.value = `${count}`;
    card.class = 'sky-blue-text2';
    return card;
  }

  stationdrop(input?: DivisionNumberStatistic) {
    let card = new StatisticCardItem(input, StatisticType.stationdrop);
    card.title = Language.json.stay + Language.json.station;
    card.value = `${input?.GarbageDropStationNumber ?? 0}`;
    card.class = 'orange-red-text';
    return card;
  }
  stationfull(input?: DivisionNumberStatistic) {
    let card = this.createEvent(
      {
        event: EventType.GarbageFull,
        statistic: StatisticType.stationfull,
      },
      input
    );
    card.title = Language.json.garbage + Language.json.full;
    card.class = 'orange-text';
    return card;
  }
  private createEvent(
    type: { event: EventType; statistic: StatisticType },
    input?: DivisionNumberStatistic
  ) {
    let card = new StatisticCardItem(input, type.statistic);
    if (input && input.TodayEventNumbers) {
      let number = input.TodayEventNumbers.find(
        (x) => x.EventType === type.event
      );
      if (number) {
        card.value = `${number.DayNumber}`;
      }
    }
    return card;
  }
  illegaldrop(input?: DivisionNumberStatistic) {
    let card = this.createEvent(
      {
        event: EventType.IllegalDrop,
        statistic: StatisticType.recordillegaldrop,
      },
      input
    );
    card.title = Language.json.EventType.IllegalDrop;
    card.class = 'powder-red-text';
    return card;
  }
  mixedinto(input?: DivisionNumberStatistic) {
    let card = this.createEvent(
      {
        event: EventType.MixedInto,
        statistic: StatisticType.recordmixedinto,
      },
      input
    );
    card.title = Language.json.EventType.MixedInto;
    card.class = 'light-purple-text';
    return card;
  }

  task(input?: DivisionNumberStatistic) {
    let count = 0;
    let unhandled = 0;
    let handled = 0;
    if (input && input.TodayEventNumbers) {
      input.TodayEventNumbers.filter(
        (x) => x.EventType === EventType.GarbageDrop
      ).forEach((item) => {
        count += item.DayNumber;
      });
      input.TodayEventNumbers.filter(
        (x) => x.EventType === EventType.GarbageDropHandle
      ).forEach((item) => {
        handled += item.DayNumber;
      });
      unhandled = count - handled;
    }
    let card = new StatisticCardItem(input, StatisticType.task);

    let length = `${unhandled}${count}`.length;
    let style = '';
    if (length >= 5) {
      style = `style="font-size:${20}px;"`;
    }

    card.title = '垃圾滞留';
    card.value = `<div class="powder-red-text ${
      length >= 5 ? 'font22' : ''
    }">${unhandled}</div><div class="light-blue-text split">/</div><div class="sky-blue-text2 ${
      length >= 5 ? 'font22' : ''
    }">${count}</div>`;
    card.class = 'task';
    return card;
  }
}
