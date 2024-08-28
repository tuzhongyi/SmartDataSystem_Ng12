import { CameraAbnormalType } from 'src/app/enum/camera-abnormal-type.enum';
import { IParams, PagedParams } from '../../IParams.interface';

export class GetCameraAbnormalsStatisticParams implements IParams {
  /**	Int32	最近N小时的统计数据，取值范围：[0-168]小时。0表示不限时长。	O */
  InHours?: number;
  /**	String	所属区划	O */
  DivisionId?: string;
}

export class GetCameraAbnormalsListParams extends PagedParams {
  /**
   * 	Int32
   * 	异常类型：
   *    1：摄像机离线
   *    2：摄像机故障
   *    3：摄像机录像故障
   *  M
   */
  AbnormalType?: CameraAbnormalType;

  /**	Int32	最近N小时的统计数据，取值范围：[0-168]小时。0表示不限时长。	O */
  InHours?: number;
  /**	String	所属区划	O */
  DivisionId?: string;
}
