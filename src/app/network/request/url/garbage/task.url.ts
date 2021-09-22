class TaskUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Tasks`;
  }
}
