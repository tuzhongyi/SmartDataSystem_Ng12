import { Injectable } from '@angular/core';
import {
  Transform,
  TransformationType,
  TransformFnParams,
  Type,
} from 'class-transformer';
import { DivisionType } from './division-type.model';
import { GisType } from './gis-type.model';

/**区划信息 */

export class Division {
  /**区划ID */
  Id!: string;
  /**区划名称 */
  Name!: string;
  /**父区划ID(可选)，如果是根区域节点，则该ID为空 */
  ParentId?: string;
  /**是否为叶节点的区域 */
  IsLeaf!: boolean;
  /**外部扩展ID(可选)，用于国标区划编码 */
  ExternalId?: string;
  /**区划完整路径(可选)，含本节点，@进行分割，上级节点在前 */
  DivisionPath?: string;
  /**描述信息(可选) */
  Description?: string;
  /**人口(可选) */
  Population?: number;
  /**区划类型，用于图标区分 */
  DivisionType!: DivisionType;
  /**创建时间 */
  @Transform(transformDate)
  CreateTime?: Date;
  /**更新事件 */
  @Transform(transformDate)
  UpdateTime?: Date;
  /**区划中心GIS点位(可选) */
  GisPoint?: GisPoint;
  /**区划GIS点位区域(可选) */
  GisArea?: GisArea;
}

function transformDate(params: TransformFnParams) {
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    return new Date(params.value);
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    return (params.value as Date).toISOString();
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return new Date(params.value);
  }
  return '';
}

export class GisArea {
  /**
   *	GisPoint[]	坐标点	M
   *
   * @type {GisPoint[]}
   * @memberof GisArea
   */
  GisPoint?: GisPoint[];
  /**
   *	Int32	坐标系类型	M
   *
   * @type {number}
   * @memberof GisArea
   */
  GisType?: number;
}
export class GisPoint {
  constructor(point?: number[], type?: GisType) {
    if (point) {
      this.Longitude = point[0];
      this.Latitude = point[1];
    }
    if (type) {
      this.GisType = type;
    }
  }

  /**
   * Double	经度	M
   *
   * @type {number}
   * @memberof GisPoint
   */
  Longitude?: number;
  /**
   *	Double	纬度	M
   *
   * @type {number}
   * @memberof GisPoint
   */
  Latitude?: number;
  /**
   *	Double	高度	M
   *
   * @type {number}
   * @memberof GisPoint
   */
  Altitude: number = 0;
  /**
   *	Int32	楼层	O
   *
   * @type {number}
   * @memberof GisPoint
   */
  Floor?: number;
  /**
   *	Int32	坐标系类型	O
   *
   * @type {number}
   * @memberof GisPoint
   */
  GisType?: GisType;
}
