import { Transform } from 'class-transformer';
import { transformDate } from './transform.model';

/**
 *  视频Url地址
 *
 *  Url示例：
 *  ws!://116.228.67.70!:8800/ws/video/howellps/live/00310101031111111000096000000000/1/0/live.h264?user=howell&password=pwd123456
 *  ws!://116.228.67.70!:8800/ws/video/howellps/vod/00310101031111111000096000000000/1/0/2021-01-18T05!:29!:24.856Z_2021-01-18T06!:29!:24.856Z/vod.h264?user=howell&password= pwd123456
 *  QueryString中的user，password请使用用户登录的用户名密码，此处示例中的用户名密码不一定是实际项目中的用户名密码
 *
 */
export interface Url {
  /**	String	Url地址	M */
  Url: string;
  /**	String	用户名	O */
  Username?: string;
  /**	String	密码	O */
  Password?: string;
  /**	String	网页Url地址	O */
  WebUrl?: string;
}
/** 摄像机照片地址 */
export interface CameraImageUrl {
  /**	String	摄像机ID	M */
  CameraId: string;
  /**	String	摄像机名称	O */
  CameraName?: string;
  /**	String	照片地址	M */
  ImageUrl: string;
}

/** 摄像机照片信息 */
export class CameraPictureUrl {
  /**	Boolean	抓图结果，True：成功	M */
  Result!: boolean;
  /**	String	图片ID	O */
  Id?: string;
  /**	String	图片URL地址	O */
  Url?: string;
  /**	DateTime	创建时间	M */
  @Transform(transformDate)
  CreateTime!: Date;
  /**	String	摄像机ID	M */
  CameraId!: string;
  /**	String	摄像机名称	O */
  CameraName?: string;
}
/** 录像文件Url */
export class RecordFileUrl {
  /**	Boolean	结果，True：成功	M */
  Result!: boolean;
  /**	String	图片URL地址	M */
  Url!: string;
}
