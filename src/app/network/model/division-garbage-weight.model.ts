import { Transform } from 'class-transformer';
import { CollectionGarbageWeight } from './garbage-weight.model';
import { transformDateTime } from './transform.model';
/**	区划垃圾重量	*/
export class DivisionGarbageWeight {
  /**	String	区划ID	M	*/
  DivisionId!: string;
  /**	String	区划名称	M	*/
  DivisionName!: string;
  /**	DateTime	开始时间	M	*/
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M	*/
  @Transform(transformDateTime)
  EndTime!: Date;
  /**	Double	总重量，单位：KG	M	*/
  TotalWeight!: number;
  /**	GarbageWeight[]	分类垃圾重量	O	*/
  Weights?: CollectionGarbageWeight[];
  /**	Int64	日期	M	*/
  Date!: number;
  /**	Int32	周	M	*/
  Week!: number;
}
