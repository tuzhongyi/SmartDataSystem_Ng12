import { IParams } from '../../IParams.interface';

export class GarbageStationNBRebootParams implements IParams {
  /**
   * 	Int32
   * 	重启电源类型：
   *  1：5V电源
   *  2：12V电源
   * 	M
   */
  RebootType!: number;
}
