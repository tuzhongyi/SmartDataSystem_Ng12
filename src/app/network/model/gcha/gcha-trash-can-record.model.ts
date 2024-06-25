import { Transform } from 'class-transformer';
import { IIdModel } from '../model.interface';
import { transformDateTime } from '../transform.model';
import { GCHAMeshDestination } from './gcha-mesh-destination.model';

/**	TrashCanRecord(垃圾桶记录)	*/
export class GCHATrashCanRecord implements IIdModel {
  /**	String	记录ID	M	*/
  Id!: string;
  /**	String	记录类型	M	*/
  RecordType!: string;
  /**	String	机器人ID	M	*/
  RobotId!: string;
  /**	String	机器人名称	O	*/
  RobotName?: string;
  /**	DateTime	操作时间	M	*/
  @Transform(transformDateTime)
  Time!: Date;
  /**	MeshDestination[]	操作节点	O	*/
  Destinations?: GCHAMeshDestination[];
  /**	Double	重量，单位：KG	O	*/
  Weight?: number;
  /**	String	投放口或存桶区类型	M	*/
  CanType!: string;
  /**	Int32	命令ID	O	*/
  CommandId?: number;
  /**	Int32	命令执行结果	O	*/
  CommandResult?: number;
  /**	String	命令执行结果描述	O	*/
  CommandDesc?: string;
  /**	Boolean	发送结果，True：成功	M	*/
  Send!: boolean;
  /**	String	命令描述内容	O	*/
  Description?: string;
}
