import { StatisticCardViewModel } from '../statistic-card/statistic-card.model';

export enum StatisticType {
  stationcount,
  stationdrop,
  stationfull,
  recordillegaldrop,
  recordmixedinto,
  task,
}

export class StatisticCardItem<T = any> extends StatisticCardViewModel<T> {
  constructor(data: T, type: StatisticType) {
    super(data);
    this.type = type;
  }

  type: StatisticType;
}
