import { GisType } from 'src/app/enum/gis-type.enum';
import { GisPoint } from './gis-point.model';
import { IModel } from './model.interface';

/** 地理信息坐标区域 */
export class GisArea implements IModel {
  /**	GisPoint[]	坐标点	M */
  GisPoint!: GisPoint[];
  /**	Int32	坐标系类型	M */
  GisType!: GisType;
}
