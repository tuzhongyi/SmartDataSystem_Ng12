/**获取垃圾房列表参数 */
export class StationParams {
  /**页码[1-n](可选) */
  PageIndex?: number;
  /**分页大小[1-100](可选) */
  PageSize?: number;
  /**垃圾房ID(可选) */
  Ids?: string[];
  /**垃圾房名称(可选)，支持LIKE */
  Name?: string;
  /**垃圾房类型(可选) */
  StationType?: number;
  /**区划ID(可选) */
  DivisionId?: string;
  /**干垃圾是否满溢(可选) */
  DryFull?: boolean;
  /**湿垃圾是否满溢(可选) */
  WetFull?: boolean;
  /**祖辈ID(可选)，返回该ID下的所有子孙区划及其本身的垃圾房 */
  AncestorId?: string;
}
