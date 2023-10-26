import { TrashCanType } from 'src/app/enum/trashcan-type.enum';

/**	垃圾重量	*/
export class CollectionGarbageWeight {
  /**	Int32	垃圾类型，1：干垃圾桶 2：湿垃圾桶	M	*/
  CanType!: TrashCanType;
  /**	Double	重量，单位：KG	M	*/
  Weight!: number;
}

import { GarbageType } from 'src/app/enum/garbage-type.enum';

export class GarbageWeight {
  /** 	Int32	垃圾类型
1：干垃圾桶
2：湿垃圾桶
3：可回收垃圾桶
4：有害垃圾桶	M */
  GarbageType!: GarbageType;
  /** 	Double	当日总重量，单位：KG	M */
  DayWeight!: number;
  /** 	Double	当日时间段内重量，单位：KG	O */
  DeltaWeight?: number;
}
