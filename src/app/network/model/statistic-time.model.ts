/** 统计时间 */
export class StatisticTime {
  /**	Int32	年	O */
  Year?: number;
  /**	Int32	月	O */
  Month?: number;
  /**	Int32	日	O */
  Day?: number;
  /**	Int32	第几周	O */
  Week?: number;

  static toDate(time: StatisticTime) {
    return new Date(
      time.Year || 0,
      time.Month ? time.Month - 1 : 0,
      time.Day || 0
    );
  }
}
