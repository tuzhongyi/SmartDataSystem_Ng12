export abstract class AbstractUrl {
  constructor(protected base: string) {}
  basic(): string {
    return this.base;
  }
  item<T = string>(id: T) {
    return `${this.basic()}/${id}`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  feedback(id: string) {
    return `${this.item(id)}/Feedback`;
  }
  supervise(id: string) {
    return `${this.item(id)}/Supervise`;
  }
  superviseresult(id: string) {
    return `${this.item(id)}/SuperviseResult`;
  }
  accept(id: string) {
    return `${this.item(id)}/Accept`;
  }
}
