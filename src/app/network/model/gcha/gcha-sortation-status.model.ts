import { IIdNameModel } from '../model.interface';

/**	SortationStatus(分拣设备状态)	*/
export class GCHASortationStatus implements IIdNameModel {
  /**	String	设备唯一ID，创建后必填	M	*/
  Id!: string;
  /**	String	设备名称	M	*/
  Name!: string;
  /**
   * Int32
   * 在线状态
   * 0:正常、1:异常
   * O
   **/
  OnlineState?: number;
  /**
   * Double
   * 气泵压力值，单位：MPa
   * 气泵压力范围（0.3Mpa-0.7MPa）
   * O
   **/
  AirPressure?: number;
}
