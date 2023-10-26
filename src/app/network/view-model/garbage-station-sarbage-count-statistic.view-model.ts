import { GarbageStationGarbageCountStatistic } from '../model/garbage-station/garbage-station-sarbage-count-statistic.model';
import { GarbageStation } from '../model/garbage-station/garbage-station.model';

/** 垃圾房的垃圾堆数量统计信息 */
export class GarbageStationGarbageCountStatisticModel extends GarbageStationGarbageCountStatistic {
  Station?: Promise<GarbageStation>;
}
