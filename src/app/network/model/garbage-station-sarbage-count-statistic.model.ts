import { Transform } from 'class-transformer';
import { Model } from './model.interface';
import { transformDateTime } from './transform.model';

/** 垃圾房的垃圾堆数量统计信息 */
export class GarbageStationGarbageCountStatistic extends Model {
  /**	String	垃圾房ID	M */
  Id!: string;
  /**	String	垃圾房名称	M */
  Name!: string;
  /**	DateTime	开始时间	M */
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDateTime)
  EndTime!: Date;
  /**	Int32	垃圾堆数量	M */
  GarbageCount!: number;
  /**	Double	有垃圾时长，单位：分钟	O */
  GarbageDuration?: number;
  /**	Double	无垃圾时长，单位：分钟	O */
  CleanDuration?: number;
}
