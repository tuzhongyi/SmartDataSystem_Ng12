import { EventNumberStatistic } from '../network/model/garbage-station/event-number-statistic.model';
import { ItemModel } from './item.model';

export class EventNumberStatisticGroup extends ItemModel {
  datas: EventNumberStatistic[] = [];
}
