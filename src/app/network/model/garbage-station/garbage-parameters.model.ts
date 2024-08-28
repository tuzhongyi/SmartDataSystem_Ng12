import { IModel } from '../model.interface';

/**	GarbageParameters (垃圾相关参数)	*/
export class GarbageParameters implements IModel {
  /**	Int32	处置超时时长，单位：分钟，默认：30分钟	O	*/
  HandleTimeout?: number;
  /**	Int32	任务发布时间，默认：5分钟	O	*/
  TaskPubilshTime?: number;
  /**	Boolean	禁用垃圾落地事件	O	*/
  IllegalDropDisable?: boolean;
  /**	Boolean	禁用混合投放事件	O	*/
  MixedIntoDisable?: boolean;
  /**	Boolean	禁用小包垃圾滞留统计	O	*/
  GarbageDropDisable?: boolean;
  /**	Int32	处置超时几次作为超时事件记录(可选)，默认是：1次超时，认为事件超时。	O	*/
  HandleTimeoutTimes?: number;
  /**	Boolean	禁用预警事件	O	*/
  DropWarningDisable?: boolean;
  /**	Int32	超级处置超时时长，单位：分钟，默认：90分钟	O	*/
  HandleSuperTimeout?: number;
  /**	Boolean	是否使用3级事件模式	O	*/
  Level3EventEnabled?: boolean;
}
