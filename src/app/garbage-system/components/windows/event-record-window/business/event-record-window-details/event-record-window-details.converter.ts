import { ITimeData } from "src/app/common/components/charts/chart.model";
import { IConverter } from "src/app/common/interfaces/converter.interface";
import { StatisticToTimeDataConverter } from "src/app/Converter/statistic-to-timedata.converter";
import { EventType } from "src/app/enum/event-type.enum";
import { EventNumberStatistic } from "src/app/network/model/event-number-statistic.model";

export class EventRecordWindowDetailsConverter
  extends StatisticToTimeDataConverter
  implements IConverter<EventNumberStatistic[], ITimeData<number>[]>{


}