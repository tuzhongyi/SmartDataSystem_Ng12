import { GisPoint } from './gis_point.model';

/** 地理信息坐标区域 */
export class GisArea {
  /**	GisPoint[]	坐标点	M */
  GisPoint!: GisPoint[];
  /**	Int32	坐标系类型	M */
  GisType!: number;
}
