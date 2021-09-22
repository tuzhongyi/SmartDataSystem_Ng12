class EventNumberUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/EventNumbers`;
  }
  sum() {
    return `${this.basic()}/Sum`;
  }
  history = new HistoryUrl(this.basic());
}
