import { RobotStatus } from '../ai-garbage/robot-status.model';
import { IIdModel } from '../model.interface';

/**	RobotStatus (机器人状态)	*/
export class GarbageStationRobotStatus extends RobotStatus implements IIdModel {
  /**	String	机器人唯一ID，创建后必填	M	*/
  Id!: string;
}
