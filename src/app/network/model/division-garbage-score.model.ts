import { Transform } from 'class-transformer';
import { GarbageScoreNumber } from './garbage-score-num.model';
import { transformDateTime } from './transform.model';

/*
 * @Author: pmx
 * @Date: 2022-11-03 16:51:20
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-03 16:52:29
 */
export class DivisionGarbageScore {
  // 区划ID
  DivisionIdD!: string;

  // 区划名称
  DivisionName!: string;

  // 开始时间
  @Transform(transformDateTime)
  BeginTime!: Date;

  // 结束时间
  @Transform(transformDateTime)
  EndTime!: Date;

  // 评价总数量
  ScoreNumber!: number;

  Scores?: GarbageScoreNumber[];

  // 日期
  Date!: number;

  // 周
  Week!: number;
}
