import { PagedParams } from '../../IParams.interface';

/**获取资源标签列表请求参数 */
export class GetResourceLabelsParams extends PagedParams {
  /**资源标签ID列表(可选) */
  ResourceLabelIds?: string[];
  /**标签名称，支持LIKE(可选) */
  LabelName?: string;
}
