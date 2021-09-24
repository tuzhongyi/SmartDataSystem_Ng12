import { CellType } from 'src/app/enum/cell-type.enum';
import { IParams, PagedParams } from '../IParams.interface';

export class GetGridCellsParams extends PagedParams implements IParams {
  /**	String[]	网格单元ID	O */
  Ids?: string[];
  /**	String	网格单元名称，支持LIKE	O */
  Name?: string;
  /**	Int32	网格单元类型	O */
  CellType?: CellType;
  /**	String	父ID	O */
  ParentId?: string;
  /**	String	祖辈ID，返回该ID下的所有子孙网格单元信息	O */
  AncestorId?: string;
  /**	String[]	区划ID	O */
  DivisionIds?: string[];
}
