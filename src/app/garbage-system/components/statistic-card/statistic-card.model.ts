import { EventType } from 'src/app/enum/event-type.enum';

export class StatisticCardViewModel {
  constructor(type: StatisticType) {
    this.type = type;
  }
  title: string = '';
  value: number = 0;
  style: any = {};
  class: string = '';
  type: StatisticType;
}

export enum StatisticType {
  stationCount,
  stationDrop,
  stationFull,
  illegalDropRecord,
  mixedIntoRecord,
}
