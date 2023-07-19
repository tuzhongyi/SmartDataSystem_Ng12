import { IModel } from '../model.interface';

export class AIGarbageStation implements IModel {
  /**	String	垃圾厢房ID	M	*/
  GarbageStationId!: string;
  /**	String	垃圾厢房名称	O	*/
  GarbageStationName?: string;
}
