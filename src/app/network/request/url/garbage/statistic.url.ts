class StatisticUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Statistic`;
  }

  number = new NumberUrl(this.basic());
}
