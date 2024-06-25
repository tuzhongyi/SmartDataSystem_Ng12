import { IModel } from '../model.interface';

/**	GarbageWeight(垃圾重量)	*/
export class GCHAGarbageWeight implements IModel {
  /**	String	投放口或存桶区类型	M	*/
  CanType!: string;
  /**	Double	重量，单位：KG	M	*/
  Weight!: number;
}
