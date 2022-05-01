import { StatisticType } from "src/app/enum/statistic-type.enum";
import { TimeUnit } from "src/app/enum/time-unit.enum";



export interface GarbageStationDetailsChartOptions {
    stationIds: string[];
    begin: Date;
    end: Date;
    unit: TimeUnit;
    type: StatisticType;
  }