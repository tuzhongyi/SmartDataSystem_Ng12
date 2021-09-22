class NumberUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Number`;
  }

  list() {
    return `${this.basic()}/List`;
  }
  comparison() {
    return `${this.basic()}/Comparison`;
  }

  history = new HistoryUrl(this.basic());
}
