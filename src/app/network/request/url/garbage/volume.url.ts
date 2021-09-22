class VolumeUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Volumes`;
  }

  history = new HistoryUrl(this.basic());
}
