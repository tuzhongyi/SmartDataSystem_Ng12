/**获取资源信息请求参数 */
export class GetResourcesParams extends PagedParams {
  /**资源ID列表(可选) */
  ResourceIds?: string[];
  /**资源名称，支持LIKE(可选) */
  Name?: string;
  /**资源类型(可选) */
  ResourceType?: string;
  /**标签名称的OR筛选(可选) */
  Labels?: string[];
  /**标签ID的OR筛选(可选) */
  LabelIds?: string[];
  /**标签名称的AND筛选(可选) */
  AndLabels?: string[];
  /**标签ID的AND筛选(可选) */
  AndLabelIds?: string[];
  /**平台ID(可选) */
  PlatformId?: string;
  /**所属区域ID */
  RegionIds?: string[];
  /**区域ID必须为NULL */
  RegionIdNullable?: boolean;
}
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { PagedParams } from '../IParams.interface';

/**批量操作结果 */
export class BatchRequest {
  /**资源ID列表 */
  ResourceIds!: string[];
  /**是否删除数据，(可选)，默认：true */
  IsDelete?: boolean;
}

/**批量操作结果 */
export class BatchResult {
  /**操作结果(可选) */
  @Type(() => SingleResult)
  Results?: SingleResult[];
}

/**单个操作结果 */
export class SingleResult {
  /**资源ID */
  ResourceId!: string;
  /**结果：0-成功，1-失败 */
  Result!: number;
  /**描述信息(可选) */
  ResultDescription?: string;
}
