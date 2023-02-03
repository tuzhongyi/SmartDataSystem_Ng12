/**垃圾落地事件 */
export class IllegalDropEventModel<T = any> {
  /** 事件Id*/
  Id!: string; /**图片地址 */
  ImageUrl!: Promise<string>;
  /**资源名称 */
  ResourceName!: string;
  /**投放点 */
  StationName!: string;
  /**街道 */
  CountyName!: string;
  /**居委会 */
  CommitteeName!: string;
  /**社区 */
  CommunityName!: string;
  /**上报时间 */
  EventTime!: Date;

  RawData?: T;
}

export interface IllegalDropEventSearchInfo {
  Condition: string;
  BeginTime: Date;
  EndTime: Date;
  DivisionIds: string[];
  StationIds: string[];
  CameraIds: string[];
  Filter: boolean;
  PageIndex: number;
  PageSize: number;
}
