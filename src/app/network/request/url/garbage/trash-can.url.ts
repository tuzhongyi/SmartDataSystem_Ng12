class TrashCanUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/TrashCans`;
  }
  item(){
    return `${this.basic()}/List`;
  }
  list() {
    return `${this.basic()}/List`;
  }
}
