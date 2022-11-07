import { TrashCanType } from 'src/app/enum/trashcan-type.enum';

/**	垃圾重量	*/
export class GarbageWeight {
  /**	Int32	垃圾类型，1：干垃圾桶 2：湿垃圾桶	M	*/
  CanType!: TrashCanType;
  /**	Double	重量，单位：KG	M	*/
  Weight!: number;
}
