/** 区划树形结构 */
export interface DivisionTree {
  /**	String	根名称，默认：根区划	M */
  Name: string;
  /**	DivisionNode[]	子区划节点	O */
  Nodes?: DivisionNode[];
}
/** 区划节点 */
export interface DivisionNode {
  /**	String	区划ID	M */
  Id: string;
  /**	String	区划名称	M */
  Name: string;
  /**	Int32	区划类型	M */
  DivisionType: number;
  /**	String	描述信息	O */
  Description?: string;
  /**	DivisionNode[]	子区划节点	O */
  Nodes?: DivisionNode[];
}
