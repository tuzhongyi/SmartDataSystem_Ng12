import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export class GarbageStationWindowStayModel {
  station!: GarbageStation;
  garde: string = '100';
  avgDropDuration: string = '<div class="statistic-item-value-number">-</div>';
  maxDropDuration: string = '<div class="statistic-item-value-number">-</div>';
  countDropDuration: string =
    '<div class="statistic-item-value-number">-</div>';
  eventCount: number = 0;
  taskCount: number = 0;
}
