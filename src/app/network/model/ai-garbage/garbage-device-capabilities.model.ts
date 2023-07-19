import { IModel } from '../model.interface';

export class AIGarbageDeviceCapabilities implements IModel {
  /**	Boolean	排风扇能力，true:有/false:无	O	*/
  ExhaustFan?: boolean;
  /**	Boolean	气泵压强能力	O	*/
  AirPumpPressure?: boolean;
  /**	Double	最小合理气泵压强	O	*/
  MinAirPumpPressure?: number;
  /**	Boolean	气泵电源能力	O	*/
  AirPumpPower?: boolean;
  /**	Boolean	RFID读卡器能力	O	*/
  RfidReader?: boolean;
  /**	Boolean	大门开关状态能力	O	*/
  GateState?: boolean;
  /**	Boolean	香氛喷洒能力	O	*/
  Spray?: boolean;
  /**	Boolean	气体检测传感能力	O	*/
  GasSensor?: boolean;
  /**	Boolean	抓手复位状态能力	O	*/
  GripperState?: boolean;
  /**	Boolean	称重能力	O	*/
  Weight?: boolean;
  /**	Boolean	分类平台(翻板)翻转状态能力	O	*/
  PlateTurningState?: boolean;
  /**	Boolean	窗口开关功能状态能力	O	*/
  WindowState?: boolean;
}
