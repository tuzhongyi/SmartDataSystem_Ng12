import { Transform } from "class-transformer";
import { transformDate } from "../model/transform.model";

export interface IParams {}
export class PagedParams {
  /**页码[1-n](可选) */
  PageIndex?: number = 1;
  /**分页大小[1-100](可选) */
  PageSize?: number = 999;
}
export class IntervalParams {
  /**	DateTime	开始时间	M */
  @Transform(transformDate)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDate)
  EndTime!: Date;
}
export class PagedIntervalParams extends PagedParams {
  /**	DateTime	开始时间	M */
  @Transform(transformDate)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDate)
  EndTime!: Date;
}