import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { IModel } from 'src/app/network/model/model.interface';

export interface DetailsChartLoadOptions {
  stationId?: string;
  divisionId?: string;
  begin: Date;
  end: Date;
  unit: TimeUnit;
  type: EventType[];
}

export class DetailsChartDownloadArgs {
  name: string = '';
  eventType: EventType = EventType.None;
  time: string = '';
  unit: TimeUnit = TimeUnit.Hour;
  types: EventType[] = [];
  datas: ITimeData<IModel | undefined>[][] = [];
}
