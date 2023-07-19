import { IModel } from '../model.interface';

export class AIGarbageCamera implements IModel {
  /**	String	设备序列号	M	*/
  SerialNo!: string;
  /**	String	摄像机名称	M	*/
  Name!: string;
  /**	Int32	摄像机对应的窗口编号	O	*/
  DropWindowNo?: number;
  /**	Int32	摄像机机位;1-9，小包垃圾检测摄像机,11-19，垃圾满溢、混合投放	O	*/
  Position?: number;
  /**	String	系统中的摄像机ID	O	*/
  CameraId?: string;
  /**	Int32	在线状态0:正常、1:异常	O	*/
  OnlineState?: number;
}
