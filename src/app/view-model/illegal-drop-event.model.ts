import { CommonModel } from "./common-model";

/**垃圾落地事件 */
export class IllegalDropEventModel implements CommonModel {

  /** 事件Id*/
  Id!: string;
  /**资源名称 */
  ResourceName!: string;
  /**图片地址 */
  ImageUrl!: string;
  /**投放点 */
  StationName!: string;
  StationId!: string | null;
  /**街道 */
  CountyName!: string;
  CountyId!: string | null;
  /**居委会 */
  CommitteeName!: string;
  CommitteeId!: string | null;
  /**社区 */
  CommunityName!: string;
  CommunityId!: string | null;
  /**上报时间 */
  EventTime!: string;

}




export interface IllegalDropEventSearchInfo {
  Condition: string;
  BeginTime: Date;
  EndTime: Date;
  DivisionIds: string[];
  StationIds: string[];
  CameraIds: string[];
  Filter: boolean;
}