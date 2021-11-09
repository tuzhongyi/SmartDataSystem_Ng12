import { Transform } from 'class-transformer';
import { transformDate } from './transform.model';

/** 垃圾房的垃圾堆数量统计信息 */
export class GarbageStationGarbageCountStatistic {
  /**	String	垃圾房ID	M */
  Id!: string;
  /**	String	垃圾房名称	M */
  Name!: string;
  /**	DateTime	开始时间	M */
  @Transform(transformDate)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDate)
  EndTime!: Date;
  /**	Int32	垃圾堆数量	M */
  GarbageCount!: number;
  /**	Double	有垃圾时长，单位：分钟	O */
  GarbageDuration?: number;
  /**	Double	无垃圾时长，单位：分钟	O */
  CleanDuration?: number;
}
