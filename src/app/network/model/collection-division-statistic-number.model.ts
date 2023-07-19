import { CollectionGarbageWeight } from './garbage-weight.model';

/** 区划统计数据 */
export class CollectionDivisionStatisticNumber {
  /**	String	区划ID	M */
  DivisionId!: string;
  /**	String	区划名称	M */
  DivisionName!: string;
  /**	Int32	清运车辆总数量	O */
  GarbageVehicleNumber?: number;
  /**	Int32	清运人员数量	O */
  MemberNumber?: number;
  /**	Int32	垃圾收运点数量	O */
  CollectionPointNumber?: number;
  /**	Double	总垃圾清运重量，单位：KG	O */
  Weight?: number;
  Weights?: CollectionGarbageWeight[];
}
