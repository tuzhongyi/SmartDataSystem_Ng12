
/**获取区域信息列表请求参数 */
export class GetRegionsParams {
  /**页码[1-n](可选) */
  PageIndex?: number;
  /**分页大小[1-100](可选) */
  PageSize?: number;
  /**区域ID列表(可选) */
  RegionIds?: string[];
  /**区域名称，支持LIKE(可选) */
  Name?: string;
  /**区域类型(可选) */
  RegionType?: number;
  /**父区域ID(可选) */
  ParentId?: string;
  /**外部扩展ID列表(可选) */
  ExternalIds?: string[];
}
