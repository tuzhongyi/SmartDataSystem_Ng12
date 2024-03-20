import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

/**	GCHAStatus (GCHA状态)	*/
export class GCHAStatus implements IModel {
  /**
   * Int32	在线状态
   * 0:正常、1:异常
   * O
   **/
  OnlineState?: number;
  /**
   * Int32	分析服务状态：
   * 0:正常、1:异常
   * O
   **/
  AnalysisServerState?: number;
  /**
   * Int32	升级服务状态：
   * 0:正常、1:异常
   * O
   **/
  UpgradeServerState?: number;
  /**	DateTime	最后更新时间	O	*/
  @Transform(transformDateTime)
  LastUpdateTime?: Date;
}
