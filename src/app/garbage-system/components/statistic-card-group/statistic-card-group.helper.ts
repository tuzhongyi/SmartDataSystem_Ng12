import { StatisticType } from './statistic-card-group.model';

export class StatisticCardHelper {
  static fullscreen(fullscreen: boolean) {
    if (fullscreen) {
      return [
        StatisticType.stationcount,
        StatisticType.stationdrop,
        StatisticType.stationfull,
        StatisticType.recordillegaldrop,
        StatisticType.recordmixedinto,
        StatisticType.task,
      ];
    } else {
      return [
        StatisticType.stationcount,
        StatisticType.stationdrop,
        StatisticType.stationfull,
        StatisticType.recordillegaldrop,
        StatisticType.recordmixedinto,
      ];
    }
  }
}
