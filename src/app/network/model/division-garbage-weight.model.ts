import { Transform } from 'class-transformer';
import { GarbageWeight } from './garbage-weight.model';
import { transformDateTime } from './transform.model';

/*
 * @Author: pmx
 * @Date: 2022-11-03 16:46:55
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-03 16:49:14
 */
export class DivisionGarbageWeight {
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

  // 总重量
  TotalWeight!: number;

  // 分类垃圾重量;
  Weights?: GarbageWeight[];

  // 日期
  Date!: number;

  // 周
  Week!: number;
}
