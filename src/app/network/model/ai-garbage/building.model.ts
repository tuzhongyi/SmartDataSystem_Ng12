import { Type } from 'class-transformer';
import 'reflect-metadata';
import { IModel } from '../model.interface';

import { AIGarbageRoom } from './room.model';

export class AIGarbageBuilding implements IModel {
  /**	String	楼栋编号	M	*/
  BuildingNo!: string;
  /**	String	描述	O	*/
  Description?: string;
  /**	Room[]	房屋列表	O	*/
  @Type(() => AIGarbageRoom)
  Rooms?: AIGarbageRoom[];
}
