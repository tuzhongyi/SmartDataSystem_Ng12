/*
 * @Author: pmx
 * @Date: 2022-11-03 16:56:50
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-03 16:57:19
 */
import { Transform } from 'class-transformer';
import { CollectionPointClassification } from 'src/app/enum/collection-point.enum';
import { GisPoint } from './gis-point.model';
import { transformDateTime } from './transform.model';
import { TrashCan } from './trash-can.model';

// 收运点
export class CollectionPoint {
  // 收运点ID
  Id!: string;

  // 收运点名称
  Name!: string;

  // 收运点类型
  Classification!: CollectionPointClassification;

  // 收运点地址
  Address?: string;

  // 描述信息
  Description?: string;

  // 开始时间
  @Transform(transformDateTime)
  BeginTime!: Date;

  // 结束时间
  @Transform(transformDateTime)
  EndTime!: Date;

  // 当前位置GIS点位
  GisPoint?: GisPoint;

  // 所属区划ID
  DivisionId?: string;

  // 垃圾桶列表
  TrashCans?: TrashCan[];
}
