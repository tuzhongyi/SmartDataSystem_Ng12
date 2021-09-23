import { Transform } from 'class-transformer';
import { CellType } from '../../enum/cell-type.enum';
import { GisArea } from './gis-area.model';
import { GisPoint } from './gis-point.model';
import { transformDate } from './transform.model';

/** 网格单元信息 */
export class GridCell {
  /**	String	网格单元ID街道区划编号+3位社区顺序码+2位单元网格顺序码，如果是社区网格，最后两位为00	M */
  Id!: string;
  /**	String	网格单元名称	M */
  Name!: string;
  /**	String	父网格单元ID，如果是根网格单元节点，则该ID为空	O */
  ParentId?: string;
  /**	Boolean	是否为叶节点的区域	M */
  IsLeaf!: boolean;
  /**	String	外部扩展ID，用于国标区划编码	O */
  ExternalId?: string;
  /**	String	完整路径，含本节点，@进行分割，上级节点在前	O */
  GridCellPath?: string;
  /**	String	描述信息	O */
  Description?: string;
  /**	Int32	人口	O */
  Population?: number;
  /**	Int32	类型，用于图标区分	M */
  CellType!: CellType;
  /**	DateTime	创建时间	M */
  @Transform(transformDate)
  CreateTime!: Date;
  /**	DateTime	更新事件	M */
  @Transform(transformDate)
  UpdateTime!: Date;
  /**	GisPoint	网格中心GIS点位	O */
  GisPoint?: GisPoint;
  /**	GisArea	网格GIS点位区域	O */
  GisArea?: GisArea;
  /**	Double	面积，单位：平方米	O */
  Area?: number;
  /**	Double	周长，单位：米	O */
  Perimeter?: number;
  /**	String	网格主体：主要建筑物名称等，用逗号分隔，	O */
  GridMain?: string;
  /**	String	所属区划ID	O */
  DivisionId?: string;
}
