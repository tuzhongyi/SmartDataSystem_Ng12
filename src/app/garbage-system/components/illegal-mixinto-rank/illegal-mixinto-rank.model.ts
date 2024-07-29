import { EventNumber } from 'src/app/network/model/garbage-station/event-number.model';

export class NumberStatisticModel {
  Id?: string;
  Name!: string;
  EventNumbers?: EventNumber[];
}
