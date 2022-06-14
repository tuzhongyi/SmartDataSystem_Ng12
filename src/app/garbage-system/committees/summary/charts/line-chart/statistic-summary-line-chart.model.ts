import { EventType } from 'src/app/enum/event-type.enum';

export class StatisticSummaryLineChartViewModel {
  title: string = '';
  type: EventType = EventType.IllegalDrop;
  xAxis: string[] = new Array<string>();
  data: number[] = new Array<number>();
}
