import { Division } from '../model/division.model';

/** 区划 */
export class DivisionModel extends Division {
  /**	String	父区划ID，如果是根区域节点，则该ID为空	O */
  Parent?: Promise<DivisionModel>;
}
