export class StatisticSummaryTaskChartViewModel {
  Id: string = '';
  Name: string = '';
  /**	Int32	总处理任务数量	O */
  TotalCount = 0;
  /**	Int32	未处理任务数量	O */
  UncompletedCount = 0;
  /** 垃圾滞留数量 */
  GarbageTimeoutCount = 0;

  taskRatio = 0;
  timeoutRatio = 0;
}

export class StatisticSummaryTaskChartEventArgs {
  handle?: boolean;
  timeout?: boolean;
}
