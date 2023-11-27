import { Transform } from 'class-transformer';
import { VideoOperationType } from 'src/app/enum/video-operation-type.enum';
import { IIdModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

export class VideoOperationLog implements IIdModel {
  /**	String	记录ID	M	*/
  Id!: string;
  /**	String	操作用户	O	*/
  UserId?: string;
  /**	String	用户名	O	*/
  Username?: string;
  /**	Int32	操作类型
   *  1:视频预览
   *  2:视频回放
   * 	M	*/
  OperationType!: VideoOperationType;
  /**	String	描述	O	*/
  Description?: string;
  /**	DateTime	操作时间	M	*/
  @Transform(transformDateTime)
  Time!: Date;
  /**	String	投放点ID	O	*/
  GarbageStationId?: string;
  /**	String	投放点名称	O	*/
  GarbageStationName?: string;
  /**	String	摄像机ID	O	*/
  CameraId?: string;
  /**	String	摄像机名称	O	*/
  CameraName?: string;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	区划名称	O	*/
  DivisionName?: string;
  /**	String[]	参数	O	*/
  Arguments?: string[];
}
