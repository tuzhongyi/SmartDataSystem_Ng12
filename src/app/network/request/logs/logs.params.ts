import { VideoOperationType } from 'src/app/enum/video-operation-type.enum';
import { PagedDurationParams } from '../IParams.interface';

export class GetOperationLogsParams extends PagedDurationParams {
  /**	Int32[]	操作类型
   *  1:视频预览
   *  2:视频回放
   * 	O	*/
  OperationTypes?: VideoOperationType[];
  /**	String[]	操作用户	O	*/
  UserIds?: string[];
  /**	String	用户名	O	*/
  Username?: string;
  /**	String[]	投放点ID	O	*/
  GarbageStationIds?: string[];
  /**	String	投放点名称，支持LIKE	O	*/
  GarbageStationName?: string;
  /**	String[]	摄像机ID	O	*/
  CameraIds?: string[];
  /**	String	摄像机名称，支持LIKE	O	*/
  CameraName?: string;
  /**	String[]	区划ID	O	*/
  DivisionIds?: string[];
  /**	String	区划名称，支持LIKE	O	*/
  DivisionName?: string;
  /**	String	参数	O	*/
  Arguments?: string;
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}
