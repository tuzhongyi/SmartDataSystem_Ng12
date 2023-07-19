import { IModel } from '../model.interface';

export class AIGarbageRoom implements IModel {
  /**	String	房屋编号	M	*/
  RoomNo!: string;
  /**	String	楼层	O	*/
  Floor?: string;
  /**	String	描述	O	*/
  Description?: string;
}
