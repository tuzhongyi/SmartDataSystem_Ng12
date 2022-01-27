export class StatisticCardViewModel<T = any> {
  constructor(type: StatisticType, data: T) {
    this.type = type;
    this.data = data;
  }
  title: string = '';
  value: number = 0;
  style: any = {};
  class: string = '';
  type: StatisticType;
  data: T;
}

export enum StatisticType {
  stationCount,
  stationDrop,
  stationFull,
  illegalDropRecord,
  mixedIntoRecord,
}
