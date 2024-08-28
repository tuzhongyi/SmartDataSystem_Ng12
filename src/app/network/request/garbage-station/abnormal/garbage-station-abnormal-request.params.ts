import { IParams, PagedParams } from '../../IParams.interface';

export class GetGarbageStationAbnormalsStatisticParams implements IParams {
  /**	Int32	最近N小时的统计数据，取值范围：[0-168]小时。0表示不限时长。	M */
  InHours!: number;
  /**	String	所属区划	O */
  DivisionId?: string;
}

export class GetGarbageStationAbnormalsListParams extends PagedParams {
  /**
   * Int32
   * 异常类型：
   * 1：GCHA离线设备
   * 2：自动门离线
   * 3：NB电源箱无心跳
   * O
   **/
  AbnormalType?: number;
  /**	Int32	最近N小时的统计数据，取值范围：[0-168]小时。0表示不限时长。	O */
  InHours?: number;
  /**	String	所属区划	O */
  DivisionId?: string;
}
