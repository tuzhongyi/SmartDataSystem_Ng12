import { OnlineStatus } from 'src/app/enum/online-status.enum';

export interface ICamera {
  /**	String	摄像机ID	M */
  Id: string;
  /**	String	摄像机名称	M */
  Name: string;
  /**	DateTime	创建时间	M */
  CreateTime: Date;
  /**	DateTime	更新事件	M	*/
  UpdateTime: Date;
  /**	Int32	在线状态0-正常，1-离线	O */
  OnlineStatus?: OnlineStatus;
  /**	String	照片URL或ID	O	*/
  ImageUrl?: string;
  /**	DateTime	照片时间	O */
  ImageTime?: Date;
}
