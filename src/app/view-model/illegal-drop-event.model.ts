import { CommonModel } from "./common-model";

/**垃圾落地事件 */
export class IllegalDropEventModel implements CommonModel {

  /** 事件Id*/
  Id!: string;
  /**资源名称 */
  Name!: string;
  /**图片地址 */
  ImageUrl!: string;
  /**投放点 */
  StationName!: string;
  StationId!: string;
  /**街道 */
  CountyName!: string;
  CountyId!: string;
  /**居委会 */
  CommitteeName!: string;
  CommitteeId!: string;
  /**社区 */
  CommunityName!: string;
  CommunityId!: string;
  /**上报时间 */
  EventTime!: string;

}




export interface IllegalDropEventSearchInfo {
  condition: string;
  BeginTime: Date;
  EndTime: Date;
  CameraName: string;
  CameraType: string;
  DeviceId: string;
  LabelIds: string[];
  filter: boolean;
}