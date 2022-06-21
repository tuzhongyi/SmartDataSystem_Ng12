/**区域信息 */
export class Region {
  /**区域ID */
  Id!: string;
  /**区域名称 */
  Name!: string;
  /**父区域ID(可选)，如果是根区域节点，则该ID为空 */
  ParentId?: string;
  /**是否为叶节点的区域 */
  IsLeaf!: boolean;
  /**外部扩展ID(可选)，用于国标等区分区域的编码 */
  ExternalId?: string;
  /**区域完整路径(可选)，含本节点，@进行分割，上级节点在前 */
  RegionPath?: string;
  /**描述信息(可选) */
  Description?: string;
  /**区域类型，用于图标区分 */
  RegionType!: number;
  /**创建时间 */
  CreateTime!: Date | string;
  /**更新事件 */
  UpdateTime!: Date | string;
}

export class RegionNode {
  Id!: string;
  Name!: string;
  RegionType!: number;
  Description?: string;
  Nodes?: RegionNode[]
}
export class RegionTree {
  Name!: string;
  Nodes?: RegionNode[];
}