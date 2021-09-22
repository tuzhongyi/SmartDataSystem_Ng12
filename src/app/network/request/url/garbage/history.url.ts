class HistoryUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/History`;
  }

  list() {
    return `${this.basic()}/List`;
  }
}
