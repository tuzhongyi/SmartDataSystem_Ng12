import { DivisionType } from 'src/app/model/division-type.model';

/**获取区划列表参数 */
export class DivisionsParams {
  /**页码[1-n] */
  PageIndex: number = 1;

  /**分页大小[1-100] */
  PageSize: number = 9999;

  /**区划ID(可选) */
  Ids?: string[];

  /**区划名称，支持LIKE(可选) */
  Name?: string;

  /**区划类型(可选) */
  DivisionType?: DivisionType;

  /**父ID(可选) */
  ParentId?: string;

  /**区划完整路径(可选)，含本节点，@进行分割，上级节点在前，支持LIKE */
  DivisionPath?: string;

  /**祖辈ID(可选)，返回该ID下的所有子孙区划信息 */
  AncestorId?: string;
}
