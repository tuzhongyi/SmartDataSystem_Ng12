class MemberUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Members`;
  }
}
