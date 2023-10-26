import { Transform } from 'class-transformer';
import { transformDateTime } from '../transform.model';
import { GarbageScoreNumber } from './garbage-score-num.model';
/**	区划垃圾评价	*/
export class DivisionGarbageScore {
  /**	String	区划ID	M	*/
  DivisionId!: string;
  /**	String	区划名称	M	*/
  DivisionName!: string;
  /**	DateTime	开始时间	M	*/
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M	*/
  @Transform(transformDateTime)
  EndTime!: Date;
  /**	Int32	评价总数量	M	*/
  ScoreNumber!: number;
  /**	GarbageScoreNumber[]	垃圾评价次数	O	*/
  Scores?: GarbageScoreNumber[];
  /**	Int64	日期	M	*/
  Date!: number;
  /**	Int32	周	M	*/
  Week!: number;
}
