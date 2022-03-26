import { Type } from 'class-transformer';
import { DivisionType } from 'src/app/enum/division-type.enum';
import 'reflect-metadata';
import { IModel } from './model.interface';
import { Division } from './division.model';

/** 区划树形结构 */
export class DivisionTree implements IModel {
  /**	String	根名称，默认：根区划	M */
  Name: string = '';
  /**	DivisionNode[]	子区划节点	O */
  @Type(() => DivisionNode)
  Nodes: DivisionNode[] = [];
}
/** 区划节点 */
export class DivisionNode extends Division {
  /**	String	区划ID	M */
  Id: string = '';
  /**	String	区划名称	M */
  Name: string = '';
  /**	Int32	区划类型	M */
  DivisionType: DivisionType = DivisionType.None;
  /**	String	描述信息	O */
  Description: string = '';
  /**	DivisionNode[]	子区划节点	O */
  @Type(() => DivisionNode)
  Nodes: DivisionNode[] = [];
}
